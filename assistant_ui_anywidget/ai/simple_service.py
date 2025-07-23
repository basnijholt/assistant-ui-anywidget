"""Simplified AI service for the assistant widget."""

import logging
import os
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.language_models import BaseLanguageModel

from ..kernel_interface import KernelInterface
from .logger import ConversationLogger

# Load environment variables from .env file
load_dotenv()

logger = logging.getLogger(__name__)


@dataclass
class ChatResult:
    """Result of a chat operation."""

    content: str
    thread_id: str
    success: bool = True
    error: Optional[str] = None


def init_llm(
    model: Optional[str] = None,
    provider: Optional[str] = None,
    **kwargs: Any,
) -> BaseLanguageModel:
    """Initialize language model with simple provider detection."""
    # Auto-detect if provider is None or "auto"
    if not provider or provider == "auto":
        # Simple provider detection - try each one in order
        providers = [
            ("openai", "gpt-4", "OPENAI_API_KEY"),
            ("anthropic", "claude-3-opus-20240229", "ANTHROPIC_API_KEY"),
            ("google_genai", "gemini-2.5-flash", "GOOGLE_API_KEY"),
        ]

        # Auto-detect based on available API keys
        for prov, default_model, env_var in providers:
            if os.getenv(env_var):
                try:
                    use_model = model or default_model
                    return init_chat_model(
                        model=use_model, model_provider=prov, **kwargs
                    )
                except Exception as e:
                    logger.error(f"Failed to initialize {prov}: {e}")
                    continue

        # Fallback to mock
        logger.warning("No AI provider available, using mock")
        from .mock import MockLLM

        return MockLLM()

    # Use explicit provider/model if provided
    try:
        use_model = model or "gpt-4"  # Default model
        return init_chat_model(model=use_model, model_provider=provider, **kwargs)
    except Exception as e:
        logger.error(f"Failed to initialize {provider}/{model}: {e}")
        logger.warning("Falling back to mock")
        from .mock import MockLLM

        return MockLLM()


class SimpleAIService:
    """Simplified AI service with direct tool calling."""

    def __init__(
        self,
        kernel: KernelInterface,
        model: Optional[str] = None,
        provider: Optional[str] = None,
        **kwargs: Any,
    ):
        """Initialize the AI service."""
        self.kernel = kernel
        self.llm = init_llm(model, provider, **kwargs)
        self.conversations: Dict[str, List[Dict[str, str]]] = {}

        # Initialize conversation logger
        self.conversation_logger = ConversationLogger()
        log_path = self.conversation_logger.start_session()
        logger.info(f"Started conversation logging to: {log_path}")

    def chat(
        self,
        message: str,
        thread_id: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> ChatResult:
        """Send message and get response."""
        import uuid

        if thread_id is None:
            thread_id = str(uuid.uuid4())

        try:
            # Initialize conversation if needed
            if thread_id not in self.conversations:
                self.conversations[thread_id] = []

            # Build messages
            messages = []

            # System prompt
            messages.append({"role": "system", "content": get_system_prompt()})

            # Add context if provided
            if context:
                context_msg = build_context_message(context)
                messages.append({"role": "system", "content": context_msg})

            # Add conversation history
            for msg in self.conversations[thread_id]:
                messages.append(msg)

            # Add current message
            messages.append({"role": "user", "content": message})

            # Create simple tools
            tools = create_simple_tools(self.kernel)
            llm_with_tools = self.llm.bind_tools(tools)

            # Get response
            response = llm_with_tools.invoke(messages)

            # Handle tool calls if present
            if hasattr(response, "tool_calls") and response.tool_calls:
                response = handle_tool_calls(
                    self.kernel, response, messages, llm_with_tools
                )

            # Extract content
            content = str(response.content) if response.content else ""

            # Extract tool call info if present
            tool_call_info = []
            if hasattr(response, "tool_calls") and response.tool_calls:
                for tc in response.tool_calls:
                    tool_call_info.append(
                        {
                            "name": tc.get("name"),
                            "args": tc.get("args"),
                        }
                    )

            # Log conversation
            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=message,
                ai_response=content,
                tool_calls=tool_call_info,
                context=context,
            )

            # Store conversation
            self.conversations[thread_id].extend(
                [
                    {"role": "user", "content": message},
                    {"role": "assistant", "content": content},
                ]
            )

            return ChatResult(content=content, thread_id=thread_id, success=True)

        except Exception as e:
            logger.error(f"Error in chat: {e}")
            error_msg = f"I encountered an error: {str(e)}"

            # Log error
            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=message,
                ai_response=error_msg,
                context=context,
                error=str(e),
            )

            return ChatResult(
                content=error_msg,
                thread_id=thread_id,
                success=False,
                error=str(e),
            )


def create_simple_tools(kernel: KernelInterface) -> List[Any]:
    """Create simple kernel tools."""
    from langchain.tools import tool

    @tool  # type: ignore[misc]
    def get_variables() -> str:
        """List all variables in the kernel namespace."""
        if not kernel.is_available:
            return "Kernel not available"

        namespace = kernel.get_namespace()
        if not namespace:
            return "No variables in namespace"

        vars_by_type: Dict[str, List[str]] = {}
        for name, value in namespace.items():
            if name.startswith("_"):
                continue
            type_name = type(value).__name__
            if type_name not in vars_by_type:
                vars_by_type[type_name] = []
            vars_by_type[type_name].append(name)

        lines = [f"Variables ({len(namespace)} total):"]
        for type_name in sorted(vars_by_type.keys()):
            var_names = sorted(vars_by_type[type_name])
            lines.append(f"{type_name}: {', '.join(var_names[:10])}")
            if len(var_names) > 10:
                lines[-1] += f" ... and {len(var_names) - 10} more"

        return "\n".join(lines)

    @tool  # type: ignore[misc]
    def inspect_variable(variable_name: str) -> str:
        """Inspect a specific variable."""
        if not kernel.is_available:
            return "Kernel not available"

        var_info = kernel.get_variable_info(variable_name)
        if not var_info:
            return f"Variable '{variable_name}' not found"

        return (
            f"Variable: {var_info.name}\n"
            f"Type: {var_info.type_str}\n"
            f"Preview: {var_info.preview}"
        )

    @tool  # type: ignore[misc]
    def execute_code(code: str) -> str:
        """Execute Python code in the kernel."""
        if not kernel.is_available:
            return "Kernel not available"

        result = kernel.execute_code(code)

        if result.success:
            output_parts = ["Code executed successfully."]
            if result.outputs:
                for output in result.outputs:
                    if output["type"] == "execute_result":
                        output_parts.append(f"Result: {output['data']['text/plain']}")
                    elif output["type"] == "stream":
                        output_parts.append(f"Output: {output['text']}")
            return "\n".join(output_parts)
        else:
            error_msg = "Code execution failed."
            if result.error:
                error_msg += f"\nError: {result.error['message']}"
            return error_msg

    @tool  # type: ignore[misc]
    def kernel_info() -> str:
        """Get kernel information."""
        info = kernel.get_kernel_info()
        return (
            f"Kernel Status: {'Available' if info['available'] else 'Not Available'}\n"
            f"Execution Count: {info['execution_count']}\n"
            f"Variables: {info.get('namespace_size', 0)}"
        )

    return [get_variables, inspect_variable, execute_code, kernel_info]


def handle_tool_calls(
    kernel: KernelInterface, response: Any, messages: List[Dict], llm_with_tools: Any
) -> Any:
    """Handle tool calls and get final response."""
    from langgraph.prebuilt import ToolNode

    tools = create_simple_tools(kernel)
    tool_node = ToolNode(tools)

    # Execute tools
    tool_messages = tool_node.invoke({"messages": messages + [response]})

    # Get final response
    final_messages = messages + [response] + tool_messages["messages"]
    return llm_with_tools.invoke(final_messages)


def build_context_message(context: Dict[str, Any]) -> str:
    """Build context message."""
    parts = []

    if "kernel_info" in context:
        info = context["kernel_info"]
        parts.append(f"Kernel has {info.get('namespace_size', 0)} variables.")

    if "variables" in context and context["variables"]:
        var_names = [v["name"] for v in context["variables"][:5]]
        parts.append(f"Key variables: {', '.join(var_names)}")

    if "last_error" in context:
        error = context["last_error"]
        parts.append(f"Recent error: {error.get('message', 'Unknown error')}")

    return "\n".join(parts) if parts else "Kernel context available."


def get_system_prompt() -> str:
    """Get system prompt."""
    return """You are an AI assistant with access to a Jupyter kernel.

You can:
- List variables with get_variables()
- Inspect specific variables with inspect_variable(name)
- Execute Python code with execute_code(code)
- Check kernel status with kernel_info()

When users ask you to run or execute code, use execute_code().
When they ask about variables, use get_variables() or inspect_variable().
Be helpful and explain what you're doing."""

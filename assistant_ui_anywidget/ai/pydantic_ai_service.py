"""AI service using Pydantic AI with LangGraph orchestration."""

import asyncio
import concurrent.futures
import logging
import os
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from langchain_core.messages import (
    AIMessage,
    AnyMessage,
    HumanMessage,
)
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END
from langgraph.types import interrupt
from pydantic import BaseModel, ConfigDict
from pydantic_ai import Agent, RunContext

from ..kernel_interface import KernelContext, KernelInterface
from .logger import ConversationLogger

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


def _run_async_safely(coro: Any, timeout: int = 30) -> Any:
    try:
        # Try to get running loop (will raise RuntimeError if none)
        asyncio.get_running_loop()

        # We're in a loop (Jupyter), use thread pool executor
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(_run_in_new_loop, coro)
            return future.result(timeout=timeout)

    except RuntimeError:
        # No running loop, use asyncio.run directly
        return asyncio.run(coro)


def _run_in_new_loop(coro: Any) -> Any:
    loop = asyncio.new_event_loop()
    try:
        asyncio.set_event_loop(loop)
        return loop.run_until_complete(coro)
    finally:
        loop.close()


class AgentState(BaseModel):
    """Pydantic model for the agent graph state using Pydantic AI."""

    # Core conversation messages (LangGraph compatible)
    messages: List[AnyMessage] = []

    # Optional kernel context information
    kernel_context: Optional[Dict[str, Any]] = None

    # Thread/session information
    thread_id: Optional[str] = None

    # Approval state for code execution
    pending_approval: bool = False

    # Error tracking
    last_error: Optional[str] = None

    model_config = ConfigDict(arbitrary_types_allowed=True)


@dataclass
class ChatResult:
    """Result of a chat operation."""

    content: str
    thread_id: str
    success: bool = True
    error: Optional[str] = None
    interrupted: bool = False
    interrupt_message: Optional[str] = None

    @property
    def needs_approval(self) -> bool:
        """Check if this result requires approval."""
        return self.interrupted and self.interrupt_message is not None


# Define Pydantic AI tools for kernel interaction
def create_pydantic_kernel_tools(kernel: KernelInterface) -> Dict[str, Any]:
    async def get_variables(ctx: RunContext[Any]) -> str:
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

    async def inspect_variable(ctx: RunContext[Any], variable_name: str) -> str:
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

    async def execute_code(ctx: RunContext[Any], code: str) -> str:
        """Execute Python code in the kernel. REQUIRES APPROVAL."""
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

    async def kernel_info(ctx: RunContext[Any]) -> str:
        """Get kernel information."""
        try:
            info = kernel.get_kernel_info()
            return (
                f"Kernel Status: {'Available' if info.get('available', False) else 'Not Available'}\n"
                f"Execution Count: {info.get('execution_count', 0)}\n"
                f"Variables: {info.get('namespace_size', 0)}"
            )
        except Exception as e:
            return f"Error getting kernel info: {str(e)}"

    return {
        "get_variables": get_variables,
        "inspect_variable": inspect_variable,
        "execute_code": execute_code,
        "kernel_info": kernel_info,
    }


def _detect_available_provider() -> tuple[str, str]:
    providers = [
        ("openai", "gpt-4o-mini", "OPENAI_API_KEY"),
        ("anthropic", "claude-3-haiku-20240307", "ANTHROPIC_API_KEY"),
        ("gemini", "gemini-1.5-flash", "GOOGLE_API_KEY"),
    ]

    for prov, default_model, env_var in providers:
        if os.getenv(env_var):
            return prov, default_model

    logger.warning("No AI provider available")
    return "test", "test"


def _format_model_string(provider: str, model: str) -> str:
    # Handle provider name mapping
    if provider == "google_genai":
        provider = "gemini"

    # Gemini models don't use provider prefix in Pydantic AI
    if provider == "gemini":
        return model if model.startswith("gemini-") else f"gemini-{model}"
    elif provider == "test":
        return "test"
    else:
        return f"{provider}:{model}"


def _is_model_compatible(provider: str, model: str) -> bool:
    compatibility_map = {
        "openai": lambda m: m.startswith(("gpt-", "o1-")),
        "anthropic": lambda m: m.startswith("claude-"),
        "gemini": lambda m: m.startswith("gemini-"),
        "google_genai": lambda m: m.startswith("gemini-"),
    }

    check_func = compatibility_map.get(provider)
    return check_func(model) if check_func else False


def init_pydantic_ai_model(
    model: Optional[str] = None,
    provider: Optional[str] = None,
    **kwargs: Any,
) -> str:
    """Initialize Pydantic AI model string with provider detection.

    Args:
        model: Specific model name (optional)
        provider: Provider name or "auto" for auto-detection (optional)
        **kwargs: Additional arguments (ignored)

    Returns:
        Properly formatted model string for Pydantic AI
    """
    # Auto-detect if provider is None or "auto"
    if not provider or provider == "auto":
        detected_provider, default_model = _detect_available_provider()

        if model and _is_model_compatible(detected_provider, model):
            use_model = model
        else:
            use_model = default_model

        return _format_model_string(detected_provider, use_model)

    # Use explicit provider/model
    use_model = model or "gpt-4o-mini"
    return _format_model_string(provider, use_model)


def build_context_message(context: KernelContext) -> str:
    """Build context message."""
    parts = []

    info = context.kernel_info
    parts.append(f"Kernel has {info.get('namespace_size', 0)} variables.")

    if context.variables:
        var_names = [v["name"] for v in context.variables[:5]]
        parts.append(f"Key variables: {', '.join(var_names)}")

    # Add notebook cell information
    if context.recent_cells:
        parts.append("\nRECENT NOTEBOOK CELLS:")
        for cell in context.recent_cells:
            exec_count = cell.get("execution_count", "?")
            code = cell.get("input_code", "").strip()
            if len(code) > 100:
                code = code[:100] + "..."
            parts.append(f"Cell [{exec_count}]: {code}")

    if context.notebook_summary:
        summary = context.notebook_summary
        parts.append(
            f"\nNotebook: {summary.get('executed_cells', 0)} executed cells, current execution count {summary.get('current_execution_count', 0)}"
        )

    if context.last_error:
        error = context.last_error
        parts.append(f"Recent error: {error.get('message', 'Unknown error')}")

    return "\n".join(parts) if parts else "Kernel context available."


def get_system_prompt(require_approval: bool = True, has_tools: bool = False) -> str:
    """Get system prompt."""
    if has_tools:
        approval_note = (
            "\n\nIMPORTANT: The execute_code tool requires user approval. "
            "Other tools (get_variables, inspect_variable, kernel_info) execute automatically."
            if require_approval
            else ""
        )

        return f"""You are an AI assistant with access to a Jupyter kernel and notebook history.

You can:
- List variables with get_variables()
- Inspect specific variables with inspect_variable(name)
- Execute Python code with execute_code(code)
- Check kernel status with kernel_info()

NOTEBOOK ACCESS: You have access to recent notebook cell contents and outputs in your context.
When users ask about "cell contents", "what code did I run", "notebook cells", or similar,
refer to the RECENT NOTEBOOK CELLS section in your context which shows the actual code
that was executed in previous cells.

When users ask you to run or execute code, use execute_code().
When they ask about variables, use get_variables() or inspect_variable().
When they ask about notebook cells or previous code, refer to your context.
Be helpful and explain what you're doing.{approval_note}"""
    else:
        return """You are an AI assistant that helps with Python programming and data analysis.

You can help users understand code, explain concepts, and provide programming guidance.
While you can suggest code solutions, you cannot directly execute code at the moment.

Be helpful and provide clear explanations for any programming questions."""


def should_continue(state: AgentState) -> str:
    """Determine if we should continue to tools or end."""
    if not state.messages:
        return str(END)

    last_message = state.messages[-1]

    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        return "tools"

    return str(END)


def should_require_approval(state: AgentState) -> str:
    """Determine if we need approval before executing tools."""
    if not state.messages:
        return str(END)

    last_message = state.messages[-1]

    # If no tool calls, we're done
    if not isinstance(last_message, AIMessage) or not last_message.tool_calls:
        return str(END)

    # Check if any tool call is execute_code
    for tool_call in last_message.tool_calls:
        if tool_call["name"] == "execute_code":
            return "approval"

    # Other tools don't need approval
    return "tools"


def approval_node(state: AgentState) -> Dict[str, Any]:
    """Node that handles approval for code execution."""
    if not state.messages:
        return {}

    # Find the most recent AIMessage with tool calls that needs approval
    ai_message_with_tools = None
    for message in reversed(state.messages):
        if isinstance(message, AIMessage) and message.tool_calls:
            # Check if any tool call is execute_code
            for tool_call in message.tool_calls:
                if tool_call["name"] == "execute_code":
                    ai_message_with_tools = message
                    break
            if ai_message_with_tools:
                break

    # If no AIMessage with execute_code tool calls found, something is wrong
    if not ai_message_with_tools:
        logger.warning(
            "Approval node called but no AIMessage with execute_code tool calls found"
        )
        return {"pending_approval": False}

    # Extract code to be executed
    code_blocks = []
    for tool_call in ai_message_with_tools.tool_calls:
        if tool_call["name"] == "execute_code":
            code = tool_call["args"]["code"]
            code_blocks.append(code)

    # Create approval message
    approval_msg = "Approve code execution?\n\n"
    for i, code in enumerate(code_blocks, 1):
        approval_msg += f"Code block {i}:\n```python\n{code}\n```\n\n"

    # Interrupt for approval
    decision = interrupt({"message": approval_msg, "code_blocks": code_blocks})

    if decision != "approved":
        # User denied - return message
        denial_msg = HumanMessage(content="Code execution denied by user.")
        return {"messages": [denial_msg], "pending_approval": False}

    # Approved - continue to tools
    return {"pending_approval": False}


class PydanticAIService:
    """AI service using Pydantic AI with LangGraph orchestration."""

    def __init__(
        self,
        kernel: KernelInterface,
        model: Optional[str] = None,
        provider: Optional[str] = None,
        require_approval: bool = True,
        **kwargs: Any,
    ):
        """Initialize the AI service."""
        self.kernel = kernel
        self.require_approval = require_approval

        # Initialize Pydantic AI model
        model_string = init_pydantic_ai_model(model, provider, **kwargs)
        logger.info(f"Initializing Pydantic AI with model: {model_string}")

        # Create Pydantic AI agent without tools first (for testing)
        # tools = create_pydantic_kernel_tools(kernel)

        # Create Pydantic AI agent with proper model string
        try:
            self.agent = Agent(
                model_string,
                system_prompt=get_system_prompt(require_approval, has_tools=False),
                # tools=list(tools.values()),  # Temporarily disabled
            )
        except Exception as e:
            logger.warning(
                f"Failed to initialize model {model_string}, falling back to test model: {e}"
            )
            self.agent = Agent(
                "test",
                system_prompt=get_system_prompt(require_approval, has_tools=False),
                # tools=list(tools.values()),  # Temporarily disabled
            )

        # Create memory for conversation history
        self.memory = MemorySaver()

        # Create LangGraph for orchestration (we'll implement this separately)
        # For now, we'll use a simpler approach without the complex graph

        # Initialize conversation logger
        self.conversation_logger = ConversationLogger()
        log_path = self.conversation_logger.start_session()
        logger.info(f"Started conversation logging to: {log_path}")

    async def chat_async(
        self,
        message: str | bool,
        thread_id: Optional[str] = None,
        context: Optional[KernelContext] = None,
    ) -> ChatResult:
        """Send message and get response (async version)."""
        if thread_id is None:
            thread_id = str(uuid.uuid4())

        try:
            # Handle approval responses
            if isinstance(message, bool):
                # This is an approval/denial response
                return ChatResult(
                    content="Approval processed" if message else "Execution denied",
                    thread_id=thread_id,
                    success=True,
                )
            elif message in ["Approve", "Deny"]:
                # String-based approval
                approved = message == "Approve"
                return ChatResult(
                    content="Execution approved" if approved else "Execution denied",
                    thread_id=thread_id,
                    success=True,
                )

            # Build context message if provided
            full_message = message
            if context:
                context_msg = build_context_message(context)
                full_message = f"Context: {context_msg}\n\nUser: {message}"

            # Run Pydantic AI agent
            result = await self.agent.run(full_message)

            # Check if the result contains tool calls that need approval
            needs_approval = False
            interrupt_msg = None

            # For now, we'll implement a simple approval check
            # In a full implementation, we'd integrate this with LangGraph
            # Temporarily disabled until we add tools back
            # if "execute_code" in str(result):
            #     needs_approval = True
            #     interrupt_msg = f"Code execution requested: {message}"

            # Log conversation
            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=str(message),
                ai_response=result.output,
                context=context.to_dict() if context else None,
            )

            return ChatResult(
                content=result.output,
                thread_id=thread_id,
                success=True,
                interrupted=needs_approval,
                interrupt_message=interrupt_msg,
            )

        except Exception as e:
            logger.error(f"Error in chat: {e}")
            error_msg = f"I encountered an error: {str(e)}"

            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=str(message),
                ai_response=error_msg,
                context=context.to_dict() if context else None,
                error=str(e),
            )

            return ChatResult(
                content=error_msg,
                thread_id=thread_id,
                success=False,
                error=str(e),
            )

    def chat(
        self,
        message: str | bool,
        thread_id: Optional[str] = None,
        context: Optional[KernelContext] = None,
    ) -> ChatResult:
        """Send message and get response (synchronous wrapper)."""
        try:
            result = _run_async_safely(self.chat_async(message, thread_id, context))
            return result  # type: ignore[no-any-return]
        except Exception as e:
            logger.error(f"Error in chat: {e}")
            return ChatResult(
                content=f"Error: {str(e)}",
                thread_id=thread_id or str(uuid.uuid4()),
                success=False,
                error=str(e),
            )

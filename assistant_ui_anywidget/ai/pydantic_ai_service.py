"""AI service using Pydantic AI with LangGraph orchestration."""

import asyncio
import concurrent.futures
import logging
import os
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph
from langgraph.types import interrupt
from pydantic import BaseModel, ConfigDict
from pydantic_ai import Agent, RunContext
from typing_extensions import Annotated, TypedDict

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


# Simple message structure without LangChain dependencies
@dataclass
class Message:
    role: str  # "user" or "assistant" 
    content: str

# Custom reducer function for messages
def add_messages(left: List[Message], right: List[Message]) -> List[Message]:
    """Add messages to the conversation history."""
    return left + right

class AgentState(TypedDict):
    """Simple state for LangGraph without LangChain message dependencies."""
    
    # Conversation history with custom message type
    messages: Annotated[List[Message], add_messages]
    
    # Optional fields
    thread_id: Optional[str]
    kernel_context: Optional[Dict[str, Any]]


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
def create_pydantic_kernel_tools(kernel: KernelInterface, require_approval: bool = True) -> Dict[str, Any]:
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
        """Execute Python code in the kernel."""
        if not kernel.is_available:
            return "Kernel not available"
        
        # If approval is required, trigger an interrupt
        if require_approval:
            # Import interrupt here to use it within the tool
            from langgraph.types import interrupt
            
            approval_msg = (
                f"Approve code execution?\n\n"
                f"Code:\n```python\n{code}\n```\n\n"
                f"Respond with 'Approve' or 'Deny'."
            )
            
            # This will pause the graph execution
            decision = interrupt({
                "tool": "execute_code", 
                "message": approval_msg,
                "code": code
            })
            
            # Check the decision
            if str(decision).lower() not in ["approve", "approved", "yes", "y", "true"]:
                return "Code execution denied by user."
        
        # Execute the code
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
            "\n\nIMPORTANT: The execute_code tool requires user approval before running."
            if require_approval
            else ""
        )

        return f"""You are an AI assistant with access to a Jupyter kernel and notebook history.

You have access to the following tools:
- get_variables(): List all variables in the kernel namespace
- inspect_variable(variable_name): Get details about a specific variable
- execute_code(code): Execute Python code in the kernel
- kernel_info(): Get information about the kernel status

IMPORTANT INSTRUCTIONS:
1. For simple questions that you can answer directly (like "what is 2+2?"), just provide the answer.
2. When users ask you to execute, run, or evaluate Python code, you MUST use the execute_code tool, even if the kernel appears unavailable.
3. When users ask about variables, use get_variables() or inspect_variable().
4. When users ask about the kernel, use kernel_info().
5. CRITICAL: Always call execute_code() when requested, regardless of kernel status. The tool will handle any issues.
6. Be helpful and explain what you're doing.

NOTEBOOK ACCESS: You have access to recent notebook cell contents and outputs in your context.
When users ask about "cell contents", "what code did I run", "notebook cells", or similar,
refer to the RECENT NOTEBOOK CELLS section in your context.{approval_note}"""
    else:
        return """You are an AI assistant that helps with Python programming and data analysis.

You can help users understand code, explain concepts, and provide programming guidance.
While you can suggest code solutions, you cannot directly execute code at the moment.

Be helpful and provide clear explanations for any programming questions."""


def should_continue(state: AgentState) -> str:
    """Determine if we should continue to tools or end."""
    # For now, we always end after the chat node
    # Tool calling is handled within Pydantic AI
    return str(END)


def should_require_approval(state: AgentState) -> str:
    """Determine if we need approval before executing tools."""
    # Tool approval is now handled within Pydantic AI tools using interrupts
    return str(END)


def approval_node(state: AgentState) -> Dict[str, Any]:
    """Node that handles approval for code execution."""
    # This function is no longer used as tool approval is handled
    # within Pydantic AI tools using interrupts
    return {}


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

        # Create Pydantic AI agent with tools
        tools = create_pydantic_kernel_tools(kernel, require_approval)
        
        # Create agent with tools
        try:
            self.agent = Agent(
                model_string,
                system_prompt=get_system_prompt(require_approval, has_tools=True),
                tools=list(tools.values()),
            )
        except Exception as e:
            logger.warning(
                f"Failed to initialize model {model_string}, falling back to test model: {e}"
            )
            self.agent = Agent(
                "test",
                system_prompt=get_system_prompt(require_approval, has_tools=True),
                tools=list(tools.values()),
            )

        # Create memory checkpointer for LangGraph conversation persistence
        self.memory = MemorySaver()

        # Create LangGraph workflow that uses Pydantic AI
        self.graph = self._create_langgraph_workflow()

        # Initialize conversation logger
        self.conversation_logger = ConversationLogger()
        log_path = self.conversation_logger.start_session()
        logger.info(f"Started conversation logging to: {log_path}")

    def _create_langgraph_workflow(self) -> StateGraph:
        """Create LangGraph workflow that uses Pydantic AI for LLM interactions."""
        
        async def pydantic_ai_chat_node(state: AgentState) -> Dict[str, Any]:
            """LangGraph node that calls Pydantic AI for chat responses."""
            # Get the most recent user message
            last_user_message = None
            for msg in reversed(state["messages"]):
                if msg.role == "user":
                    last_user_message = msg
                    break
                    
            if not last_user_message:
                return {"messages": [Message(role="assistant", content="No message to respond to.")]}
            
            # Build conversation context from LangGraph state to pass to Pydantic AI
            if len(state["messages"]) > 1:
                # Include conversation history
                conversation_parts = []
                for msg in state["messages"][:-1]:  # All except the current message
                    if msg.role == "user":
                        conversation_parts.append(f"User: {msg.content}")
                    elif msg.role == "assistant":
                        conversation_parts.append(f"Assistant: {msg.content}")
                
                # Create prompt with conversation history
                history = "\n".join(conversation_parts)
                prompt = f"Previous conversation:\n{history}\n\nCurrent user message: {last_user_message.content}"
            else:
                # First message, no history needed
                prompt = last_user_message.content
            
            # Use Pydantic AI to generate response with conversation context
            # Tools may trigger interrupts internally
            try:
                result = await self.agent.run(prompt)
                response_text = str(result.output)
                
                # Fallback: Check if the AI mentioned executing code but didn't call the tool
                # This handles cases where tool calling fails (e.g., with Gemini)
                if self.require_approval and any(phrase in response_text.lower() for phrase in [
                    "i'll execute", "i will execute", "executing", "let me execute",
                    "i'll run", "i will run", "running the code"
                ]):
                    # Try to extract code from the message
                    import re
                    # Look for code blocks or inline code mentions
                    code_match = re.search(r'```(?:python)?\n?(.*?)\n?```|`([^`]+)`|code:\s*(.+)', response_text, re.DOTALL | re.IGNORECASE)
                    if code_match:
                        code = code_match.group(1) or code_match.group(2) or code_match.group(3)
                        code = code.strip()
                        
                        # Trigger interrupt for approval
                        approval_msg = f"Approve code execution?\n\nCode:\n```python\n{code}\n```\n\nRespond with 'Approve' or 'Deny'."
                        decision = interrupt({"message": approval_msg, "code": code})
                        
                        if str(decision).lower() in ["approve", "approved", "yes", "y", "true"]:
                            # Execute the code
                            exec_result = self.kernel.execute_code(code)
                            
                            if exec_result.success:
                                output_parts = ["Code executed successfully."]
                                if exec_result.outputs:
                                    for output in exec_result.outputs:
                                        if output["type"] == "execute_result":
                                            output_parts.append(f"Result: {output['data']['text/plain']}")
                                        elif output["type"] == "stream":
                                            output_parts.append(f"Output: {output['text']}")
                                response = "\n".join(output_parts)
                            else:
                                response = "Code execution failed."
                                if exec_result.error:
                                    response += f"\nError: {exec_result.error['message']}"
                            
                            return {"messages": [Message(role="assistant", content=response)]}
                        else:
                            return {"messages": [Message(role="assistant", content="Code execution denied by user.")]}
                
                # Return AI response as a message
                return {"messages": [Message(role="assistant", content=response_text)]}
            except Exception as e:
                # Check if this is an interrupt (interrupts raise special exceptions)
                # In LangGraph, interrupts bubble up as exceptions to be handled by the framework
                if "Interrupt" in str(type(e)):
                    # Re-raise the interrupt so LangGraph can handle it
                    raise
                else:
                    # Handle other errors
                    logger.error(f"Error in pydantic_ai_chat_node: {e}")
                    return {"messages": [Message(role="assistant", content=f"Error: {str(e)}")]}
        
        # Build the LangGraph workflow
        workflow = StateGraph(AgentState)
        workflow.add_node("chat", pydantic_ai_chat_node)
        workflow.set_entry_point("chat")
        workflow.add_edge("chat", END)
        
        # Compile with memory checkpointer - this enables conversation persistence
        return workflow.compile(checkpointer=self.memory)

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
            # Handle approval responses by resuming the interrupted workflow
            if isinstance(message, bool):
                # This is an approval/denial response
                from langgraph.types import Command
                resume_value = "approved" if message else "denied"
                config = {"configurable": {"thread_id": thread_id}}
                final_state = await self.graph.ainvoke(Command(resume=resume_value), config=config)
                
                # Extract AI response from resumed workflow
                ai_response = None
                for msg in reversed(final_state["messages"]):
                    if msg.role == "assistant":
                        ai_response = msg.content
                        break
                        
                if not ai_response:
                    ai_response = "Approval processed" if message else "Execution denied"
                    
                return ChatResult(
                    content=ai_response,
                    thread_id=thread_id,
                    success=True,
                )
            elif message in ["Approve", "Deny"]:
                # String-based approval
                from langgraph.types import Command
                resume_value = "Approve" if message == "Approve" else "Deny"
                config = {"configurable": {"thread_id": thread_id}}
                final_state = await self.graph.ainvoke(Command(resume=resume_value), config=config)
                
                # Extract AI response from resumed workflow
                ai_response = None
                for msg in reversed(final_state["messages"]):
                    if msg.role == "assistant":
                        ai_response = msg.content
                        break
                        
                if not ai_response:
                    ai_response = "Execution approved" if message == "Approve" else "Execution denied"
                    
                # Log the approval response
                self.conversation_logger.log_conversation(
                    thread_id=thread_id,
                    user_message=str(message),
                    ai_response=ai_response,
                    context=context.to_dict() if context else None,
                )
                    
                return ChatResult(
                    content=ai_response,
                    thread_id=thread_id,
                    success=True,
                )

            # Build context message if provided
            full_message = message
            if context:
                context_msg = build_context_message(context)
                full_message = f"Context: {context_msg}\n\nUser: {message}"

            # Create initial state with user message
            initial_state = {
                "messages": [Message(role="user", content=full_message)],
                "thread_id": thread_id,
                "kernel_context": context.to_dict() if context else None,
            }

            # Run LangGraph workflow with thread-specific config for conversation persistence
            config = {"configurable": {"thread_id": thread_id}}
            final_state = await self.graph.ainvoke(initial_state, config=config)

            # Check if the workflow was interrupted
            if "__interrupt__" in final_state:
                interrupt_data = final_state["__interrupt__"]
                interrupt_msg = interrupt_data.value.get("message", "Approval required") if hasattr(interrupt_data, 'value') else "Approval required"
                
                # Log the interrupted conversation
                self.conversation_logger.log_conversation(
                    thread_id=thread_id,
                    user_message=str(message),
                    ai_response=interrupt_msg,
                    context=context.to_dict() if context else None,
                )
                
                return ChatResult(
                    content=interrupt_msg,
                    thread_id=thread_id,
                    success=True,
                    interrupted=True,
                    interrupt_message=interrupt_msg,
                )

            # Extract AI response from final state
            ai_response = None
            for msg in reversed(final_state["messages"]):
                if msg.role == "assistant":
                    ai_response = msg.content
                    break

            if not ai_response:
                raise ValueError("No AI response generated")

            # Log conversation
            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=str(message),
                ai_response=ai_response,
                context=context.to_dict() if context else None,
            )

            return ChatResult(
                content=ai_response,
                thread_id=thread_id,
                success=True,
                interrupted=False,
                interrupt_message=None,
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

"""AI service using LangGraph for extensible agent workflows."""

import logging
import os
import uuid
from dataclasses import dataclass
from typing import Annotated, Any, Dict, List, Optional

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.language_models import BaseChatModel
from langchain_core.messages import (
    AIMessage,
    AnyMessage,
    HumanMessage,
    SystemMessage,
)
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from langgraph.types import interrupt
from pydantic import BaseModel, ConfigDict, Field

from ..kernel_interface import KernelContext, KernelInterface
from ..kernel_tools import create_kernel_tools
from .logger import ConversationLogger
from .prompt_config import SystemPromptConfig

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


class AgentState(BaseModel):
    """Pydantic model for the agent graph state.

    This replaces the default MessagesState with runtime validation
    and better type safety for our AI assistant.
    """

    # Core conversation messages
    messages: Annotated[List[AnyMessage], add_messages] = Field(
        default_factory=list, description="List of conversation messages"
    )

    # Optional kernel context information
    kernel_context: Optional[Dict[str, Any]] = Field(
        default=None, description="Current kernel state and context information"
    )

    # Thread/session information
    thread_id: Optional[str] = Field(
        default=None, description="Unique identifier for the conversation thread"
    )

    # Approval state for code execution
    pending_approval: bool = Field(
        default=False, description="Whether code execution is pending approval"
    )
    approval_granted: Optional[bool] = Field(
        default=None,
        description="Whether approval was granted (None=not decided, True=approved, False=denied)",
    )

    # Error tracking
    last_error: Optional[str] = Field(
        default=None, description="Last error message if any"
    )

    # Use modern Pydantic v2 configuration
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


def init_llm(
    model: Optional[str] = None,
    provider: Optional[str] = None,
    **kwargs: Any,
) -> BaseChatModel:
    """Initialize language model with simple provider detection."""

    # If explicit provider given, use it
    if provider and provider != "auto":
        try:
            use_model = model or "gpt-4o-mini"
            return init_chat_model(model=use_model, model_provider=provider, **kwargs)
        except Exception as e:
            logger.error(f"Failed to initialize {provider}/{model}: {e}")

    # Auto-detect: try providers in order based on available API keys
    providers = [
        ("openai", "gpt-4o-mini", "OPENAI_API_KEY"),
        ("anthropic", "claude-3-haiku-20240307", "ANTHROPIC_API_KEY"),
        ("google_genai", "gemini-2.5-flash", "GOOGLE_API_KEY"),
    ]

    for prov, default_model, env_var in providers:
        if os.getenv(env_var):
            try:
                use_model = model or default_model
                logger.info(f"Initializing {prov} with model {use_model}")
                return init_chat_model(model=use_model, model_provider=prov, **kwargs)
            except Exception as e:
                logger.warning(f"Failed to initialize {prov}: {e}")
                continue

    # Fallback to mock
    logger.warning("No AI provider available, using mock")
    from .mock import MockLLM

    return MockLLM()


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

    last_message = state.messages[-1]

    # Extract code to be executed
    code_blocks = []
    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        for tool_call in last_message.tool_calls:
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
        # User denied - return message and mark as denied
        denial_msg = HumanMessage(content="Code execution denied by user.")
        return {
            "messages": [denial_msg],
            "pending_approval": False,
            "approval_granted": False,
        }

    # Approved - continue to tools
    return {"pending_approval": False, "approval_granted": True}


def route_after_approval(state: AgentState) -> str:
    """Route after approval - go to tools if approved, back to agent if denied."""
    if state.approval_granted is True:
        return "tools"
    else:
        # If approval was denied or not set, return to agent to continue conversation
        return "agent"


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

    # Add imported modules information
    if context.imported_modules:
        parts.append("\nIMPORTED MODULES:")
        for alias, module_info in context.imported_modules.items():
            parts.append(f"  - {alias}: {module_info}")

    return "\n".join(parts) if parts else "Kernel context available."


# Cache the system prompt config to avoid reloading the YAML file
_system_prompt_config: Optional[SystemPromptConfig] = None


def get_system_prompt_config() -> SystemPromptConfig:
    """Load and cache the system prompt configuration."""
    global _system_prompt_config

    if _system_prompt_config is None:
        _system_prompt_config = SystemPromptConfig()

    return _system_prompt_config


def get_system_prompt(require_approval: bool = True) -> str:
    """Get the detailed system prompt for the AI assistant.

    This uses a Pydantic model to ensure all fields are properly loaded
    and validated from the YAML file.
    """
    config = get_system_prompt_config()
    return config.get_full_prompt(require_approval=require_approval)


def create_call_model(
    llm: BaseChatModel, tools: List[Any], require_approval: bool
) -> Any:
    """Create the call_model function for the agent graph."""

    def call_model(state: AgentState) -> Dict[str, Any]:
        """Call the LLM with tools (synchronous version)."""
        messages = state.messages

        # Add system message if not present
        if not messages or not isinstance(messages[0], SystemMessage):
            system_msg = SystemMessage(content=get_system_prompt(require_approval))
            messages = [system_msg] + messages
        response = llm.bind_tools(tools).invoke(messages)
        return {"messages": [response]}

    return call_model


def create_agent_graph(
    kernel: KernelInterface,
    llm: BaseChatModel,
    memory: MemorySaver,
    require_approval: bool,
) -> Any:  # Using Any to bypass CompiledStateGraph type issues for now
    """Create the LangGraph agent with approval flow."""
    graph: StateGraph[AgentState] = StateGraph(AgentState)

    # Create tools
    tools = create_kernel_tools(kernel)

    # Create call_model function
    call_model = create_call_model(llm, tools, require_approval)

    # Add nodes
    graph.add_node("agent", call_model)
    graph.add_node("tools", ToolNode(tools))

    if require_approval:
        graph.add_node("approval", approval_node)

        # Add conditional edges with approval
        graph.add_conditional_edges(
            "agent",
            should_require_approval,
            {
                "tools": "tools",
                "approval": "approval",
                END: END,
            },
        )
        graph.add_conditional_edges(
            "approval",
            route_after_approval,
            {
                "tools": "tools",
                "agent": "agent",
            },
        )
    else:
        # Direct routing without approval
        graph.add_conditional_edges(
            "agent",
            should_continue,
            {
                "tools": "tools",
                END: END,
            },
        )

    graph.add_edge("tools", "agent")
    graph.set_entry_point("agent")

    return graph.compile(checkpointer=memory)


class LangGraphAIService:
    """AI service using LangGraph for agent orchestration."""

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
        self.llm = init_llm(model, provider, **kwargs)

        # Create memory for conversation history
        self.memory = MemorySaver()

        # Create the agent graph
        self.agent = create_agent_graph(
            self.kernel, self.llm, self.memory, self.require_approval
        )

        # Initialize conversation logger
        self.conversation_logger = ConversationLogger()
        log_path = self.conversation_logger.start_session()
        logger.info(f"Started conversation logging to: {log_path}")

    def chat(
        self,
        message: str | bool,
        thread_id: Optional[str] = None,
        context: Optional[KernelContext] = None,
    ) -> ChatResult:
        """Send message and get response (synchronous version)."""
        if thread_id is None:
            thread_id = str(uuid.uuid4())

        try:
            # Build the payload
            if isinstance(message, bool):
                # Approval decision
                from langgraph.types import Command

                payload = Command(resume="approved" if message else "denied")
            elif message == "Approve":
                # Button approval
                from langgraph.types import Command

                payload = Command(resume="approved")
            elif message == "Deny":
                # Button denial
                from langgraph.types import Command

                payload = Command(resume="denied")
            else:
                # Normal message
                messages = []
                # Always add our custom system prompt first
                system_prompt = get_system_prompt(self.require_approval)

                # If we have context, append it to the system prompt
                if context:
                    context_msg = build_context_message(context)
                    full_system_content = (
                        f"{system_prompt}\n\n**CURRENT KERNEL STATE:**\n{context_msg}"
                    )
                else:
                    full_system_content = system_prompt

                messages.append(SystemMessage(content=full_system_content))
                messages.append(HumanMessage(content=message))

                # Create AgentState payload with additional context
                payload = {
                    "messages": messages,
                    "thread_id": thread_id,
                    "kernel_context": context.to_dict() if context else None,
                }

            # Invoke the agent
            config = {"configurable": {"thread_id": thread_id}}
            response: Dict[str, Any] = self.agent.invoke(payload, config)

            # Check if interrupted for approval
            if "__interrupt__" in response:
                interrupt_msg = response["__interrupt__"][0].value.get(
                    "message", "Approval needed"
                )

                self.conversation_logger.log_conversation(
                    thread_id=thread_id,
                    user_message=str(message),
                    ai_response="[Awaiting approval]",
                    context=context.to_dict() if context else None,
                )

                return ChatResult(
                    content="",
                    thread_id=thread_id,
                    interrupted=True,
                    interrupt_message=interrupt_msg,
                )

            # Extract response
            messages = response.get("messages", [])
            if not messages:
                return ChatResult(
                    content="No response from AI.",
                    thread_id=thread_id,
                    success=False,
                    error="Empty message list in response.",
                )

            last_message: AnyMessage = messages[-1]
            content = "No content"
            tool_calls: List[Dict[str, Any]] = []

            if isinstance(last_message, AIMessage):
                # Handle cases where content might be a list
                if isinstance(last_message.content, list):
                    content = "\n".join(str(item) for item in last_message.content)
                else:
                    content = str(last_message.content or "")
                if last_message.tool_calls:
                    tool_calls = [
                        {"name": tc.get("name"), "args": tc.get("args")}
                        for tc in last_message.tool_calls
                    ]
            elif isinstance(last_message, HumanMessage):
                content = str(last_message.content)

            # Log conversation
            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=str(message),
                ai_response=content,
                tool_calls=tool_calls if tool_calls else None,
                context=context.to_dict() if context else None,
            )

            return ChatResult(
                content=content,
                thread_id=thread_id,
                success=True,
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

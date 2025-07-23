"""AI service using LangGraph for extensible agent workflows."""

import logging
import os
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.language_models import BaseLanguageModel
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, MessagesState, StateGraph
from langgraph.prebuilt import ToolNode
from langgraph.types import interrupt

from ..kernel_interface import KernelInterface
from .logger import ConversationLogger

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


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
        self.llm = self._init_llm(model, provider, **kwargs)

        # Create memory for conversation history
        self.memory = MemorySaver()

        # Create the agent graph
        self.agent = self._create_agent_graph()

        # Initialize conversation logger
        self.conversation_logger = ConversationLogger()
        log_path = self.conversation_logger.start_session()
        logger.info(f"Started conversation logging to: {log_path}")

    def _init_llm(
        self,
        model: Optional[str] = None,
        provider: Optional[str] = None,
        **kwargs: Any,
    ) -> BaseLanguageModel:
        """Initialize language model with simple provider detection."""
        # Auto-detect if provider is None or "auto"
        if not provider or provider == "auto":
            providers = [
                ("openai", "gpt-4", "OPENAI_API_KEY"),
                ("anthropic", "claude-3-opus-20240229", "ANTHROPIC_API_KEY"),
                ("google_genai", "gemini-2.5-flash", "GOOGLE_API_KEY"),
            ]

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

        # Use explicit provider/model
        try:
            use_model = model or "gpt-4"
            return init_chat_model(model=use_model, model_provider=provider, **kwargs)
        except Exception as e:
            logger.error(f"Failed to initialize {provider}/{model}: {e}")
            logger.warning("Falling back to mock")
            from .mock import MockLLM

            return MockLLM()

    def _create_agent_graph(self) -> StateGraph:
        """Create the LangGraph agent with approval flow."""
        graph = StateGraph(MessagesState)

        # Create tools
        tools = self._create_kernel_tools()

        def call_model(state: MessagesState) -> Dict[str, List]:
            """Call the LLM with tools (synchronous version)."""
            messages = state["messages"]

            # Add system message if not present
            if not messages or not isinstance(messages[0], SystemMessage):
                messages = [SystemMessage(content=self._get_system_prompt())] + messages

            response = self.llm.bind_tools(tools).invoke(messages)
            return {"messages": [response]}

        # Add nodes
        graph.add_node("agent", call_model)
        graph.add_node("tools", ToolNode(tools))

        if self.require_approval:
            graph.add_node("approval", self._approval_node)

            # Add conditional edges with approval
            graph.add_conditional_edges(
                "agent",
                self._should_require_approval,
                {
                    "tools": "tools",
                    "approval": "approval",
                    END: END,
                },
            )
            graph.add_edge("approval", "tools")
        else:
            # Direct routing without approval
            graph.add_conditional_edges(
                "agent",
                self._should_continue,
                {
                    "tools": "tools",
                    END: END,
                },
            )

        graph.add_edge("tools", "agent")
        graph.set_entry_point("agent")

        return graph.compile(checkpointer=self.memory)

    def _should_continue(self, state: MessagesState) -> str:
        """Determine if we should continue to tools or end."""
        last_message = state["messages"][-1]

        if isinstance(last_message, AIMessage) and last_message.tool_calls:
            return "tools"

        return str(END)

    def _should_require_approval(self, state: MessagesState) -> str:
        """Determine if we need approval before executing tools."""
        last_message = state["messages"][-1]

        # If no tool calls, we're done
        if not isinstance(last_message, AIMessage) or not last_message.tool_calls:
            return str(END)

        # Check if any tool call is execute_code
        for tool_call in last_message.tool_calls:
            if tool_call["name"] == "execute_code":
                return "approval"

        # Other tools don't need approval
        return "tools"

    def _approval_node(self, state: MessagesState) -> Dict[str, List]:
        """Node that handles approval for code execution."""
        messages = state["messages"]
        last_message = messages[-1]

        # Extract code to be executed
        code_blocks = []
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
            # User denied - return message
            denial_msg = HumanMessage(content="Code execution denied by user.")
            return {"messages": [denial_msg]}

        # Approved - continue to tools
        return {}

    def chat(
        self,
        message: str | bool,
        thread_id: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
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
            else:
                # Normal message
                messages = []
                if context:
                    messages.append(
                        SystemMessage(content=self._build_context_message(context))
                    )
                messages.append(HumanMessage(content=message))
                payload = {"messages": messages}

            # Invoke the agent
            config = {"configurable": {"thread_id": thread_id}}
            response = self.agent.invoke(payload, config)

            # Check if interrupted for approval
            if "__interrupt__" in response:
                interrupt_msg = response["__interrupt__"][0].value.get(
                    "message", "Approval needed"
                )

                self.conversation_logger.log_conversation(
                    thread_id=thread_id,
                    user_message=str(message),
                    ai_response="[Awaiting approval]",
                    context=context,
                )

                return ChatResult(
                    content="",
                    thread_id=thread_id,
                    interrupted=True,
                    interrupt_message=interrupt_msg,
                )

            # Extract response
            last_message = response["messages"][-1]
            content = ""
            tool_calls = []

            if isinstance(last_message, AIMessage):
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
                context=context,
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
                context=context,
                error=str(e),
            )

            return ChatResult(
                content=error_msg,
                thread_id=thread_id,
                success=False,
                error=str(e),
            )

    def _create_kernel_tools(self) -> List[Any]:
        """Create kernel tools."""
        from langchain.tools import tool

        @tool  # type: ignore[misc]
        def get_variables() -> str:
            """List all variables in the kernel namespace."""
            if not self.kernel.is_available:
                return "Kernel not available"

            namespace = self.kernel.get_namespace()
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
            if not self.kernel.is_available:
                return "Kernel not available"

            var_info = self.kernel.get_variable_info(variable_name)
            if not var_info:
                return f"Variable '{variable_name}' not found"

            return (
                f"Variable: {var_info.name}\n"
                f"Type: {var_info.type_str}\n"
                f"Preview: {var_info.preview}"
            )

        @tool  # type: ignore[misc]
        def execute_code(code: str) -> str:
            """Execute Python code in the kernel. REQUIRES APPROVAL."""
            if not self.kernel.is_available:
                return "Kernel not available"

            result = self.kernel.execute_code(code)

            if result.success:
                output_parts = ["Code executed successfully."]
                if result.outputs:
                    for output in result.outputs:
                        if output["type"] == "execute_result":
                            output_parts.append(
                                f"Result: {output['data']['text/plain']}"
                            )
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
            info = self.kernel.get_kernel_info()
            return (
                f"Kernel Status: {'Available' if info['available'] else 'Not Available'}\n"
                f"Execution Count: {info['execution_count']}\n"
                f"Variables: {info.get('namespace_size', 0)}"
            )

        return [get_variables, inspect_variable, execute_code, kernel_info]

    def _build_context_message(self, context: Dict[str, Any]) -> str:
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

    def _get_system_prompt(self) -> str:
        """Get system prompt."""
        approval_note = (
            "\n\nIMPORTANT: The execute_code tool requires user approval. "
            "Other tools (get_variables, inspect_variable, kernel_info) execute automatically."
            if self.require_approval
            else ""
        )

        return f"""You are an AI assistant with access to a Jupyter kernel.

You can:
- List variables with get_variables()
- Inspect specific variables with inspect_variable(name)
- Execute Python code with execute_code(code)
- Check kernel status with kernel_info()

When users ask you to run or execute code, use execute_code().
When they ask about variables, use get_variables() or inspect_variable().
Be helpful and explain what you're doing.{approval_note}"""

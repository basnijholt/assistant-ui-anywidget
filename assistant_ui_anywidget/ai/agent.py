"""LangGraph agent for kernel interactions."""

from typing import Dict, List
from langgraph.graph import END, MessagesState, StateGraph
from langgraph.prebuilt import ToolNode
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.language_models import BaseLanguageModel

from ..kernel_interface import KernelInterface
from ..kernel_tools import create_kernel_tools


def create_kernel_agent(
    llm: BaseLanguageModel,
    kernel: KernelInterface,
    *,
    require_approval: bool = True,
) -> StateGraph:
    """Create a LangGraph agent for kernel interactions.

    Args:
        llm: The language model to use
        kernel: The kernel interface
        require_approval: Whether to require approval for code execution

    Returns:
        A compiled StateGraph agent
    """
    # Create kernel tools
    tools = create_kernel_tools(kernel)

    # Create the graph
    graph = StateGraph(MessagesState)

    async def call_model(state: MessagesState) -> Dict[str, List]:
        """Call the language model with tools."""
        messages = state["messages"]

        # Add system message if not present
        if not messages or not isinstance(messages[0], SystemMessage):
            system_message = SystemMessage(
                content="""You are an AI assistant with direct access to a Jupyter kernel.
You can inspect variables, execute code, and help users understand their data and debug issues.

Available tools:
- inspect_variable: Get detailed information about a variable
- execute_code: Run Python code in the kernel
- get_variables: List all variables in the namespace
- kernel_info: Get kernel status information

When users ask questions, actively use these tools to provide accurate, data-driven answers.
For example, if asked about a variable, inspect it first before responding."""
            )
            messages = [system_message] + messages

        response = await llm.bind_tools(tools).ainvoke(messages)
        return {"messages": [response]}

    # Add nodes
    graph.add_node("agent", call_model)
    graph.add_node("tools", ToolNode(tools))

    if require_approval:
        graph.add_node("approval", approval_node)

        # Add conditional edges
        graph.add_conditional_edges(
            "agent",
            should_require_approval,
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
            should_continue,
            {
                "tools": "tools",
                END: END,
            },
        )

    graph.add_edge("tools", "agent")
    graph.set_entry_point("agent")

    return graph.compile()


def should_continue(state: MessagesState) -> str:
    """Determine if we should continue to tools or end."""
    last_message = state["messages"][-1]

    # If the AI wants to use tools
    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        return "tools"

    # Otherwise, we're done
    return str(END)


def should_require_approval(state: MessagesState) -> str:
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


async def approval_node(state: MessagesState) -> Dict[str, List]:
    """Node that handles approval for code execution."""
    messages = state["messages"]
    last_message = messages[-1]

    # Extract code to be executed
    code_blocks = []
    for tool_call in last_message.tool_calls:
        if tool_call["name"] == "execute_code":
            code = tool_call["args"]["code"]
            code_blocks.append(code)

    # For now, auto-approve with a note
    # In a real implementation, this would pause for user approval
    approval_msg = HumanMessage(
        content=f"Auto-approved execution of {len(code_blocks)} code block(s)."
    )

    return {"messages": [approval_msg]}

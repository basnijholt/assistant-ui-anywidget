#!/usr/bin/env python3
"""Example of tools triggering interrupts directly in LangGraph + Pydantic AI."""

import asyncio
import os
from typing import Any, Dict, List, Optional
from dataclasses import dataclass

from dotenv import load_dotenv
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph
from langgraph.types import interrupt, Command
from pydantic_ai import Agent, RunContext
from typing_extensions import TypedDict

# Load environment variables
load_dotenv()


# Simple message structure
@dataclass
class Message:
    role: str  # "user" or "assistant" 
    content: str


# State for LangGraph
class AgentState(TypedDict):
    messages: List[Message]
    thread_id: Optional[str]


def get_model_string():
    """Get the appropriate model string based on available API keys."""
    if os.getenv("OPENAI_API_KEY"):
        return "openai:gpt-4o-mini"
    elif os.getenv("ANTHROPIC_API_KEY"):
        return "anthropic:claude-3-haiku-20240307"
    elif os.getenv("GOOGLE_API_KEY"):
        return "gemini-1.5-flash"
    else:
        return "test"


class InterruptingAgent:
    """Agent with tools that can trigger interrupts."""
    
    def __init__(self, require_approval: bool = True):
        self.require_approval = require_approval
        model = get_model_string()
        
        # Create agent
        self.agent = Agent(
            model,
            system_prompt=(
                "You are a helpful AI assistant with access to tools. "
                "When users ask you to calculate, execute code, or perform actions, "
                "use the appropriate tool. Be helpful and explain what you're doing."
            )
        )
        
        # Register tools
        @self.agent.tool
        async def calculate(ctx: RunContext[Any], expression: str) -> str:
            """Calculate a mathematical expression."""
            # Simple calculations don't need approval
            try:
                result = eval(expression, {"__builtins__": {}}, {})
                return f"Result: {result}"
            except Exception as e:
                return f"Error: {str(e)}"
        
        @self.agent.tool
        async def execute_code(ctx: RunContext[Any], code: str) -> str:
            """Execute Python code. May require approval."""
            if self.require_approval:
                # Trigger interrupt for approval
                approval_msg = (
                    f"Tool 'execute_code' requests approval:\n\n"
                    f"Code to execute:\n```python\n{code}\n```\n\n"
                    f"Approve? (yes/no)"
                )
                
                # This interrupt will pause the graph execution
                decision = interrupt({
                    "tool": "execute_code",
                    "message": approval_msg,
                    "code": code
                })
                
                # Check the decision
                if str(decision).lower() not in ["yes", "y", "approve", "true"]:
                    return "Code execution denied by user."
            
            # Execute the code (simulated)
            try:
                # For demo, we'll use a restricted eval
                import io
                import contextlib
                
                f = io.StringIO()
                with contextlib.redirect_stdout(f):
                    exec(code, {"print": print}, {})
                output = f.getvalue()
                
                if output:
                    return f"Code executed successfully.\nOutput:\n{output}"
                else:
                    # Try to get result from eval
                    result = eval(code, {"__builtins__": {}}, {})
                    return f"Code executed successfully.\nResult: {result}"
            except Exception as e:
                return f"Error executing code: {str(e)}"
        
        @self.agent.tool
        async def dangerous_operation(ctx: RunContext[Any], action: str) -> str:
            """Perform a potentially dangerous operation. Always requires approval."""
            # Always require approval for dangerous operations
            approval_msg = (
                f"⚠️ DANGEROUS OPERATION REQUESTED ⚠️\n\n"
                f"Action: {action}\n\n"
                f"This operation could have serious consequences. "
                f"Are you sure you want to proceed? (yes/no)"
            )
            
            decision = interrupt({
                "tool": "dangerous_operation",
                "message": approval_msg,
                "action": action,
                "danger_level": "high"
            })
            
            if str(decision).lower() not in ["yes", "y", "approve", "true"]:
                return "Operation cancelled by user."
            
            # Simulate the dangerous operation
            return f"Dangerous operation '{action}' completed successfully."
    
    async def process(self, message: str, conversation_history: List[Message]) -> str:
        """Process a message with conversation context."""
        # Build conversation context
        if conversation_history:
            context_parts = []
            for msg in conversation_history:
                if msg.role == "user":
                    context_parts.append(f"User: {msg.content}")
                elif msg.role == "assistant":
                    context_parts.append(f"Assistant: {msg.content}")
            
            history = "\n".join(context_parts)
            prompt = f"Previous conversation:\n{history}\n\nCurrent message: {message}"
        else:
            prompt = message
        
        # Run the agent
        result = await self.agent.run(prompt)
        return result.output


def create_workflow():
    """Create a LangGraph workflow with an interrupting agent."""
    
    # Create the agent
    agent = InterruptingAgent(require_approval=True)
    
    async def agent_node(state: AgentState) -> Dict[str, Any]:
        """Process messages with the agent."""
        # Get the last user message
        last_user_msg = None
        for msg in reversed(state["messages"]):
            if msg.role == "user":
                last_user_msg = msg
                break
        
        if not last_user_msg:
            return {"messages": state["messages"] + [Message(role="assistant", content="No message to process.")]}
        
        # Get conversation history (all except the last message)
        history = state["messages"][:-1] if len(state["messages"]) > 1 else []
        
        # Process with agent (tools may trigger interrupts)
        try:
            response = await agent.process(last_user_msg.content, history)
            return {"messages": state["messages"] + [Message(role="assistant", content=response)]}
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            return {"messages": state["messages"] + [Message(role="assistant", content=error_msg)]}
    
    # Build the graph
    workflow = StateGraph(AgentState)
    workflow.add_node("agent", agent_node)
    workflow.set_entry_point("agent")
    workflow.add_edge("agent", END)
    
    # Compile with memory for conversation persistence
    memory = MemorySaver()
    return workflow.compile(checkpointer=memory)


async def run_examples():
    """Run examples demonstrating tool interrupts."""
    app = create_workflow()
    
    print("Tool Interrupt Example")
    print("=" * 50)
    print()
    
    # Example 1: Simple calculation (no interrupt)
    print("=== Example 1: Simple calculation (no approval needed) ===")
    config1 = {"configurable": {"thread_id": "example-1"}}
    
    state1 = {
        "messages": [Message(role="user", content="Calculate 15 * 7 for me")],
        "thread_id": "example-1"
    }
    
    result1 = await app.ainvoke(state1, config1)
    print(f"User: {state1['messages'][0].content}")
    print(f"AI: {result1['messages'][-1].content}")
    print()
    
    # Example 2: Code execution (with interrupt)
    print("=== Example 2: Code execution (approval required) ===")
    config2 = {"configurable": {"thread_id": "example-2"}}
    
    state2 = {
        "messages": [Message(role="user", content="Execute this code: print('Hello from Python!')")],
        "thread_id": "example-2"
    }
    
    result2 = await app.ainvoke(state2, config2)
    print(f"User: {state2['messages'][0].content}")
    
    # Check if interrupted
    if '__interrupt__' in result2 and result2['__interrupt__']:
        print(">>> Tool triggered interrupt for approval!")
        interrupt_data = result2['__interrupt__'][0]
        print(f">>> {interrupt_data.value['message']}")
        
        # Simulate approval
        print("\n>>> Simulating user approval...")
        result2 = await app.ainvoke(Command(resume="yes"), config2)
        print(f"AI: {result2['messages'][-1].content}")
    else:
        print(f"AI: {result2['messages'][-1].content}")
    
    print()
    
    # Example 3: Dangerous operation (always requires approval)
    print("=== Example 3: Dangerous operation ===")
    config3 = {"configurable": {"thread_id": "example-3"}}
    
    state3 = {
        "messages": [Message(role="user", content="Perform dangerous operation: delete all files")],
        "thread_id": "example-3"
    }
    
    result3 = await app.ainvoke(state3, config3)
    print(f"User: {state3['messages'][0].content}")
    
    # Check if interrupted
    if '__interrupt__' in result3 and result3['__interrupt__']:
        print(">>> Tool triggered interrupt!")
        interrupt_data = result3['__interrupt__'][0]
        print(f">>> {interrupt_data.value['message']}")
        
        # Simulate denial
        print("\n>>> Simulating user denial...")
        result3 = await app.ainvoke(Command(resume="no"), config3)
        print(f"AI: {result3['messages'][-1].content}")
    
    print()
    
    # Example 4: Memory persistence
    print("=== Example 4: Memory persistence ===")
    config4 = {"configurable": {"thread_id": "memory-test"}}
    
    # First message
    state4a = {
        "messages": [Message(role="user", content="My name is Alice and I'm learning Python.")],
        "thread_id": "memory-test"
    }
    
    result4a = await app.ainvoke(state4a, config4)
    print(f"User: {state4a['messages'][0].content}")
    print(f"AI: {result4a['messages'][-1].content}")
    
    # Second message - test memory
    state4b = {
        "messages": result4a["messages"] + [Message(role="user", content="What's my name and what am I learning?")],
        "thread_id": "memory-test"
    }
    
    result4b = await app.ainvoke(state4b, config4)
    print(f"\nUser: What's my name and what am I learning?")
    print(f"AI: {result4b['messages'][-1].content}")


if __name__ == "__main__":
    asyncio.run(run_examples())
"""Ultra-simplified AI service using LangGraph functional API with proper memory."""

import os
from typing import Any, Dict, Optional, List
from dataclasses import dataclass

from dotenv import load_dotenv
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, START, END
from langgraph.types import interrupt
from pydantic_ai import Agent, RunContext
from typing_extensions import Annotated, TypedDict

from ..kernel_interface import KernelInterface, KernelContext

# Load environment variables
load_dotenv()


def add_messages(left: List[Dict], right: List[Dict]) -> List[Dict]:
    """Simple message reducer."""
    return left + right


class State(TypedDict):
    """State with conversation history."""
    messages: Annotated[List[Dict], add_messages]


@dataclass
class ChatResult:
    """Result of a chat operation."""
    content: str
    thread_id: str
    success: bool = True
    error: Optional[str] = None


def get_model_string() -> str:
    """Auto-detect available AI provider.
    
    Note: Gemini has known issues with tool calling in Pydantic AI
    See: https://github.com/pydantic/pydantic-ai/issues/631
    """
    if os.getenv("OPENAI_API_KEY"):
        return "openai:gpt-4o-mini"
    elif os.getenv("ANTHROPIC_API_KEY"):
        return "anthropic:claude-3-haiku-20240307"
    elif os.getenv("GOOGLE_API_KEY"):
        return "gemini-1.5-flash"
    else:
        return "test"


class SimpleFunctionalAIService:
    """Ultra-simple AI service with proper conversation memory."""
    
    def __init__(
        self,
        kernel: KernelInterface,
        model: Optional[str] = None,
        provider: Optional[str] = None,
        require_approval: bool = True,
    ):
        self.kernel = kernel
        self.require_approval = require_approval
        
        # Create Pydantic AI agent
        model_string = model or get_model_string()
        self.agent = self._create_agent(model_string)
        
        # Create LangGraph workflow
        self.graph = self._create_graph()
        
    def _create_agent(self, model_string: str) -> Agent:
        """Create Pydantic AI agent with kernel tools."""
        agent = Agent(
            model_string,
            system_prompt="""You are an AI assistant with access to a Jupyter kernel.
            
When users ask you to execute code, use the execute_code tool.
When users ask about variables, use the inspect tools.
Be helpful and explain what you're doing."""
        )
        
        @agent.tool
        def execute_code(ctx: RunContext[Any], code: str) -> str:
            """Execute Python code in the kernel."""
            if not self.kernel.is_available:
                return "Kernel not available"
            
            # If approval required, interrupt for user decision
            if self.require_approval:
                decision = interrupt({
                    "type": "code_approval",
                    "code": code,
                    "message": f"Approve code execution?\n\n```python\n{code}\n```"
                })
                
                if str(decision).lower() not in ["yes", "y", "approve", "approved", "true"]:
                    return "Code execution denied by user."
            
            # Execute the code
            result = self.kernel.execute_code(code)
            
            if result.success:
                outputs = []
                if result.outputs:
                    for output in result.outputs:
                        if output["type"] == "execute_result":
                            outputs.append(f"Result: {output['data']['text/plain']}")
                        elif output["type"] == "stream":
                            outputs.append(f"Output: {output['text']}")
                return "\n".join(outputs) if outputs else "Code executed successfully."
            else:
                return f"Error: {result.error['message'] if result.error else 'Unknown error'}"
        
        @agent.tool
        def get_variables(ctx: RunContext[Any]) -> str:
            """List all variables in the kernel namespace."""
            if not self.kernel.is_available:
                return "Kernel not available"
            
            namespace = self.kernel.get_namespace()
            if not namespace:
                return "No variables in namespace"
            
            return f"Variables: {', '.join(name for name in namespace.keys() if not name.startswith('_'))}"
        
        return agent
    
    def _create_graph(self) -> StateGraph:
        """Create the LangGraph workflow."""
        def chat_node(state: State) -> Dict[str, Any]:
            """Process chat with conversation history."""
            messages = state.get("messages", [])
            
            # Build prompt with conversation history
            if messages:
                # Format conversation history
                history_parts = []
                for msg in messages[:-1]:  # All except the last
                    role = msg.get("role", "user")
                    content = msg.get("content", "")
                    if role == "user":
                        history_parts.append(f"User: {content}")
                    elif role == "assistant":
                        history_parts.append(f"Assistant: {content}")
                
                # Get current message
                current_msg = messages[-1].get("content", "")
                
                if history_parts:
                    prompt = f"Previous conversation:\n" + "\n".join(history_parts) + f"\n\nUser: {current_msg}"
                else:
                    prompt = current_msg
            else:
                prompt = "Hello"
            
            # Run the Pydantic AI agent
            try:
                result = self.agent.run_sync(prompt)
                response = result.output
            except Exception as e:
                response = f"Error: {str(e)}"
            
            # Return new message to append
            return {"messages": [{"role": "assistant", "content": response}]}
        
        # Build the graph
        workflow = StateGraph(State)
        workflow.add_node("chat", chat_node)
        workflow.add_edge(START, "chat")
        workflow.add_edge("chat", END)
        
        # Compile with memory
        memory = MemorySaver()
        return workflow.compile(checkpointer=memory)
    
    def chat(
        self,
        message: str,
        thread_id: str,
        context: Optional[KernelContext] = None,
    ) -> ChatResult:
        """Send message and get response."""
        try:
            config = {"configurable": {"thread_id": thread_id}}
            
            # Handle approval responses
            if message.lower() in ["approve", "approved", "yes", "y", "true", "deny", "no", "n", "false"]:
                from langgraph.types import Command
                result = self.graph.invoke(Command(resume=message), config)
            else:
                # Add context if provided
                if context:
                    context_info = f"[Context: Kernel has {len(context.variables)} variables]"
                    message = f"{context_info} {message}"
                
                # Regular message
                input_state = {"messages": [{"role": "user", "content": message}]}
                result = self.graph.invoke(input_state, config)
            
            # Extract response
            if result and "messages" in result and result["messages"]:
                # Find the last assistant message
                for msg in reversed(result["messages"]):
                    if msg.get("role") == "assistant":
                        return ChatResult(
                            content=msg.get("content", "No response"),
                            thread_id=thread_id,
                            success=True
                        )
            
            return ChatResult(
                content="No response generated",
                thread_id=thread_id,
                success=False,
                error="No assistant message found"
            )
            
        except Exception as e:
            # Check for interrupt
            if "__interrupt__" in str(e):
                return ChatResult(
                    content="Approve code execution?\n\nRespond with 'approve' or 'deny'.",
                    thread_id=thread_id,
                    success=True
                )
            
            return ChatResult(
                content=f"Error: {str(e)}",
                thread_id=thread_id,
                success=False,
                error=str(e)
            )
"""Simplified AI service using Pydantic AI with LangGraph functional API."""

import os
from typing import Any, Optional
from dataclasses import dataclass

from dotenv import load_dotenv
from langgraph.checkpoint.memory import MemorySaver
from langgraph.func import entrypoint, task
from langgraph.types import interrupt
from pydantic_ai import Agent, RunContext

from ..kernel_interface import KernelInterface, KernelContext

# Load environment variables
load_dotenv()


@dataclass
class ChatResult:
    """Result of a chat operation."""
    content: str
    thread_id: str
    success: bool = True
    error: Optional[str] = None


def get_model_string() -> str:
    """Auto-detect available AI provider."""
    if os.getenv("OPENAI_API_KEY"):
        return "openai:gpt-4o-mini"
    elif os.getenv("ANTHROPIC_API_KEY"):
        return "anthropic:claude-3-haiku-20240307"
    elif os.getenv("GOOGLE_API_KEY"):
        return "gemini-1.5-flash"
    else:
        return "test"


class SimplifiedPydanticAIService:
    """Simplified AI service with clean LangGraph integration."""
    
    def __init__(
        self,
        kernel: KernelInterface,
        model: Optional[str] = None,
        provider: Optional[str] = None,
        require_approval: bool = True,
    ):
        self.kernel = kernel
        self.require_approval = require_approval
        self.checkpointer = MemorySaver()
        
        # Create Pydantic AI agent with tools
        model_string = model or get_model_string()
        self.agent = self._create_agent(model_string)
        
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
        def get_variables(ctx: RunContext[Any]) -> str:
            """List all variables in the kernel namespace."""
            if not self.kernel.is_available:
                return "Kernel not available"
            
            namespace = self.kernel.get_namespace()
            if not namespace:
                return "No variables in namespace"
            
            return f"Variables: {', '.join(name for name in namespace.keys() if not name.startswith('_'))}"
        
        @agent.tool
        def inspect_variable(ctx: RunContext[Any], variable_name: str) -> str:
            """Inspect a specific variable."""
            if not self.kernel.is_available:
                return "Kernel not available"
            
            var_info = self.kernel.get_variable_info(variable_name)
            if not var_info:
                return f"Variable '{variable_name}' not found"
            
            return f"{var_info.name}: {var_info.type_str} = {var_info.preview}"
        
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
        
        return agent
    
    def chat(
        self,
        message: str,
        thread_id: str,
        context: Optional[KernelContext] = None,
    ) -> ChatResult:
        """Send message and get response."""
        try:
            # Build full query with context
            query = message
            if context:
                context_info = f"Kernel has {len(context.variables)} variables"
                if context.recent_cells:
                    context_info += f" and {len(context.recent_cells)} recent cells"
                query = f"Context: {context_info}\n\nUser: {message}"
            
            # Create the task that calls Pydantic AI
            @task
            def ai_respond(q: str) -> str:
                # Use sync version of run
                result = self.agent.run_sync(q)
                return result.output
            
            # Create the entrypoint
            @entrypoint(checkpointer=self.checkpointer)
            def chat_workflow(user_query: str) -> str:
                return ai_respond(user_query).result()
            
            # Run the workflow
            config = {"configurable": {"thread_id": thread_id}}
            
            # Handle both initial messages and approval responses
            if message.lower() in ["approve", "approved", "yes", "y", "true", "deny", "no", "n", "false"]:
                # This is an approval response
                from langgraph.types import Command
                events = list(chat_workflow.stream(Command(resume=message), config))
            else:
                # This is a new message
                events = list(chat_workflow.stream(query, config))
            
            # Get the final result
            if events:
                result = events[-1]
                # Extract the actual content from the result
                if isinstance(result, dict) and 'chat_workflow' in result:
                    content = result['chat_workflow']
                else:
                    content = str(result)
                
                return ChatResult(
                    content=content,
                    thread_id=thread_id,
                    success=True
                )
            else:
                return ChatResult(
                    content="No response generated",
                    thread_id=thread_id,
                    success=False,
                    error="No events from workflow"
                )
                
        except Exception as e:
            # Check if this is an interrupt (needs approval)
            if "interrupt" in str(type(e)).lower():
                # Extract interrupt data
                interrupt_data = getattr(e, 'value', {})
                if isinstance(interrupt_data, dict) and interrupt_data.get('type') == 'code_approval':
                    return ChatResult(
                        content=interrupt_data.get('message', 'Approval required'),
                        thread_id=thread_id,
                        success=True
                    )
            
            return ChatResult(
                content=f"Error: {str(e)}",
                thread_id=thread_id,
                success=False,
                error=str(e)
            )
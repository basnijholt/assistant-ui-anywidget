"""AI service for the assistant widget."""

import os
import uuid
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Union
import logging

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.language_models import BaseLanguageModel
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.runnables import RunnableConfig
from langgraph.checkpoint.memory import MemorySaver

from ..kernel_interface import KernelInterface
from .agent import create_kernel_agent
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
    tool_calls: Optional[List[Dict[str, Any]]] = None


class AIService:
    """AI service that manages conversations with kernel access."""
    
    def __init__(
        self,
        kernel: KernelInterface,
        model: Optional[str] = None,
        provider: Optional[str] = None,
        require_approval: bool = True,
        **kwargs: Any,
    ):
        """Initialize the AI service.
        
        Args:
            kernel: The kernel interface
            model: Model name (e.g., "gpt-4", "claude-3-opus")
            provider: Provider name (e.g., "openai", "anthropic", "google_genai")
            require_approval: Whether to require approval for code execution
            **kwargs: Additional arguments passed to init_chat_model
        """
        self.kernel = kernel
        self.require_approval = require_approval
        
        # Initialize the language model
        self.llm = self._init_llm(model, provider, **kwargs)
        
        # Create memory for conversation history
        self.memory = MemorySaver()
        
        # Create the agent
        agent_graph = create_kernel_agent(
            self.llm,
            self.kernel,
            require_approval=require_approval,
        )
        self.agent = agent_graph
        
        # Store active threads
        self._threads: Dict[str, List[Dict[str, Any]]] = {}
        
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
        """Initialize the language model with automatic provider detection.
        
        If no provider is specified, automatically detects available API keys
        and selects the best available provider in order of preference:
        1. OpenAI (GPT-4 if available)
        2. Anthropic (Claude)
        3. Google (Gemini)
        """
        # Detect available providers
        available_providers = []
        if os.getenv("OPENAI_API_KEY"):
            available_providers.append(("openai", "gpt-4"))
        if os.getenv("ANTHROPIC_API_KEY"):
            available_providers.append(("anthropic", "claude-3-opus-20240229"))
        if os.getenv("GOOGLE_API_KEY"):
            available_providers.append(("google_genai", "gemini-1.5-flash"))
        
        # If provider/model not specified, auto-select based on availability
        if not provider:
            if available_providers:
                provider, default_model = available_providers[0]
                if not model:
                    model = default_model
                logger.info(f"Auto-detected {provider} provider with {len(available_providers)} provider(s) available")
            else:
                # No API keys found, fall back to mock
                logger.warning(
                    "No AI provider configured. Set OPENAI_API_KEY, ANTHROPIC_API_KEY, "
                    "or GOOGLE_API_KEY to use an AI model."
                )
                from .mock import MockLLM
                return MockLLM()
        
        # If only model specified, try to infer provider
        elif not provider and model:
            if "gpt" in model.lower():
                provider = "openai"
            elif "claude" in model.lower():
                provider = "anthropic"
            elif "gemini" in model.lower():
                provider = "google_genai"
            else:
                # Try first available provider
                if available_providers:
                    provider = available_providers[0][0]
                    logger.info(f"Using {provider} for model {model}")
        
        try:
            return init_chat_model(model=model, model_provider=provider, **kwargs)
        except Exception as e:
            logger.error(f"Failed to initialize {provider} model: {e}")
            logger.info("Falling back to mock model")
            from .mock import MockLLM
            return MockLLM()
    
    async def chat(
        self,
        message: str,
        thread_id: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> ChatResult:
        """Send a message to the AI and get a response.
        
        Args:
            message: The user's message
            thread_id: Conversation thread ID (creates new if None)
            context: Additional context about kernel state
            
        Returns:
            ChatResult with the AI's response
        """
        if thread_id is None:
            thread_id = str(uuid.uuid4())
        
        try:
            # Prepare the configuration
            config: RunnableConfig = {
                "configurable": {"thread_id": thread_id},
                "run_id": uuid.uuid4(),
            }
            
            # Add context to the first message if provided
            messages = []
            if context and thread_id not in self._threads:
                context_msg = self._build_context_message(context)
                messages.append(SystemMessage(content=context_msg))
            
            messages.append(HumanMessage(content=message))
            
            # Run the agent
            response = await self.agent.ainvoke(
                {"messages": messages},
                config,
            )
            
            # Extract the response
            last_message = response["messages"][-1]
            
            if isinstance(last_message, AIMessage):
                return ChatResult(
                    content=last_message.content or "",
                    thread_id=thread_id,
                    tool_calls=last_message.tool_calls if last_message.tool_calls else None,
                )
            else:
                # Fallback for other message types
                return ChatResult(
                    content=str(last_message.content),
                    thread_id=thread_id,
                )
            
        except Exception as e:
            logger.error(f"Error in AI chat: {e}")
            return ChatResult(
                content=f"I encountered an error: {str(e)}",
                thread_id=thread_id,
                success=False,
                error=str(e),
            )
    
    def chat_sync(
        self,
        message: str,
        thread_id: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> ChatResult:
        """Synchronous version of chat.
        
        For now, we'll use a simple synchronous approach to avoid
        event loop issues in Jupyter notebooks.
        """
        if thread_id is None:
            thread_id = str(uuid.uuid4())
        
        try:
            # Build messages list
            messages = []
            
            # Add system prompt for new threads
            if thread_id not in self._threads:
                system_prompt = self._get_system_prompt()
                messages.append({"role": "system", "content": system_prompt})
                
                # Add context if provided
                if context:
                    context_msg = self._build_context_message(context)
                    messages.append({"role": "system", "content": context_msg})
                
                # Track that we've initialized this thread
                self._threads[thread_id] = []
            
            messages.append({"role": "user", "content": message})
            
            # Create tools and bind to LLM
            from ..kernel_tools import create_kernel_tools
            from langchain_core.messages import AIMessage, ToolMessage
            from langgraph.prebuilt import ToolNode
            
            tools = create_kernel_tools(self.kernel)
            llm_with_tools = self.llm.bind_tools(tools)
            
            # Store conversation in thread
            self._threads[thread_id].extend(messages)
            
            # Invoke the LLM with tools
            response = llm_with_tools.invoke(messages)
            
            # Handle tool calls if present
            if hasattr(response, 'tool_calls') and response.tool_calls:
                # Create tool node for execution
                tool_node = ToolNode(tools)
                
                # Execute tools through ToolNode (proper LangGraph pattern)
                tool_messages = tool_node.invoke({"messages": messages + [response]})
                
                # Get final response after tool execution
                final_messages = messages + [response] + tool_messages["messages"]
                final_response = llm_with_tools.invoke(final_messages)
                
                # Store full conversation
                self._threads[thread_id] = final_messages + [final_response]
                
                # Log conversation with tool calls
                tool_call_info = []
                for tc in response.tool_calls:
                    tool_call_info.append({
                        "name": tc.get("name"),
                        "args": tc.get("args"),
                        "id": tc.get("id")
                    })
                
                self.conversation_logger.log_conversation(
                    thread_id=thread_id,
                    user_message=message,
                    ai_response=final_response.content,
                    tool_calls=tool_call_info,
                    context=context
                )
                
                return ChatResult(
                    content=final_response.content,
                    thread_id=thread_id,
                    success=True,
                )
            
            # Store response in thread
            self._threads[thread_id].append(response)
            
            # Log conversation without tool calls
            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=message,
                ai_response=response.content,
                context=context
            )
            
            return ChatResult(
                content=response.content,
                thread_id=thread_id,
                success=True,
            )
            
        except Exception as e:
            logger.error(f"Error in AI chat: {e}")
            
            # Log error
            self.conversation_logger.log_conversation(
                thread_id=thread_id,
                user_message=message,
                ai_response=f"I encountered an error: {str(e)}",
                context=context,
                error=str(e)
            )
            
            return ChatResult(
                content=f"I encountered an error: {str(e)}",
                thread_id=thread_id,
                success=False,
                error=str(e),
            )
    
    def _build_context_message(self, context: Dict[str, Any]) -> str:
        """Build a context message for the AI."""
        parts = []
        
        if "kernel_info" in context:
            info = context["kernel_info"]
            parts.append(f"Kernel is {info.get('status', 'unknown')} with {info.get('namespace_size', 0)} variables.")
        
        if "variables" in context:
            vars_summary = []
            for var in context["variables"][:5]:  # First 5 variables
                vars_summary.append(f"- {var['name']}: {var['type']}")
            if vars_summary:
                parts.append("Key variables:\n" + "\n".join(vars_summary))
        
        if "last_error" in context:
            error = context["last_error"]
            parts.append(f"Recent error: {error.get('type', 'Unknown')}: {error.get('message', '')}")
        
        return "\n".join(parts) if parts else "Kernel context is available."
    
    def _get_system_prompt(self) -> str:
        """Get the system prompt that explains the AI's capabilities."""
        return """You are an AI assistant integrated into a Jupyter notebook widget with direct access to the kernel.

Your capabilities include:
1. **Inspecting variables**: You can examine any variable in the notebook's namespace, including its type, value, shape (for arrays/dataframes), and attributes.
2. **Executing code**: You can run Python code directly in the kernel to perform calculations, create visualizations, or modify variables.
3. **Listing variables**: You can see all variables currently defined in the notebook.
4. **Getting kernel info**: You can check the kernel's status and execution count.

When users ask about variables or request calculations:
- Use the inspect_variable tool to examine specific variables
- Use the execute_code tool to run Python code
- Use the get_variables tool to list available variables
- Use the kernel_info tool to check kernel status

Important guidelines:
- Always be helpful and explain what you're doing
- When executing code that might be dangerous (like deleting variables or installing packages), explain the risks
- If users ask about your capabilities, explain that you can directly access and manipulate their notebook environment
- You are NOT just a language model - you have real access to their Jupyter kernel

Remember: You are an active participant in their notebook session, not just a passive Q&A system."""
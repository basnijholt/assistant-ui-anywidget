"""AI service integration for the assistant widget."""

import os
import json
from typing import Any, Dict, List, Optional, Iterator
from abc import ABC, abstractmethod
import logging

logger = logging.getLogger(__name__)


class AIProvider(ABC):
    """Abstract base class for AI providers."""
    
    @abstractmethod
    def generate_response(self, messages: List[Dict[str, str]], **kwargs) -> str:
        """Generate a response from the AI model."""
        pass
    
    @abstractmethod
    def generate_response_stream(self, messages: List[Dict[str, str]], **kwargs) -> Iterator[str]:
        """Generate a streaming response from the AI model."""
        pass


class OpenAIProvider(AIProvider):
    """OpenAI API provider."""
    
    def __init__(self, api_key: Optional[str] = None, model: str = "gpt-3.5-turbo"):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.model = model
        self.client = None
        
        if self.api_key:
            try:
                import openai
                self.client = openai.OpenAI(api_key=self.api_key)
            except ImportError:
                logger.warning("OpenAI package not installed. Install with: pip install openai")
            except Exception as e:
                logger.error(f"Failed to initialize OpenAI client: {e}")
    
    def generate_response(self, messages: List[Dict[str, str]], **kwargs) -> str:
        """Generate a response using OpenAI."""
        if not self.client:
            return "OpenAI API is not configured. Please set OPENAI_API_KEY environment variable."
        
        try:
            response = self.client.chat.completions.create(
                model=kwargs.get("model", self.model),
                messages=messages,
                temperature=kwargs.get("temperature", 0.7),
                max_tokens=kwargs.get("max_tokens", 2000),
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            return f"Error calling OpenAI API: {str(e)}"
    
    def generate_response_stream(self, messages: List[Dict[str, str]], **kwargs) -> Iterator[str]:
        """Generate a streaming response using OpenAI."""
        if not self.client:
            yield "OpenAI API is not configured. Please set OPENAI_API_KEY environment variable."
            return
        
        try:
            stream = self.client.chat.completions.create(
                model=kwargs.get("model", self.model),
                messages=messages,
                temperature=kwargs.get("temperature", 0.7),
                max_tokens=kwargs.get("max_tokens", 2000),
                stream=True,
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
        except Exception as e:
            logger.error(f"OpenAI API streaming error: {e}")
            yield f"Error calling OpenAI API: {str(e)}"


class MockAIProvider(AIProvider):
    """Mock AI provider for testing and when no API is configured."""
    
    def generate_response(self, messages: List[Dict[str, str]], **kwargs) -> str:
        """Generate a mock response."""
        last_message = messages[-1]["content"] if messages else ""
        
        # Provide helpful responses for common queries
        if "hello" in last_message.lower() or "hi" in last_message.lower():
            return "Hello! I'm your AI assistant with kernel access. I can help you explore variables, execute code, and debug your notebook. Try asking me to show you the variables in your namespace!"
        
        elif "help" in last_message.lower():
            return """I can help you with:
- Exploring variables: "Show me all variables" or "What's in df?"
- Executing code: "Calculate the mean of data_array"
- Debugging: "Why am I getting this error?"
- Analysis: "Analyze the structure of my data"

Try using commands like /vars, /inspect <var>, or /exec <code>!"""
        
        elif "variable" in last_message.lower() or "namespace" in last_message.lower():
            return "I can see the variables in your namespace. Use the `/vars` command to list them all, or `/inspect <variable_name>` to examine a specific variable in detail."
        
        else:
            return f"I understand you said: '{last_message}'. As a mock AI, I can't provide intelligent responses, but in a real implementation, I would analyze your request and help you with your notebook. Try installing OpenAI: `pip install openai` and setting your API key."
    
    def generate_response_stream(self, messages: List[Dict[str, str]], **kwargs) -> Iterator[str]:
        """Generate a mock streaming response."""
        response = self.generate_response(messages, **kwargs)
        # Simulate streaming by yielding words one at a time
        words = response.split()
        for i, word in enumerate(words):
            if i > 0:
                yield " "
            yield word


class AIService:
    """Main AI service that manages different providers."""
    
    def __init__(self, provider: str = "auto", **kwargs):
        """Initialize AI service with specified provider.
        
        Args:
            provider: Provider name ('openai', 'mock', 'auto')
            **kwargs: Provider-specific configuration
        """
        self.provider_name = provider
        self.provider: AIProvider
        
        if provider == "auto":
            # Try OpenAI first if API key is available
            if os.getenv("OPENAI_API_KEY"):
                self.provider = OpenAIProvider(**kwargs)
                self.provider_name = "openai"
            else:
                self.provider = MockAIProvider()
                self.provider_name = "mock"
        elif provider == "openai":
            self.provider = OpenAIProvider(**kwargs)
        elif provider == "mock":
            self.provider = MockAIProvider()
        else:
            raise ValueError(f"Unknown provider: {provider}")
    
    def generate_response(self, messages: List[Dict[str, str]], 
                         context: Optional[Dict[str, Any]] = None, **kwargs) -> str:
        """Generate a response with optional context about the kernel state."""
        # If context is provided, add it to the system message
        if context:
            context_message = self._build_context_message(context)
            full_messages = [{"role": "system", "content": context_message}] + messages
        else:
            full_messages = messages
        
        return self.provider.generate_response(full_messages, **kwargs)
    
    def generate_response_stream(self, messages: List[Dict[str, str]], 
                               context: Optional[Dict[str, Any]] = None, **kwargs) -> Iterator[str]:
        """Generate a streaming response with optional context."""
        # If context is provided, add it to the system message
        if context:
            context_message = self._build_context_message(context)
            full_messages = [{"role": "system", "content": context_message}] + messages
        else:
            full_messages = messages
        
        return self.provider.generate_response_stream(full_messages, **kwargs)
    
    def _build_context_message(self, context: Dict[str, Any]) -> str:
        """Build a system message with kernel context."""
        parts = [
            "You are an AI assistant embedded in a Jupyter notebook with direct kernel access.",
            "You can inspect variables, execute code, and help debug issues."
        ]
        
        if "variables" in context:
            var_summary = []
            for var in context["variables"][:10]:  # Limit to first 10
                var_summary.append(f"- {var['name']}: {var['type']}")
            if var_summary:
                parts.append(f"\nCurrent variables in namespace:\n" + "\n".join(var_summary))
        
        if "last_error" in context and context["last_error"]:
            parts.append(f"\nLast error: {context['last_error']['type']}: {context['last_error']['message']}")
        
        parts.append("\nYou can use commands like /vars, /inspect <var>, /exec <code> to interact with the kernel.")
        
        return "\n".join(parts)
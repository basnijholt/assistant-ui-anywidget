"""AI integration module for the assistant widget."""

from .simple_service import SimpleAIService, ChatResult
from .langgraph_service import LangGraphAIService
from .logger import ConversationLogger

# Default to simple service for backward compatibility
AIService = SimpleAIService

__all__ = [
    "AIService",
    "SimpleAIService",
    "LangGraphAIService",
    "ChatResult",
    "ConversationLogger",
]

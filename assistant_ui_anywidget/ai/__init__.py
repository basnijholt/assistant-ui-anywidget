"""AI integration module for the assistant widget."""

from .langgraph_service import LangGraphAIService, ChatResult
from .logger import ConversationLogger

# Use LangGraph as the only AI service
AIService = LangGraphAIService

__all__ = [
    "AIService",
    "LangGraphAIService",
    "ChatResult",
    "ConversationLogger",
]

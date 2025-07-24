"""AI integration module for the assistant widget."""

from .pydantic_ai_service import PydanticAIService, ChatResult
from .logger import ConversationLogger

# Use Pydantic AI as the default AI service
AIService = PydanticAIService

__all__ = [
    "AIService",
    "PydanticAIService",
    "ChatResult",
    "ConversationLogger",
]

"""AI integration module for the assistant widget."""

from .agent import create_kernel_agent
from .service import AIService, ChatResult
from .logger import ConversationLogger

__all__ = ["create_kernel_agent", "AIService", "ChatResult", "ConversationLogger"]

"""AI integration module for the assistant widget."""

from .agent import create_kernel_agent
from .service import AIService, ChatResult

__all__ = ["create_kernel_agent", "AIService", "ChatResult"]
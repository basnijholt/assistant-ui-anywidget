"""Assistant UI AnyWidget package."""

from .agent_widget import AgentWidget
from .kernel_interface import KernelInterface, VariableInfo, ExecutionResult, StackFrame
from .message_handlers import MessageHandlers, ErrorCode

# Global agent interface for notebook convenience
from .global_agent import (
    get_agent,
    reset_agent,
    has_agent,
    get_agent_info,
    display_agent,
    agent,  # Alias for get_agent
)

# Backward compatibility alias - both names point to the same class
EnhancedAgentWidget = AgentWidget

__all__ = [
    # Core widget classes
    "AgentWidget",
    "EnhancedAgentWidget",
    # Kernel and messaging interfaces
    "KernelInterface",
    "VariableInfo",
    "ExecutionResult",
    "StackFrame",
    "MessageHandlers",
    "ErrorCode",
    # Global agent interface (recommended for notebooks)
    "get_agent",
    "reset_agent",
    "has_agent",
    "get_agent_info",
    "display_agent",
    "agent",  # Shorthand alias
]

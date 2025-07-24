"""Assistant UI AnyWidget package."""

from .agent_widget import AgentWidget
from .kernel_interface import KernelInterface, VariableInfo, ExecutionResult, StackFrame
from .simple_handlers import SimpleHandlers

# Global agent interface for notebook convenience
from .global_agent import (
    get_agent,
    reset_agent,
    has_agent,
    get_agent_info,
    display_agent,
    agent,  # Alias for get_agent
)


__all__ = [
    # Core widget classes
    "AgentWidget",
    # Kernel and messaging interfaces
    "KernelInterface",
    "VariableInfo",
    "ExecutionResult",
    "StackFrame",
    "SimpleHandlers",
    # Global agent interface (recommended for notebooks)
    "get_agent",
    "reset_agent",
    "has_agent",
    "get_agent_info",
    "display_agent",
    "agent",  # Shorthand alias
]

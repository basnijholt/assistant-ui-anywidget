"""Assistant UI AnyWidget package."""

from .agent_widget import AgentWidget

# Global agent interface for notebook convenience
from .global_agent import (
    get_agent,
    reset_agent,
)
from .kernel_interface import ExecutionResult, KernelInterface, StackFrame, VariableInfo
from .simple_handlers import SimpleHandlers

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
]

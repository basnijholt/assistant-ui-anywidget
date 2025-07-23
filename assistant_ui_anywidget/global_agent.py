"""Global agent instance management for notebook convenience.

This module provides a simple way to get an agent instance in notebooks
without worrying about keyboard shortcuts conflicts. The global agent
prevents accidental cell execution when using Shift+Enter or Ctrl+Enter.
"""

from typing import Any, Dict, Optional
import threading

from .agent_widget import AgentWidget


# Global agent instance
_global_agent: Optional[AgentWidget] = None
_agent_lock = threading.Lock()


def get_agent(
    ai_config: Optional[Dict[str, Any]] = None, reset: bool = False, **kwargs: Any
) -> AgentWidget:
    """Get the global agent instance for notebook use.

    This function provides a convenient way to get an AI assistant widget
    in Jupyter notebooks. It maintains a single global instance to avoid
    conflicts and provides consistent state across cells.

    Args:
        ai_config: Optional AI configuration dictionary. Common options:
            - require_approval: bool = False  # Auto-approve code execution
            - provider: str = 'auto'          # 'openai', 'anthropic', 'google_genai', or 'auto'
            - model: str = None               # Model name (auto-detected if None)
            - temperature: float = 0.7        # Response randomness (0.0-1.0)
            - max_tokens: int = 2000          # Maximum response length
        reset: If True, creates a new agent instance (discarding the current one)
        **kwargs: Additional arguments passed to AgentWidget

    Returns:
        AgentWidget: The global agent instance

    Example:
        ```python
        from assistant_ui_anywidget import get_agent

        # Get the agent (creates if doesn't exist)
        agent = get_agent()

        # With custom configuration
        agent = get_agent(ai_config={
            'require_approval': False,
            'provider': 'openai',
            'model': 'gpt-4'
        })

        # Reset to create a fresh instance
        agent = get_agent(reset=True)
        ```

    Note:
        The agent widget uses Ctrl+D to send messages instead of Shift+Enter
        to avoid conflicts with Jupyter's cell execution shortcuts.
    """
    global _global_agent

    with _agent_lock:
        if _global_agent is None or reset:
            if reset and _global_agent is not None:
                # Clean up the old instance
                try:
                    _global_agent.close()
                except Exception:
                    pass  # Ignore cleanup errors

            # Set up default AI configuration
            default_ai_config = {
                "require_approval": False,  # More convenient for notebook use
                "provider": "auto",  # Auto-detect available providers
            }

            if ai_config:
                default_ai_config.update(ai_config)

            # Create new instance
            _global_agent = AgentWidget(ai_config=default_ai_config, **kwargs)

            # Add helpful message about keyboard shortcuts
            _global_agent.add_message(
                "assistant",
                "👋 Welcome! I'm your AI assistant with kernel access.\n\n"
                "💡 **Tip**: Use **Ctrl+D** to send messages (not Shift+Enter) to avoid "
                "accidentally executing notebook cells.\n\n"
                "Try asking me things like:\n"
                '• "Show me all my variables"\n'
                '• "What\'s in my DataFrame?"\n'
                '• "Help me debug this error"\n\n'
                "You can also use slash commands like `/vars`, `/help`, or `/exec <code>`.",
            )

    return _global_agent


def reset_agent() -> None:
    """Reset the global agent instance.

    This will close the current agent (if any) and clear the global reference.
    The next call to get_agent() will create a fresh instance.
    """
    global _global_agent

    with _agent_lock:
        if _global_agent is not None:
            try:
                _global_agent.close()
            except Exception:
                pass  # Ignore cleanup errors
            _global_agent = None


def has_agent() -> bool:
    """Check if a global agent instance exists.

    Returns:
        bool: True if an agent instance exists, False otherwise
    """
    return _global_agent is not None


def get_agent_info() -> Dict[str, Any]:
    """Get information about the current global agent.

    Returns:
        Dict[str, Any]: Information about the agent, or empty dict if no agent exists
    """
    if _global_agent is None:
        return {}

    try:
        return {
            "exists": True,
            "ai_provider": getattr(_global_agent.ai_service.llm, "_llm_type", "unknown")
            if _global_agent.ai_service
            else "none",
            "kernel_available": _global_agent.kernel.is_available,
            "chat_history_length": len(_global_agent.chat_history),
            "namespace_size": _global_agent.kernel_state.get("namespace_size", 0),
            "log_path": str(_global_agent.get_conversation_log_path())
            if hasattr(_global_agent, "get_conversation_log_path")
            else None,
        }
    except Exception:
        return {"exists": True, "error": "Unable to get agent info"}


# Convenience function for quick agent access
agent = get_agent  # Alias for even shorter access: from assistant_ui_anywidget import agent; my_agent = agent()


def display_agent() -> AgentWidget:
    """Get and immediately display the global agent.

    This is a convenience function that gets the agent and returns it
    for immediate display in a notebook cell.

    Returns:
        AgentWidget: The agent instance (displayed when returned)

    Example:
        ```python
        from assistant_ui_anywidget import display_agent

        # This will get the agent and display it immediately
        display_agent()
        ```
    """
    return get_agent()

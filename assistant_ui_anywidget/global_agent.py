"""Global agent instance management for notebook convenience."""

from typing import Any, Dict, Optional

from .agent_widget import AgentWidget
from .kernel_interface import AIConfig

# Global agent instance
_AGENT: Optional[AgentWidget] = None


def get_agent(
    ai_config: Optional[Dict[str, Any] | AIConfig] = None,
    reset: bool = False,
    **kwargs: Any,
) -> AgentWidget:
    """Get or create the global agent instance.

    Args:
        ai_config: Optional AI configuration (dict or AIConfig)
        reset: If True, creates a new agent instance
        **kwargs: Additional arguments passed to AgentWidget

    Returns:
        AgentWidget: The global agent instance
    """
    global _AGENT

    if _AGENT is None or reset:
        # Convert dict to AIConfig if needed
        if isinstance(ai_config, dict):
            config = AIConfig(
                model=ai_config.get("model"),
                provider=ai_config.get("provider", "auto"),
                temperature=ai_config.get("temperature", 0.7),
                max_tokens=ai_config.get("max_tokens", 2000),
                system_prompt=ai_config.get(
                    "system_prompt",
                    "You are a helpful AI assistant with access to the Jupyter kernel...",
                ),
                require_approval=ai_config.get("require_approval", False),
            )
        else:
            config = ai_config or AIConfig(require_approval=False, provider="auto")

        # Create new agent (show_help=True by default for notebooks)
        if "show_help" not in kwargs:
            kwargs["show_help"] = True
        _AGENT = AgentWidget(ai_config=config, **kwargs)

    return _AGENT


def reset_agent() -> None:
    """Reset the global agent instance."""
    global _AGENT
    _AGENT = None

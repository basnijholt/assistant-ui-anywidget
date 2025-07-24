"""Global agent instance management for notebook convenience."""

from typing import Optional

from .agent_widget import AgentWidget

# Global agent instance
_AGENT: Optional[AgentWidget] = None


def get_agent(
    model: Optional[str] = None,
    provider: Optional[str] = "auto",
    temperature: float = 0.7,
    max_tokens: int = 2000,
    system_prompt: str = "You are a helpful AI assistant with access to the Jupyter kernel...",
    require_approval: bool = False,
    reset: bool = False,
    show_help: bool = True,
) -> AgentWidget:
    """Get or create the global agent instance.

    Args:
        model: AI model name (auto-detected if None)
        provider: AI provider ('openai', 'anthropic', 'google_genai', or 'auto')
        temperature: Response randomness (0.0-1.0)
        max_tokens: Maximum response length
        system_prompt: System prompt for the AI
        require_approval: Whether to require approval for code execution
        reset: If True, creates a new agent instance
        show_help: Whether to show the welcome message

    Returns:
        AgentWidget: The global agent instance
    """
    global _AGENT

    if _AGENT is None or reset:
        # Create new agent with provided parameters
        _AGENT = AgentWidget(
            model=model,
            provider=provider,
            temperature=temperature,
            max_tokens=max_tokens,
            system_prompt=system_prompt,
            require_approval=require_approval,
            show_help=show_help,
        )

    return _AGENT


def reset_agent() -> None:
    """Reset the global agent instance."""
    global _AGENT
    _AGENT = None

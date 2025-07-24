"""Pytest configuration and fixtures for widget tests."""

from collections.abc import Callable

import pytest

from assistant_ui_anywidget.agent_widget import AgentWidget


@pytest.fixture  # type: ignore[misc]
def widget() -> AgentWidget:
    """Create a fresh widget instance for each test."""
    return AgentWidget(enable_ai=False, show_help=False)


@pytest.fixture  # type: ignore[misc]
def sample_messages() -> list[dict[str, str]]:
    """Sample message data for testing."""
    return [
        {"role": "user", "content": "Hello world"},
        {"role": "assistant", "content": "Hello! How can I help you?"},
        {"role": "user", "content": "What is the weather like?"},
        {
            "role": "assistant",
            "content": "I don't have access to current weather data.",
        },
    ]


@pytest.fixture  # type: ignore[misc]
def ui_message_factory() -> Callable[[str, str], dict[str, str]]:
    """Factory for creating UI message objects."""

    def _create_ui_message(
        text: str, message_type: str = "user_message"
    ) -> dict[str, str]:
        return {"type": message_type, "text": text}

    return _create_ui_message

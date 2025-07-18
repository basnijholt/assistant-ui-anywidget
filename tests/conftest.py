"""
Pytest configuration and fixtures for widget tests.
"""

import sys
import os
import pytest

# Add the python module to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "python"))

from agent_widget import AgentWidget


@pytest.fixture
def widget():
    """Create a fresh widget instance for each test."""
    return AgentWidget()


@pytest.fixture
def sample_messages():
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


@pytest.fixture
def ui_message_factory():
    """Factory for creating UI message objects."""

    def _create_ui_message(text, message_type="user_message"):
        return {"type": message_type, "text": text}

    return _create_ui_message

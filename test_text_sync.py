#!/usr/bin/env python3
"""Test script to verify chat history synchronization functionality."""

import sys

sys.path.insert(0, "python")

from agent_widget import AgentWidget


def test_chat_history_sync():
    """Test the chat history synchronization functionality."""
    print("Testing chat history synchronization...")

    # Create widget instance
    widget = AgentWidget()

    # Test initial empty chat history
    assert widget.chat_history == [], "Initial chat history should be empty"
    print("✓ Initial chat history is empty")

    # Test adding messages from Python
    widget.add_message("user", "Hello from Python!")
    widget.add_message("assistant", "Hello back from the assistant!")

    # Test getting current chat history
    history = widget.get_chat_history()
    print(f"Current chat history: {history}")

    # Test that messages are properly formatted
    assert len(history) == 2, "Should have 2 messages"
    assert history[0]["role"] == "user", "First message should be from user"
    assert (
        history[0]["content"] == "Hello from Python!"
    ), "First message content should match"
    assert history[1]["role"] == "assistant", "Second message should be from assistant"
    assert (
        history[1]["content"] == "Hello back from the assistant!"
    ), "Second message content should match"
    print("✓ Chat history format test passed!")

    # Test clearing chat history
    widget.clear_chat_history()
    assert widget.chat_history == [], "Chat history should be empty after clearing"
    print("✓ Chat history clearing test passed!")

    # Test adding multiple messages
    widget.add_message("user", "First message")
    widget.add_message("assistant", "First response")
    widget.add_message("user", "Second message")
    widget.add_message("assistant", "Second response")

    final_history = widget.get_chat_history()
    assert len(final_history) == 4, "Should have 4 messages"
    print("✓ Multiple message test passed!")

    return widget


if __name__ == "__main__":
    widget = test_chat_history_sync()
    print("\nWidget created successfully!")
    print("You can now use this widget in a Jupyter notebook:")
    print("1. Run this script in a Jupyter cell")
    print("2. Display the widget with: widget")
    print("3. Chat messages will be synchronized between Python and JavaScript")
    print("4. Access chat history from Python with: widget.get_chat_history()")
    print("5. Add messages from Python with: widget.add_message('user', 'Hello')")
    print("6. Clear chat history with: widget.clear_chat_history()")
    print(f"\nCurrent chat history: {widget.get_chat_history()}")

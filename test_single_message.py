#!/usr/bin/env python3
"""Test that sending a single message only adds one message to chat history."""

import sys

sys.path.insert(0, "python")

from agent_widget import AgentWidget


def test_single_message():
    """Test that only one message is added when user sends a message."""
    print("Testing single message behavior...")

    # Create widget
    widget = AgentWidget()

    # Verify empty start
    assert len(widget.chat_history) == 0, "Should start empty"
    print("✓ Started with empty chat history")

    # Simulate user sending "hi"
    widget._handle_message(None, {"type": "user_message", "text": "hi"})

    # Check result
    print(f"Chat history after sending 'hi': {widget.chat_history}")
    print(f"Number of messages: {len(widget.chat_history)}")

    # Should be exactly 1 message
    assert (
        len(widget.chat_history) == 1
    ), f"Expected 1 message, got {len(widget.chat_history)}"
    assert widget.chat_history[0]["role"] == "user", "Message should be from user"
    assert widget.chat_history[0]["content"] == "hi", "Message should contain 'hi'"

    print("✓ SUCCESS: Only one user message was added!")

    return widget


if __name__ == "__main__":
    widget = test_single_message()
    print("\nNow when you type 'hi' in the UI, you should see exactly 1 message:")
    print("- User: hi")
    print("\nNo automatic assistant response will be generated.")

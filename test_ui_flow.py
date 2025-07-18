#!/usr/bin/env python3
"""Test script to verify UI and Python chat synchronization."""

import sys

sys.path.insert(0, "python")

from agent_widget import AgentWidget


def test_ui_flow():
    """Test the complete UI flow with chat history synchronization."""
    print("Testing UI flow with chat history synchronization...")

    # Create widget instance
    widget = AgentWidget()

    # Test 1: Set initial chat history from Python
    print("\n1. Setting initial chat history from Python...")
    widget.chat_history = [
        {"role": "user", "content": "Hello, how are you?"},
        {
            "role": "assistant",
            "content": "I'm doing well, thank you! How can I assist you today?",
        },
    ]

    print(f"Initial history: {widget.chat_history}")
    assert len(widget.chat_history) == 2, "Should have 2 initial messages"

    # Test 2: Add messages programmatically
    print("\n2. Adding messages programmatically...")
    widget.add_message("user", "What's the weather like?")
    widget.add_message("assistant", "I don't have access to current weather data.")

    print(f"After adding messages: {widget.chat_history}")
    assert len(widget.chat_history) == 4, "Should have 4 messages after adding"

    # Test 3: Simulate UI message handling
    print("\n3. Simulating UI message handling...")

    # Simulate what happens when a user types in the UI
    test_message = {"type": "user_message", "text": "This is a test message from UI"}

    # This simulates what happens when the UI sends a message
    widget._handle_message(None, test_message)

    print(f"After UI message: {widget.chat_history}")
    assert len(widget.chat_history) == 6, "Should have 6 messages after UI interaction"

    # Verify the last two messages are the user message and echo response
    last_user_msg = widget.chat_history[-2]
    last_assistant_msg = widget.chat_history[-1]

    assert last_user_msg["role"] == "user", "Second to last message should be user"
    assert (
        last_user_msg["content"] == "This is a test message from UI"
    ), "User message content should match"
    assert last_assistant_msg["role"] == "assistant", "Last message should be assistant"
    assert (
        "You said: This is a test message from UI" in last_assistant_msg["content"]
    ), "Assistant should echo the message"

    print("✓ All UI flow tests passed!")

    return widget


if __name__ == "__main__":
    widget = test_ui_flow()
    print("\nTest completed successfully!")
    print("Now test the widget in Jupyter:")
    print("1. Create widget: widget = AgentWidget()")
    print("2. Display it: widget")
    print("3. Type messages in the UI")
    print("4. Check synchronization: widget.chat_history")
    print(f"\nFinal chat history: {widget.chat_history}")

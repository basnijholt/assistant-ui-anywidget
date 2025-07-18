#!/usr/bin/env python3
"""Test script to verify chat history clearing behavior."""

import sys

sys.path.insert(0, "python")

from agent_widget import AgentWidget


def test_clearing_behavior():
    """Test the chat history clearing behavior."""
    print("Testing chat history clearing behavior...")

    # Create widget instance
    widget = AgentWidget()

    # Test 1: Start with empty history
    print("\n1. Initial state:")
    print(f"   chat_history: {widget.chat_history}")
    assert widget.chat_history == [], "Should start with empty history"

    # Test 2: Add messages from Python
    print("\n2. Adding messages from Python:")
    widget.chat_history = [
        {"role": "user", "content": "Hello"},
        {"role": "assistant", "content": "Hi there!"},
    ]
    print(f"   chat_history: {widget.chat_history}")
    assert len(widget.chat_history) == 2, "Should have 2 messages"

    # Test 3: Clear by setting to empty list
    print("\n3. Clearing by setting to empty list:")
    widget.chat_history = []
    print(f"   chat_history: {widget.chat_history}")
    assert widget.chat_history == [], "Should be empty after clearing"

    # Test 4: Add messages again
    print("\n4. Adding messages again:")
    widget.add_message("user", "Second conversation")
    widget.add_message("assistant", "Second response")
    print(f"   chat_history: {widget.chat_history}")
    assert len(widget.chat_history) == 2, "Should have 2 new messages"

    # Test 5: Clear using the method
    print("\n5. Clearing using clear_chat_history method:")
    widget.clear_chat_history()
    print(f"   chat_history: {widget.chat_history}")
    assert widget.chat_history == [], "Should be empty after method call"

    # Test 6: Simulate UI interaction
    print("\n6. Simulating UI interaction:")
    test_message = {"type": "user_message", "text": "Test UI message"}
    widget._handle_message(None, test_message)
    print(f"   chat_history: {widget.chat_history}")
    assert len(widget.chat_history) == 2, "Should have user message and response"

    # Test 7: Clear again and verify
    print("\n7. Final clearing test:")
    widget.chat_history = []
    print(f"   chat_history: {widget.chat_history}")
    assert widget.chat_history == [], "Should be empty after final clearing"

    print("\n✓ All clearing tests passed!")

    return widget


if __name__ == "__main__":
    widget = test_clearing_behavior()
    print("\nTest completed successfully!")
    print("The chat history clearing should work properly now.")
    print("Try this in Jupyter:")
    print("1. widget = AgentWidget()")
    print("2. widget.chat_history = [{'role': 'user', 'content': 'Hello'}]")
    print("3. Display widget")
    print("4. widget.chat_history = []  # This should clear the UI")
    print("5. Verify UI is empty")

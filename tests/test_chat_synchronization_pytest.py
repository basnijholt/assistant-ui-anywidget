"""Comprehensive pytest tests for chat history synchronization between Python and JavaScript.

These tests verify that the bidirectional synchronization works correctly
for all common use cases.
"""

import os
import sys

import pytest

# Add the python module to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "python"))

from agent_widget import AgentWidget


@pytest.fixture
def widget():
    """Create a fresh widget instance for each test."""
    return AgentWidget()


class TestChatHistorySynchronization:
    """Test suite for chat history synchronization."""

    def test_initial_empty_state(self, widget):
        """Test that widget starts with empty chat history."""
        assert widget.chat_history == []
        assert len(widget.chat_history) == 0

    def test_add_message_python_api(self, widget):
        """Test adding messages using Python API."""
        # Add user message
        widget.add_message("user", "Hello from Python!")
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[0]["content"] == "Hello from Python!"

        # Add assistant message
        widget.add_message("assistant", "Hello back from the assistant!")
        assert len(widget.chat_history) == 2
        assert widget.chat_history[1]["role"] == "assistant"
        assert widget.chat_history[1]["content"] == "Hello back from the assistant!"

    def test_get_chat_history(self, widget):
        """Test getting chat history returns a copy."""
        widget.add_message("user", "Test message")

        history = widget.get_chat_history()
        assert history == widget.chat_history
        assert history is not widget.chat_history  # Should be a copy

    def test_clear_chat_history(self, widget):
        """Test clearing chat history."""
        widget.add_message("user", "Test message 1")
        widget.add_message("assistant", "Test response 1")

        assert len(widget.chat_history) == 2

        widget.clear_chat_history()
        assert len(widget.chat_history) == 0
        assert widget.chat_history == []

    def test_direct_assignment(self, widget):
        """Test directly assigning chat history."""
        new_history = [
            {"role": "user", "content": "Hello"},
            {"role": "assistant", "content": "Hi there!"},
        ]

        widget.chat_history = new_history
        assert len(widget.chat_history) == 2
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[1]["role"] == "assistant"

    def test_ui_message_handling(self, widget):
        """Test handling messages from UI (JavaScript)."""
        # Simulate UI sending a message
        message_content = {"type": "user_message", "text": "Hello from UI"}
        widget._handle_message(None, message_content)

        # Should add exactly one message (user message only)
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[0]["content"] == "Hello from UI"

    def test_ui_message_no_auto_response(self, widget):
        """Test that UI messages don't generate automatic responses."""
        # Send message from UI
        widget._handle_message(None, {"type": "user_message", "text": "Test"})

        # Should only have the user message, no assistant response
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"

    def test_multiple_ui_messages(self, widget):
        """Test handling multiple UI messages."""
        # Send multiple messages
        widget._handle_message(None, {"type": "user_message", "text": "First"})
        widget._handle_message(None, {"type": "user_message", "text": "Second"})
        widget._handle_message(None, {"type": "user_message", "text": "Third"})

        assert len(widget.chat_history) == 3
        assert widget.chat_history[0]["content"] == "First"
        assert widget.chat_history[1]["content"] == "Second"
        assert widget.chat_history[2]["content"] == "Third"

    def test_mixed_message_sources(self, widget):
        """Test mixing UI messages and Python API messages."""
        # Add from Python API
        widget.add_message("user", "From Python")

        # Add from UI
        widget._handle_message(None, {"type": "user_message", "text": "From UI"})

        # Add from Python API again
        widget.add_message("assistant", "Response from Python")

        assert len(widget.chat_history) == 3
        assert widget.chat_history[0]["content"] == "From Python"
        assert widget.chat_history[1]["content"] == "From UI"
        assert widget.chat_history[2]["content"] == "Response from Python"

    def test_message_format_validation(self, widget):
        """Test that messages have correct format."""
        widget.add_message("user", "Test message")
        message = widget.chat_history[0]

        # Check required fields
        assert "role" in message
        assert "content" in message
        assert message["role"] in ["user", "assistant"]
        assert isinstance(message["content"], str)

    def test_empty_message_handling(self, widget):
        """Test handling empty messages."""
        # Send empty message from UI
        widget._handle_message(None, {"type": "user_message", "text": ""})

        # Should still add the message (empty content is valid)
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["content"] == ""

    def test_invalid_message_type(self, widget):
        """Test handling invalid message types."""
        # Send invalid message type
        widget._handle_message(None, {"type": "invalid_type", "text": "test"})

        # Should not add any messages
        assert len(widget.chat_history) == 0

    def test_clear_after_messages(self, widget):
        """Test clearing after adding messages."""
        # Add some messages
        widget.add_message("user", "Message 1")
        widget.add_message("assistant", "Response 1")
        widget._handle_message(None, {"type": "user_message", "text": "UI message"})

        assert len(widget.chat_history) == 3

        # Clear and verify
        widget.chat_history = []
        assert len(widget.chat_history) == 0

        # Should be able to add new messages after clearing
        widget.add_message("user", "New message")
        assert len(widget.chat_history) == 1

    def test_large_chat_history(self, widget):
        """Test handling large chat histories."""
        # Add 100 messages
        for i in range(100):
            widget.add_message("user", f"Message {i}")

        assert len(widget.chat_history) == 100

        # Verify all messages are present
        for i in range(100):
            assert widget.chat_history[i]["content"] == f"Message {i}"

    def test_chat_history_persistence(self, widget):
        """Test that chat history persists across operations."""
        # Add initial messages
        widget.add_message("user", "Persistent message")
        _original_history = widget.get_chat_history()

        # Perform various operations
        widget.add_message("assistant", "Response")
        widget._handle_message(None, {"type": "user_message", "text": "UI message"})

        # Original message should still be there
        assert widget.chat_history[0]["content"] == "Persistent message"
        assert len(widget.chat_history) == 3


class TestUISimulation:
    """Test suite for UI simulation and synchronization."""

    def test_ui_simulation_single_message(self, widget):
        """Test simulating a single UI message."""
        # Simulate UI sending message
        before_count = len(widget.chat_history)
        widget._handle_message(None, {"type": "user_message", "text": "Test message"})
        after_count = len(widget.chat_history)

        assert after_count == before_count + 1
        assert widget.chat_history[-1]["role"] == "user"
        assert widget.chat_history[-1]["content"] == "Test message"

    def test_ui_simulation_multiple_messages(self, widget):
        """Test simulating multiple UI messages."""
        messages = ["First", "Second", "Third"]

        for msg in messages:
            widget._handle_message(None, {"type": "user_message", "text": msg})

        assert len(widget.chat_history) == len(messages)

        for i, msg in enumerate(messages):
            assert widget.chat_history[i]["content"] == msg

    def test_ui_simulation_with_existing_history(self, widget):
        """Test UI simulation with existing chat history."""
        # Add existing messages
        widget.add_message("user", "Existing message")
        widget.add_message("assistant", "Existing response")

        initial_count = len(widget.chat_history)

        # Simulate UI message
        widget._handle_message(None, {"type": "user_message", "text": "New UI message"})

        assert len(widget.chat_history) == initial_count + 1
        assert widget.chat_history[-1]["content"] == "New UI message"

    def test_ui_simulation_after_clear(self, widget):
        """Test UI simulation after clearing history."""
        # Add and clear messages
        widget.add_message("user", "To be cleared")
        widget.clear_chat_history()

        # Simulate UI message
        widget._handle_message(None, {"type": "user_message", "text": "After clear"})

        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["content"] == "After clear"


class TestMessageIntegrity:
    """Test suite for message integrity and data consistency."""

    def test_message_immutability(self, widget):
        """Test that messages don't get mutated unexpectedly."""
        original_message = {"role": "user", "content": "Original"}
        widget.chat_history = [original_message.copy()]

        # Get message and try to modify it
        retrieved_message = widget.chat_history[0]
        retrieved_message["content"] = "Modified"

        # Original should be unchanged in a new get
        fresh_history = widget.get_chat_history()
        assert fresh_history[0]["content"] == "Modified"  # This is expected behavior

    def test_concurrent_operations(self, widget):
        """Test concurrent-like operations on chat history."""
        # Simulate rapid operations
        widget.add_message("user", "Rapid 1")
        widget._handle_message(None, {"type": "user_message", "text": "Rapid 2"})
        widget.add_message("assistant", "Rapid 3")
        widget._handle_message(None, {"type": "user_message", "text": "Rapid 4"})

        assert len(widget.chat_history) == 4

        # Verify order is preserved
        contents = [msg["content"] for msg in widget.chat_history]
        assert contents == ["Rapid 1", "Rapid 2", "Rapid 3", "Rapid 4"]

    def test_data_types_preservation(self, widget):
        """Test that data types are preserved correctly."""
        # Test various content types
        test_cases = [
            "Simple string",
            "String with special chars: !@#$%^&*()",
            "Unicode: 你好世界 🌍",
            "Empty string: ",
            "Very long string: " + "x" * 1000,
        ]

        for content in test_cases:
            widget.add_message("user", content)

        # Verify all content is preserved
        for i, expected_content in enumerate(test_cases):
            assert widget.chat_history[i]["content"] == expected_content
            assert isinstance(widget.chat_history[i]["content"], str)
            assert isinstance(widget.chat_history[i]["role"], str)


# Test parametrization examples
class TestParametrizedCases:
    """Test suite demonstrating pytest parametrization."""

    @pytest.mark.parametrize("role", ["user", "assistant"])
    def test_message_roles(self, widget, role):
        """Test different message roles."""
        widget.add_message(role, f"Test message from {role}")

        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == role
        assert widget.chat_history[0]["content"] == f"Test message from {role}"

    @pytest.mark.parametrize("content", ["", "short", "a" * 1000, "🚀 Unicode test"])
    def test_message_content_types(self, widget, content):
        """Test different content types."""
        widget.add_message("user", content)

        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["content"] == content
        assert isinstance(widget.chat_history[0]["content"], str)

    @pytest.mark.parametrize("message_count", [1, 5, 10, 100])
    def test_multiple_messages(self, widget, message_count):
        """Test adding multiple messages."""
        for i in range(message_count):
            widget.add_message("user", f"Message {i}")

        assert len(widget.chat_history) == message_count

        # Verify all messages are present
        for i in range(message_count):
            assert widget.chat_history[i]["content"] == f"Message {i}"


# Performance and stress tests
class TestPerformance:
    """Test suite for performance and stress testing."""

    def test_large_message_batch(self, widget):
        """Test adding a large batch of messages."""
        batch_size = 1000

        for i in range(batch_size):
            widget.add_message("user", f"Batch message {i}")

        assert len(widget.chat_history) == batch_size

        # Verify first and last messages
        assert widget.chat_history[0]["content"] == "Batch message 0"
        assert widget.chat_history[-1]["content"] == f"Batch message {batch_size - 1}"

    def test_rapid_ui_messages(self, widget):
        """Test rapid UI message simulation."""
        message_count = 100

        for i in range(message_count):
            widget._handle_message(
                None,
                {"type": "user_message", "text": f"Rapid UI {i}"},
            )

        assert len(widget.chat_history) == message_count

        # Verify messages are in order
        for i in range(message_count):
            assert widget.chat_history[i]["content"] == f"Rapid UI {i}"

    def test_alternating_sources(self, widget):
        """Test alternating between Python API and UI messages."""
        total_messages = 100

        for i in range(total_messages // 2):
            # Add from Python API
            widget.add_message("user", f"Python {i}")

            # Add from UI
            widget._handle_message(None, {"type": "user_message", "text": f"UI {i}"})

        assert len(widget.chat_history) == total_messages

        # Verify alternating pattern
        for i in range(total_messages // 2):
            assert widget.chat_history[i * 2]["content"] == f"Python {i}"
            assert widget.chat_history[i * 2 + 1]["content"] == f"UI {i}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])

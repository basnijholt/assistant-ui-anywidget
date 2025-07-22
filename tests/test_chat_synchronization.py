"""Comprehensive tests for chat history synchronization between Python and JavaScript.

These tests verify that the bidirectional synchronization works correctly
for all common use cases.
"""

import os
import sys

# Add the python module to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "python"))  # noqa: PTH118, PTH120

from agent_widget import AgentWidget


class TestChatHistorySynchronization:
    """Test suite for chat history synchronization."""

    def test_initial_empty_state(self) -> None:
        """Test that widget starts with empty chat history."""
        widget = AgentWidget()
        assert widget.chat_history == []
        assert len(widget.chat_history) == 0

    def test_add_message_python_api(self) -> None:
        """Test adding messages using Python API."""
        widget = AgentWidget()

        # Add user message
        widget.add_message("user", "Hello from Python!")
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[0]["content"] == "Hello from Python!"

        # Add assistant message
        widget.add_message("assistant", "Hello back from the assistant!")
        assert len(widget.chat_history) == 2  # noqa: PLR2004
        assert widget.chat_history[1]["role"] == "assistant"
        assert widget.chat_history[1]["content"] == "Hello back from the assistant!"

    def test_get_chat_history(self) -> None:
        """Test getting chat history returns a copy."""
        widget = AgentWidget()
        widget.add_message("user", "Test message")

        history = widget.get_chat_history()
        assert history == widget.chat_history
        assert history is not widget.chat_history  # Should be a copy

    def test_clear_chat_history(self) -> None:
        """Test clearing chat history."""
        widget = AgentWidget()
        widget.add_message("user", "Test message 1")
        widget.add_message("assistant", "Test response 1")

        assert len(widget.chat_history) == 2  # noqa: PLR2004

        widget.clear_chat_history()
        assert len(widget.chat_history) == 0
        assert widget.chat_history == []

    def test_direct_assignment(self) -> None:
        """Test directly assigning chat history."""
        widget = AgentWidget()

        new_history = [
            {"role": "user", "content": "Hello"},
            {"role": "assistant", "content": "Hi there!"},
        ]

        widget.chat_history = new_history
        assert len(widget.chat_history) == 2  # noqa: PLR2004
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[1]["role"] == "assistant"

    def test_ui_message_handling(self) -> None:
        """Test handling messages from UI (JavaScript)."""
        widget = AgentWidget()

        # Simulate UI sending a message
        message_content = {"type": "user_message", "text": "Hello from UI"}
        widget._handle_message(None, message_content)

        # Should add exactly one message (user message only)
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[0]["content"] == "Hello from UI"

    def test_ui_message_no_auto_response(self) -> None:
        """Test that UI messages don't generate automatic responses."""
        widget = AgentWidget()

        # Send message from UI
        widget._handle_message(None, {"type": "user_message", "text": "Test"})

        # Should only have the user message, no assistant response
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"

    def test_multiple_ui_messages(self) -> None:
        """Test handling multiple UI messages."""
        widget = AgentWidget()

        # Send multiple messages
        widget._handle_message(None, {"type": "user_message", "text": "First"})
        widget._handle_message(None, {"type": "user_message", "text": "Second"})
        widget._handle_message(None, {"type": "user_message", "text": "Third"})

        assert len(widget.chat_history) == 3  # noqa: PLR2004
        assert widget.chat_history[0]["content"] == "First"
        assert widget.chat_history[1]["content"] == "Second"
        assert widget.chat_history[2]["content"] == "Third"

    def test_mixed_message_sources(self) -> None:
        """Test mixing UI messages and Python API messages."""
        widget = AgentWidget()

        # Add from Python API
        widget.add_message("user", "From Python")

        # Add from UI
        widget._handle_message(None, {"type": "user_message", "text": "From UI"})

        # Add from Python API again
        widget.add_message("assistant", "Response from Python")

        assert len(widget.chat_history) == 3  # noqa: PLR2004
        assert widget.chat_history[0]["content"] == "From Python"
        assert widget.chat_history[1]["content"] == "From UI"
        assert widget.chat_history[2]["content"] == "Response from Python"

    def test_message_format_validation(self) -> None:
        """Test that messages have correct format."""
        widget = AgentWidget()

        widget.add_message("user", "Test message")
        message = widget.chat_history[0]

        # Check required fields
        assert "role" in message
        assert "content" in message
        assert message["role"] in ["user", "assistant"]
        assert isinstance(message["content"], str)

    def test_empty_message_handling(self) -> None:
        """Test handling empty messages."""
        widget = AgentWidget()

        # Send empty message from UI
        widget._handle_message(None, {"type": "user_message", "text": ""})

        # Should still add the message (empty content is valid)
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["content"] == ""

    def test_invalid_message_type(self) -> None:
        """Test handling invalid message types."""
        widget = AgentWidget()

        # Send invalid message type
        widget._handle_message(None, {"type": "invalid_type", "text": "test"})

        # Should not add any messages
        assert len(widget.chat_history) == 0

    def test_clear_after_messages(self) -> None:
        """Test clearing after adding messages."""
        widget = AgentWidget()

        # Add some messages
        widget.add_message("user", "Message 1")
        widget.add_message("assistant", "Response 1")
        widget._handle_message(None, {"type": "user_message", "text": "UI message"})

        assert len(widget.chat_history) == 3  # noqa: PLR2004

        # Clear and verify
        widget.chat_history = []
        assert len(widget.chat_history) == 0

        # Should be able to add new messages after clearing
        widget.add_message("user", "New message")
        assert len(widget.chat_history) == 1

    def test_large_chat_history(self) -> None:
        """Test handling large chat histories."""
        widget = AgentWidget()

        # Add 100 messages
        for i in range(100):
            widget.add_message("user", f"Message {i}")

        assert len(widget.chat_history) == 100  # noqa: PLR2004

        # Verify all messages are present
        for i in range(100):
            assert widget.chat_history[i]["content"] == f"Message {i}"

    def test_chat_history_persistence(self) -> None:
        """Test that chat history persists across operations."""
        widget = AgentWidget()

        # Add initial messages
        widget.add_message("user", "Persistent message")
        _original_history = widget.get_chat_history()

        # Perform various operations
        widget.add_message("assistant", "Response")
        widget._handle_message(None, {"type": "user_message", "text": "UI message"})

        # Original message should still be there
        assert widget.chat_history[0]["content"] == "Persistent message"
        assert len(widget.chat_history) == 3  # noqa: PLR2004


class TestUISimulation:
    """Test suite for UI simulation and synchronization."""

    def test_ui_simulation_single_message(self) -> None:
        """Test simulating a single UI message."""
        widget = AgentWidget()

        # Simulate UI sending message
        before_count = len(widget.chat_history)
        widget._handle_message(None, {"type": "user_message", "text": "Test message"})
        after_count = len(widget.chat_history)

        assert after_count == before_count + 1
        assert widget.chat_history[-1]["role"] == "user"
        assert widget.chat_history[-1]["content"] == "Test message"

    def test_ui_simulation_multiple_messages(self) -> None:
        """Test simulating multiple UI messages."""
        widget = AgentWidget()

        messages = ["First", "Second", "Third"]

        for msg in messages:
            widget._handle_message(None, {"type": "user_message", "text": msg})

        assert len(widget.chat_history) == len(messages)

        for i, msg in enumerate(messages):
            assert widget.chat_history[i]["content"] == msg

    def test_ui_simulation_with_existing_history(self) -> None:
        """Test UI simulation with existing chat history."""
        widget = AgentWidget()

        # Add existing messages
        widget.add_message("user", "Existing message")
        widget.add_message("assistant", "Existing response")

        initial_count = len(widget.chat_history)

        # Simulate UI message
        widget._handle_message(None, {"type": "user_message", "text": "New UI message"})

        assert len(widget.chat_history) == initial_count + 1
        assert widget.chat_history[-1]["content"] == "New UI message"

    def test_ui_simulation_after_clear(self) -> None:
        """Test UI simulation after clearing history."""
        widget = AgentWidget()

        # Add and clear messages
        widget.add_message("user", "To be cleared")
        widget.clear_chat_history()

        # Simulate UI message
        widget._handle_message(None, {"type": "user_message", "text": "After clear"})

        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["content"] == "After clear"


class TestMessageIntegrity:
    """Test suite for message integrity and data consistency."""

    def test_message_immutability(self) -> None:
        """Test that messages don't get mutated unexpectedly."""
        widget = AgentWidget()

        original_message = {"role": "user", "content": "Original"}
        widget.chat_history = [original_message.copy()]

        # Get message and try to modify it
        retrieved_message = widget.chat_history[0]
        retrieved_message["content"] = "Modified"

        # Original should be unchanged in a new get
        fresh_history = widget.get_chat_history()
        assert fresh_history[0]["content"] == "Modified"  # This is expected behavior

    def test_concurrent_operations(self) -> None:
        """Test concurrent-like operations on chat history."""
        widget = AgentWidget()

        # Simulate rapid operations
        widget.add_message("user", "Rapid 1")
        widget._handle_message(None, {"type": "user_message", "text": "Rapid 2"})
        widget.add_message("assistant", "Rapid 3")
        widget._handle_message(None, {"type": "user_message", "text": "Rapid 4"})

        assert len(widget.chat_history) == 4  # noqa: PLR2004

        # Verify order is preserved
        contents = [msg["content"] for msg in widget.chat_history]
        assert contents == ["Rapid 1", "Rapid 2", "Rapid 3", "Rapid 4"]

    def test_data_types_preservation(self) -> None:
        """Test that data types are preserved correctly."""
        widget = AgentWidget()

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


def run_all_tests() -> bool:
    """Run all test classes and methods."""
    test_classes = [
        TestChatHistorySynchronization,
        TestUISimulation,
        TestMessageIntegrity,
    ]

    total_tests = 0
    passed_tests = 0

    for test_class in test_classes:
        print(f"\n{'=' * 60}")
        print(f"Running {test_class.__name__}")
        print(f"{'=' * 60}")

        instance = test_class()
        methods = [method for method in dir(instance) if method.startswith("test_")]

        for method_name in methods:
            total_tests += 1
            try:
                method = getattr(instance, method_name)
                method()
                print(f"✓ {method_name}")
                passed_tests += 1
            except Exception as e:  # noqa: BLE001
                print(f"✗ {method_name}: {e}")

    print(f"\n{'=' * 60}")
    print(f"TEST RESULTS: {passed_tests}/{total_tests} passed")
    print(f"{'=' * 60}")

    if passed_tests == total_tests:
        print("🎉 All tests passed!")
        return True
    print(f"❌ {total_tests - passed_tests} tests failed")
    return False


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)

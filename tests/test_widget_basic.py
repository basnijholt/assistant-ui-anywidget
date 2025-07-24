"""Basic pytest tests for AgentWidget functionality."""

import pathlib
from collections.abc import Callable

import pytest
from assistant_ui_anywidget.agent_widget import AgentWidget

# Type alias for the UI message factory
UIMessageFactory = Callable[[str], dict[str, str]]


class TestWidgetBasics:
    """Basic widget functionality tests."""

    def test_widget_creation(self, widget: AgentWidget) -> None:
        """Test that widget can be created successfully."""
        assert widget is not None
        assert hasattr(widget, "chat_history")
        assert hasattr(widget, "_esm")

    def test_initial_state(self, widget: AgentWidget) -> None:
        """Test widget initial state."""
        assert widget.chat_history == []
        assert len(widget.chat_history) == 0

    def test_esm_content_loaded(self, widget: AgentWidget) -> None:
        """Test that the ESM bundle content is loaded."""
        # AnyWidget loads the file content, not the path
        assert isinstance(widget._esm, str), "ESM should be a string"
        assert len(widget._esm) > 0, "ESM content should not be empty"
        # Check for React content (indicating the bundle is loaded)
        assert "react" in widget._esm.lower(), "ESM should contain React code"

    def test_esm_bundle_file_exists(self) -> None:
        """Test that the original ESM bundle file exists."""
        # The original path before AnyWidget loads it
        expected_path = (
            pathlib.Path(__file__).parent.parent / "frontend" / "dist" / "index.js"
        )
        assert expected_path.exists(), f"ESM bundle file not found at {expected_path}"
        assert expected_path.is_file(), (
            f"ESM bundle path is not a file: {expected_path}"
        )


class TestMessageAPI:
    """Test the message API methods."""

    def test_add_message_user(self, widget: AgentWidget) -> None:
        """Test adding a user message."""
        widget.add_message("user", "Hello")

        assert len(widget.chat_history) == 1
        message = widget.chat_history[0]
        assert message["role"] == "user"
        assert message["content"] == "Hello"

    def test_add_message_assistant(self, widget: AgentWidget) -> None:
        """Test adding an assistant message."""
        widget.add_message("assistant", "Hello back!")

        assert len(widget.chat_history) == 1
        message = widget.chat_history[0]
        assert message["role"] == "assistant"
        assert message["content"] == "Hello back!"

    def test_add_multiple_messages(self, widget: AgentWidget) -> None:
        """Test adding multiple messages."""
        widget.add_message("user", "First message")
        widget.add_message("assistant", "First response")
        widget.add_message("user", "Second message")

        expected_message_count = 3
        assert len(widget.chat_history) == expected_message_count
        assert widget.chat_history[0]["content"] == "First message"
        assert widget.chat_history[1]["content"] == "First response"
        assert widget.chat_history[2]["content"] == "Second message"

    def test_get_chat_history(self, widget: AgentWidget) -> None:
        """Test getting chat history."""
        widget.add_message("user", "Test message")

        history = widget.get_chat_history()
        assert isinstance(history, list)
        assert len(history) == 1
        assert history[0]["content"] == "Test message"
        # Should be a copy, not the same object
        assert history is not widget.chat_history

    def test_clear_chat_history(self, widget: AgentWidget) -> None:
        """Test clearing chat history."""
        widget.add_message("user", "Message 1")
        widget.add_message("assistant", "Response 1")

        expected_message_count = 2
        assert len(widget.chat_history) == expected_message_count

        widget.clear_chat_history()

        assert len(widget.chat_history) == 0
        assert widget.chat_history == []


class TestUIMessageHandling:
    """Test UI message handling."""

    def test_handle_user_message(
        self,
        widget: AgentWidget,
        ui_message_factory: UIMessageFactory,
    ) -> None:
        """Test handling a user message from UI."""
        ui_message = ui_message_factory("Hello from UI")
        widget._handle_message(None, ui_message)

        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[0]["content"] == "Hello from UI"

    def test_handle_invalid_message_type(self, widget: AgentWidget) -> None:
        """Test handling invalid message type."""
        invalid_message = {"type": "invalid", "text": "Should be ignored"}
        widget._handle_message(None, invalid_message)

        assert len(widget.chat_history) == 0

    def test_handle_empty_message(
        self,
        widget: AgentWidget,
        ui_message_factory: UIMessageFactory,
    ) -> None:
        """Test handling empty message."""
        ui_message = ui_message_factory("")
        widget._handle_message(None, ui_message)

        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["content"] == ""

    def test_handle_message_no_auto_response(
        self,
        widget: AgentWidget,
        ui_message_factory: UIMessageFactory,
    ) -> None:
        """Test that handling UI messages doesn't create auto-responses."""
        ui_message = ui_message_factory("Test message")
        widget._handle_message(None, ui_message)

        # Should only have the user message, no assistant response
        assert len(widget.chat_history) == 1
        assert widget.chat_history[0]["role"] == "user"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])

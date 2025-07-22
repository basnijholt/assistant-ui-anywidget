"""AgentWidget module for creating interactive chat interfaces."""

import pathlib

import anywidget
import traitlets


class AgentWidget(anywidget.AnyWidget):
    """Minimal AnyWidget implementation with Assistant-UI integration."""

    # Path to the compiled JavaScript bundle
    _esm = str(pathlib.Path(__file__).parent.parent / "frontend" / "dist" / "index.js")

    # Widget state synchronized between Python and JavaScript
    message = traitlets.Unicode("").tag(sync=True)
    chat_history = traitlets.List([]).tag(sync=True)
    action_buttons = traitlets.List([]).tag(sync=True)  # List of button labels to display

    def __init__(self, **kwargs) -> None:  # noqa: ANN003, D107
        super().__init__(**kwargs)
        self.on_msg(self._handle_message)

    def _handle_message(self, _, content, buffers=None) -> None:  # noqa: ANN001, ARG002
        """Handle incoming messages from the frontend."""
        if content.get("type") == "user_message":
            user_text = content.get("text", "")

            # Only add the user message to chat history - no automatic assistant response
            new_history = list(self.chat_history)
            new_history.append({"role": "user", "content": user_text})

            # Update the synchronized chat history
            self.chat_history = new_history

    def add_message(self, role: str, content: str) -> None:
        """Add a message to the chat history from Python."""
        new_history = list(self.chat_history)
        new_history.append({"role": role, "content": content})
        self.chat_history = new_history

    def get_chat_history(self) -> list[dict[str, str]]:
        """Get the current chat history."""
        return list(self.chat_history)

    def clear_chat_history(self) -> None:
        """Clear the chat history."""
        self.chat_history = []

    def set_action_buttons(self, buttons: list[str | dict[str, str]]) -> None:
        """Set action buttons to display. Each button will send its text when clicked.

        Args:
            buttons: List of button configurations. Each can be:
                - A string (button text)
                - A dict with keys: 'text', 'color' (optional), 'icon' (optional)
                  Example: {'text': 'Approve', 'color': '#28a745', 'icon': '✓'}

        """
        # Normalize buttons to always be dicts
        normalized_buttons = []
        for button in buttons:
            if isinstance(button, str):
                normalized_buttons.append({"text": button})
            else:
                normalized_buttons.append(button)
        self.action_buttons = normalized_buttons

    def clear_action_buttons(self) -> None:
        """Clear all action buttons."""
        self.action_buttons = []

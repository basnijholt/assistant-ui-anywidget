import anywidget
import traitlets
import pathlib


class AgentWidget(anywidget.AnyWidget):
    """Minimal AnyWidget implementation with Assistant-UI integration."""

    # Path to the compiled JavaScript bundle
    _esm = str(pathlib.Path(__file__).parent.parent / "frontend" / "dist" / "index.js")

    # Widget state synchronized between Python and JavaScript
    message = traitlets.Unicode("").tag(sync=True)
    chat_history = traitlets.List([]).tag(sync=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.on_msg(self._handle_message)

    def _handle_message(self, _, content, buffers=None):
        """Handle incoming messages from the frontend."""
        if content.get("type") == "user_message":
            user_text = content.get("text", "")

            # Only add the user message to chat history - no automatic assistant response
            new_history = list(self.chat_history)
            new_history.append({"role": "user", "content": user_text})

            # Update the synchronized chat history
            self.chat_history = new_history

    def add_message(self, role: str, content: str):
        """Add a message to the chat history from Python."""
        new_history = list(self.chat_history)
        new_history.append({"role": role, "content": content})
        self.chat_history = new_history

    def get_chat_history(self):
        """Get the current chat history."""
        return list(self.chat_history)

    def clear_chat_history(self):
        """Clear the chat history."""
        self.chat_history = []

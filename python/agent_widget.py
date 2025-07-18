import anywidget
import traitlets
import pathlib


class AgentWidget(anywidget.AnyWidget):
    """Minimal AnyWidget implementation with Assistant-UI integration."""
    
    # Path to the compiled JavaScript bundle
    _esm = str(pathlib.Path(__file__).parent.parent / "frontend" / "dist" / "index.js")
    
    # Widget state synchronized between Python and JavaScript
    message = traitlets.Unicode("").tag(sync=True)
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.on_msg(self._handle_message)
    
    def _handle_message(self, _, content, buffers=None):
        """Handle incoming messages from the frontend."""
        if content.get("type") == "user_message":
            user_text = content.get("text", "")
            # Echo the message back for now
            response = f"You said: {user_text}"
            self.send({"type": "assistant_message", "text": response})
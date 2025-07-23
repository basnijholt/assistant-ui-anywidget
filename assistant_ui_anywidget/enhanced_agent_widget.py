"""Enhanced AgentWidget with kernel access capabilities."""

import pathlib
from typing import Any, Dict, List, Optional

import anywidget
import traitlets

from .kernel_interface import KernelInterface
from .message_handlers import MessageHandlers


class EnhancedAgentWidget(anywidget.AnyWidget):
    """AI-powered assistant widget with kernel access."""
    
    # Path to the compiled JavaScript bundle
    _esm = str(pathlib.Path(__file__).parent.parent / "frontend" / "dist" / "index.js")
    
    # Existing traits
    message = traitlets.Unicode("").tag(sync=True)
    chat_history = traitlets.List([]).tag(sync=True)
    action_buttons = traitlets.List([]).tag(sync=True)
    
    # New traits for kernel interaction
    kernel_state = traitlets.Dict({}).tag(sync=True)
    code_result = traitlets.Dict({}).tag(sync=True)
    variables_info = traitlets.List([]).tag(sync=True)
    debug_info = traitlets.Dict({}).tag(sync=True)
    
    # AI assistant configuration
    ai_config = traitlets.Dict({
        'model': 'gpt-4',
        'temperature': 0.7,
        'max_tokens': 2000,
        'system_prompt': 'You are a helpful AI assistant with access to the Jupyter kernel...'
    }).tag(sync=True)
    
    def __init__(self, **kwargs: Any) -> None:
        """Initialize the enhanced widget."""
        super().__init__(**kwargs)
        
        # Initialize kernel interface and message handlers
        self.kernel = KernelInterface()
        self.handlers = MessageHandlers(self.kernel)
        
        # Set up message handling
        self.on_msg(self._handle_message)
        
        # Initialize kernel state
        self._update_kernel_state()
        self._update_variables_info()
    
    def _handle_message(self, widget: Any, content: Dict[str, Any], 
                       buffers: Any = None) -> None:
        """Handle incoming messages from the frontend."""
        msg_type = content.get("type")
        
        if msg_type == "user_message":
            # Handle regular chat messages
            user_text = content.get("text", "")
            self._handle_user_message(user_text)
            
        elif msg_type == "api_request":
            # Handle API requests (kernel interactions)
            request = content.get("request", {})
            response = self.handlers.handle_message(request)
            
            # Send response back to frontend
            self.send({"type": "api_response", "response": response})
            
            # Update state if needed
            if request.get("type") == "execute_code":
                self._update_kernel_state()
                self._update_variables_info()
                
        elif msg_type == "action_button":
            # Handle action button clicks
            action = content.get("action", "")
            self._handle_action_button(action)
    
    def _handle_user_message(self, user_text: str) -> None:
        """Handle user chat messages."""
        # Add user message to history
        new_history = list(self.chat_history)
        new_history.append({"role": "user", "content": user_text})
        
        # Check if this is a command or regular message
        if user_text.startswith("/"):
            # Handle commands
            response = self._handle_command(user_text)
            new_history.append({"role": "assistant", "content": response})
        else:
            # For now, echo back with kernel info
            # In a real implementation, this would call an AI service
            kernel_info = self.kernel.get_kernel_info()
            response = f"I'm your AI assistant with kernel access. The kernel is {'available' if kernel_info['available'] else 'not available'}."
            
            # Add some helpful context
            if kernel_info['available']:
                namespace_size = kernel_info.get('namespace_size', 0)
                response += f"\n\nI can see {namespace_size} variables in your namespace."
                response += "\n\nTry commands like:"
                response += "\n- `/vars` - Show all variables"
                response += "\n- `/inspect <var>` - Inspect a variable"
                response += "\n- `/exec <code>` - Execute code"
                response += "\n- `/help` - Show all commands"
            
            new_history.append({"role": "assistant", "content": response})
        
        self.chat_history = new_history
    
    def _handle_command(self, command: str) -> str:
        """Handle slash commands."""
        parts = command.split(maxsplit=1)
        cmd = parts[0].lower()
        args = parts[1] if len(parts) > 1 else ""
        
        if cmd == "/vars":
            return self._cmd_show_variables()
        elif cmd == "/inspect":
            return self._cmd_inspect_variable(args)
        elif cmd == "/exec":
            return self._cmd_execute_code(args)
        elif cmd == "/clear":
            return self._cmd_clear_namespace()
        elif cmd == "/help":
            return self._cmd_show_help()
        else:
            return f"Unknown command: {cmd}. Type /help for available commands."
    
    def _cmd_show_variables(self) -> str:
        """Show all variables in the namespace."""
        namespace = self.kernel.get_namespace()
        if not namespace:
            return "No variables in namespace."
        
        lines = ["**Variables in namespace:**\n"]
        for name, value in sorted(namespace.items()):
            type_name = type(value).__name__
            lines.append(f"- `{name}`: {type_name}")
        
        return "\n".join(lines)
    
    def _cmd_inspect_variable(self, var_name: str) -> str:
        """Inspect a specific variable."""
        if not var_name:
            return "Please specify a variable name. Usage: `/inspect <variable>`"
        
        var_info = self.kernel.get_variable_info(var_name.strip(), deep=True)
        if not var_info:
            return f"Variable '{var_name}' not found."
        
        lines = [f"**Inspection of `{var_name}`:**\n"]
        lines.append(f"- Type: `{var_info.type_str}`")
        lines.append(f"- Callable: {var_info.is_callable}")
        
        if var_info.size is not None:
            lines.append(f"- Size: {var_info.size} bytes")
        
        if var_info.shape:
            lines.append(f"- Shape: {var_info.shape}")
        
        lines.append(f"\n**Preview:**\n```\n{var_info.preview}\n```")
        
        if var_info.attributes:
            lines.append(f"\n**Attributes ({len(var_info.attributes)}):**")
            # Show first 10 attributes
            for attr in var_info.attributes[:10]:
                lines.append(f"- {attr}")
            if len(var_info.attributes) > 10:
                lines.append(f"- ... and {len(var_info.attributes) - 10} more")
        
        return "\n".join(lines)
    
    def _cmd_execute_code(self, code: str) -> str:
        """Execute code in the kernel."""
        if not code:
            return "Please provide code to execute. Usage: `/exec <code>`"
        
        result = self.kernel.execute_code(code)
        
        lines = [f"**Executed:**\n```python\n{code}\n```\n"]
        
        if result.success:
            lines.append("✅ **Success**")
            
            if result.outputs:
                lines.append("\n**Output:**")
                for output in result.outputs:
                    if output['type'] == 'execute_result':
                        lines.append(f"```\n{output['data']['text/plain']}\n```")
            
            if result.variables_changed:
                lines.append(f"\n**Variables changed:** {', '.join(result.variables_changed)}")
        else:
            lines.append("❌ **Error**")
            if result.error:
                lines.append(f"\n**{result.error['type']}:** {result.error['message']}")
                if result.error.get('traceback'):
                    lines.append("\n**Traceback:**")
                    lines.append("```")
                    lines.extend(result.error['traceback'][:5])  # Limit traceback lines
                    lines.append("```")
        
        # Update state after execution
        self._update_kernel_state()
        self._update_variables_info()
        
        return "\n".join(lines)
    
    def _cmd_clear_namespace(self) -> str:
        """Clear the namespace (with confirmation)."""
        # For safety, we'll just show what would be cleared
        namespace = self.kernel.get_namespace()
        if not namespace:
            return "Namespace is already empty."
        
        self.set_action_buttons([
            {"text": "Confirm Clear", "color": "#dc3545", "icon": "⚠️"},
            {"text": "Cancel", "color": "#6c757d", "icon": "✖️"}
        ])
        
        return f"⚠️ This will clear {len(namespace)} variables. Click 'Confirm Clear' to proceed."
    
    def _cmd_show_help(self) -> str:
        """Show available commands."""
        return """**Available Commands:**

- `/vars` - Show all variables in namespace
- `/inspect <variable>` - Inspect a variable in detail
- `/exec <code>` - Execute Python code
- `/clear` - Clear namespace (with confirmation)
- `/help` - Show this help message

**Tips:**
- Click on variable names in messages to inspect them
- Use the variable explorer panel for visual browsing
- Code blocks can be executed by clicking the "Run" button"""
    
    def _handle_action_button(self, action: str) -> None:
        """Handle action button clicks."""
        if action == "Confirm Clear":
            # Clear namespace
            code = """
# Clear all user-defined variables
for var in list(globals().keys()):
    if not var.startswith('_') and var not in ['In', 'Out', 'get_ipython', 'exit', 'quit']:
        del globals()[var]
"""
            result = self.kernel.execute_code(code)
            
            if result.success:
                self.add_message("system", "✅ Namespace cleared successfully.")
            else:
                self.add_message("system", "❌ Failed to clear namespace.")
            
            self.clear_action_buttons()
            self._update_kernel_state()
            self._update_variables_info()
            
        elif action == "Cancel":
            self.add_message("system", "Cancelled namespace clearing.")
            self.clear_action_buttons()
    
    def _update_kernel_state(self) -> None:
        """Update kernel state information."""
        if not self.kernel.is_available:
            self.kernel_state = {"available": False, "status": "not_connected"}
            return
        
        info = self.kernel.get_kernel_info()
        namespace = self.kernel.get_namespace()
        
        # Count variables by type
        by_type: Dict[str, int] = {}
        for name, value in namespace.items():
            type_name = type(value).__name__
            by_type[type_name] = by_type.get(type_name, 0) + 1
        
        self.kernel_state = {
            "available": True,
            "status": "idle",
            "execution_count": info.get("execution_count", 0),
            "namespace_size": len(namespace),
            "variables_by_type": by_type
        }
    
    def _update_variables_info(self) -> None:
        """Update variables information."""
        if not self.kernel.is_available:
            self.variables_info = []
            return
        
        namespace = self.kernel.get_namespace()
        var_infos = []
        
        for name in sorted(namespace.keys())[:50]:  # Limit to prevent overwhelming
            var_info = self.kernel.get_variable_info(name)
            if var_info:
                var_infos.append(var_info.to_dict())
        
        self.variables_info = var_infos
    
    # Convenience methods from base class
    def add_message(self, role: str, content: str) -> None:
        """Add a message to the chat history from Python."""
        new_history = list(self.chat_history)
        new_history.append({"role": role, "content": content})
        self.chat_history = new_history
    
    def get_chat_history(self) -> List[Dict[str, str]]:
        """Get the current chat history."""
        return list(self.chat_history)
    
    def clear_chat_history(self) -> None:
        """Clear the chat history."""
        self.chat_history = []
    
    def set_action_buttons(self, buttons: List[str | Dict[str, str]]) -> None:
        """Set action buttons to display."""
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
    
    def inspect_variable(self, var_name: str) -> Optional[Dict[str, Any]]:
        """Programmatically inspect a variable."""
        var_info = self.kernel.get_variable_info(var_name, deep=True)
        return var_info.to_dict() if var_info else None
    
    def execute_code(self, code: str, show_result: bool = True) -> Dict[str, Any]:
        """Programmatically execute code."""
        result = self.kernel.execute_code(code)
        
        if show_result:
            # Add execution to chat history
            self.add_message("system", f"Executed: `{code}`")
            
            if result.success and result.outputs:
                for output in result.outputs:
                    if output['type'] == 'execute_result':
                        self.add_message("system", f"Result: {output['data']['text/plain']}")
            elif not result.success and result.error:
                self.add_message("system", f"Error: {result.error['message']}")
        
        # Update state
        self._update_kernel_state()
        self._update_variables_info()
        
        return result.to_dict()
"""AgentWidget with AI and kernel access capabilities."""

import pathlib
from typing import Any, Dict, List, Optional

import anywidget
import traitlets

from .kernel_interface import KernelInterface, KernelContext, AIConfig, ExecutionResult
from .simple_handlers import SimpleHandlers
from .ai import LangGraphAIService


class AgentWidget(anywidget.AnyWidget):
    """AI-powered assistant widget with kernel access."""

    # Path to the compiled JavaScript bundle
    _esm = pathlib.Path(__file__).parent / "static" / "index.js"

    # Basic widget state synchronized between Python and JavaScript
    message = traitlets.Unicode("").tag(sync=True)
    chat_history: traitlets.List = traitlets.List([]).tag(sync=True)
    action_buttons: traitlets.List = traitlets.List([]).tag(sync=True)

    # Kernel interaction state
    kernel_state = traitlets.Dict({}).tag(sync=True)
    code_result = traitlets.Dict({}).tag(sync=True)
    variables_info: traitlets.List = traitlets.List([]).tag(sync=True)
    debug_info = traitlets.Dict({}).tag(sync=True)

    # Code execution history
    code_history: traitlets.List = traitlets.List([]).tag(sync=True)

    # Loading state
    is_loading = traitlets.Bool(False).tag(sync=True)

    # AI assistant configuration
    ai_config = traitlets.Dict(
        {
            "model": "gpt-4",
            "temperature": 0.7,
            "max_tokens": 2000,
            "system_prompt": "You are a helpful AI assistant with access to the Jupyter kernel...",
        }
    ).tag(sync=True)

    def __init__(
        self, ai_config: Optional[Dict[str, Any] | AIConfig] = None, **kwargs: Any
    ) -> None:
        """Initialize the widget."""
        super().__init__(**kwargs)

        # Initialize kernel interface and message handlers
        self.kernel = KernelInterface()
        self.handlers = SimpleHandlers(self.kernel)

        # Set up code execution callback
        self.kernel.set_execution_callback(self._on_code_executed)

        # Initialize thread ID
        self._thread_id: Optional[str] = None

        # Initialize AI service only if AI config is provided
        self.ai_service: Optional[LangGraphAIService] = None
        if ai_config:
            # Convert dict to AIConfig if needed
            if isinstance(ai_config, dict):
                # Filter out unknown keys before creating AIConfig
                valid_keys = {
                    "model",
                    "provider",
                    "temperature",
                    "max_tokens",
                    "system_prompt",
                    "require_approval",
                }
                filtered_config = {
                    k: v for k, v in ai_config.items() if k in valid_keys
                }
                config = AIConfig(**filtered_config)
            else:
                config = ai_config

            self.ai_config = config.to_dict()

            # Always use LangGraph service
            self.ai_service = LangGraphAIService(
                kernel=self.kernel,
                model=config.model,
                provider=config.provider,
                require_approval=config.require_approval,
            )

        # Set up message handling
        self.on_msg(self._handle_message)

        # Initialize kernel state
        self._update_kernel_state()
        self._update_variables_info()

    def _handle_message(
        self, widget: Any, content: Dict[str, Any], buffers: Any = None
    ) -> None:
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

        # Update chat history immediately so user message appears in UI
        self.chat_history = new_history

        # Only generate responses if AI service is available
        if self.ai_service:
            # Set loading state
            self.is_loading = True
            # Check if this is a command or regular message
            if user_text.startswith("/"):
                # Handle commands
                response = self._handle_command(user_text)
                self.add_message("assistant", response)
                self.is_loading = False
            else:
                # Get kernel context for AI
                context = self._get_kernel_context()

                # Get AI response
                result = self.ai_service.chat(
                    message=user_text,
                    thread_id=self._get_thread_id(),
                    context=context,
                )

                # Handle approval requests
                if result.needs_approval:
                    # Show approval request
                    interrupt_msg = getattr(
                        result, "interrupt_message", "Approval required"
                    )
                    # Add message with metadata for approval tracking
                    current_history = list(self.chat_history)
                    current_history.append(
                        {
                            "role": "assistant",
                            "content": f"🔐 **Approval Required**\n\n{interrupt_msg}",
                            "needs_approval": True,
                            "thread_id": result.thread_id,
                        }
                    )
                    self.chat_history = current_history

                    # Set action buttons for approval
                    self.set_action_buttons(
                        [
                            {"text": "Approve", "color": "#28a745", "icon": "✅"},
                            {"text": "Deny", "color": "#dc3545", "icon": "❌"},
                        ]
                    )
                else:
                    self.add_message("assistant", result.content)

                # Clear loading state
                self.is_loading = False

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
                    if output["type"] == "execute_result":
                        lines.append(f"```\n{output['data']['text/plain']}\n```")

            if result.variables_changed:
                lines.append(
                    f"\n**Variables changed:** {', '.join(result.variables_changed)}"
                )
        else:
            lines.append("❌ **Error**")
            if result.error:
                lines.append(f"\n**{result.error['type']}:** {result.error['message']}")
                if result.error.get("traceback"):
                    lines.append("\n**Traceback:**")
                    lines.append("```")
                    lines.extend(result.error["traceback"][:5])  # Limit traceback lines
                    lines.append("```")

        # Add to code history using the helper method
        self.add_code_to_history(
            code=code,
            execution_count=result.execution_count,
            success=result.success,
            output=self._extract_output_from_result(result),
        )

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

        self.set_action_buttons(
            [
                {"text": "Confirm Clear", "color": "#dc3545", "icon": "⚠️"},
                {"text": "Cancel", "color": "#6c757d", "icon": "✖️"},
            ]
        )

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
- Code blocks can be executed by clicking the "Run" button"""

    def _handle_action_button(self, action: str) -> None:
        """Handle action button clicks."""
        if action == "Approve" or action == "Deny":
            # Clear buttons immediately when approval action is clicked
            self.clear_action_buttons()
            # Handle LangGraph approval
            self._handle_approval(action == "Approve")
        elif action == "Confirm Clear":
            # Clear namespace
            code = """
# Clear all user-defined variables
for var in list(globals().keys()):
    if not var.startswith('_') and var not in ['In', 'Out', 'get_ipython', 'exit', 'quit']:
        del globals()[var]
"""
            result = self.kernel.execute_code(code)

            # Add to code history
            self.add_code_to_history(
                code=code,
                execution_count=result.execution_count,
                success=result.success,
                output="Namespace cleared"
                if result.success
                else "Failed to clear namespace",
            )

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

    def _handle_approval(self, approved: bool) -> None:
        """Handle approval/denial of code execution."""
        # Set loading state
        self.is_loading = True

        # Find the last approval request in history
        thread_id = None
        for msg in reversed(self.chat_history):
            if isinstance(msg, dict) and msg.get("needs_approval"):
                thread_id = msg.get("thread_id")
                break

        if not thread_id or not self.ai_service:
            self.add_message("system", "❌ No pending approval request found.")
            self.clear_action_buttons()
            self.is_loading = False
            return

        # Send approval decision to LangGraph
        if self.ai_service:
            ai_result = self.ai_service.chat(
                message=approved,  # Send boolean for approval
                thread_id=thread_id,
                context=self._get_kernel_context(),
            )

            # Add response to history
            if ai_result.content:
                self.add_message("assistant", ai_result.content)
            elif approved:
                self.add_message("system", "✅ Code execution approved.")
            else:
                self.add_message("system", "❌ Code execution denied.")

        # Clear action buttons
        self.clear_action_buttons()

        # Clear loading state
        self.is_loading = False

        # Update state after potential code execution
        if approved:
            self._update_kernel_state()
            self._update_variables_info()

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
            "variables_by_type": by_type,
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

    # Public API methods
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

    def add_code_to_history(
        self,
        code: str,
        execution_count: int,
        success: bool = True,
        output: Optional[str] = None,
    ) -> None:
        """Add executed code to the history."""
        import time

        new_history = list(self.code_history)
        new_history.append(
            {
                "code": code,
                "execution_count": execution_count,
                "timestamp": time.time(),
                "success": success,
                "output": output,
            }
        )
        # Keep only the last 50 code executions
        if len(new_history) > 50:
            new_history = new_history[-50:]
        self.code_history = new_history

    def inspect_variable(self, var_name: str) -> Optional[Dict[str, Any]]:
        """Programmatically inspect a variable."""
        var_info = self.kernel.get_variable_info(var_name, deep=True)
        return var_info.to_dict() if var_info else None

    def execute_code(self, code: str, show_result: bool = True) -> Dict[str, Any]:
        """Programmatically execute code."""
        result = self.kernel.execute_code(code)

        # Add to code history using the helper method
        self.add_code_to_history(
            code=code,
            execution_count=result.execution_count,
            success=result.success,
            output=self._extract_output_from_result(result),
        )

        if show_result:
            # Add execution to chat history
            self.add_message("system", f"Executed: `{code}`")

            if result.success and result.outputs:
                for output in result.outputs:
                    if output["type"] == "execute_result":
                        self.add_message(
                            "system", f"Result: {output['data']['text/plain']}"
                        )
            elif not result.success and result.error:
                self.add_message("system", f"Error: {result.error['message']}")

        # Update state
        self._update_kernel_state()
        self._update_variables_info()

        return result.to_dict()

    def _get_thread_id(self) -> str:
        """Get or create a thread ID for the current conversation."""
        if self._thread_id is None:
            import uuid

            self._thread_id = str(uuid.uuid4())
        return self._thread_id

    def _get_kernel_context(self) -> KernelContext:
        """Get current kernel context for the AI."""
        # Add kernel info
        kernel_info = self.kernel.get_kernel_info()

        # Add variable summaries (first 10)
        namespace = self.kernel.get_namespace()
        variables = []
        for name, value in list(namespace.items())[:10]:
            var_info = self.kernel.get_variable_info(name)
            if var_info:
                variables.append(
                    {
                        "name": var_info.name,
                        "type": var_info.type,
                        "type_str": var_info.type_str,
                        "size": var_info.size,
                        "shape": var_info.shape,
                    }
                )

        recent_cells = None
        notebook_summary = None

        # Add notebook state (recent cells for context) if available
        if self.kernel.is_available:
            notebook_state = self.kernel.get_notebook_state()
            if notebook_state.cells:
                # Include recent cells (last 5 executed)
                recent_cells_data = sorted(
                    [cell for cell in notebook_state.cells if cell.has_output],
                    key=lambda x: x.execution_count or 0,
                    reverse=True,
                )[:5]

                recent_cells = [
                    {
                        "execution_count": cell.execution_count,
                        "input_code": cell.input_code,
                        "output": str(cell.output) if cell.output is not None else None,
                        "has_output": cell.has_output,
                    }
                    for cell in recent_cells_data
                ]

                # Add notebook summary
                notebook_summary = {
                    "total_cells": notebook_state.total_cells,
                    "executed_cells": notebook_state.executed_cells,
                    "current_execution_count": notebook_state.current_execution_count,
                }

        # Add last error if any
        last_error = self.kernel.get_last_error()

        # Add imported modules
        imported_modules = self.kernel.get_imported_modules()

        return KernelContext(
            kernel_info=kernel_info,
            variables=variables,
            recent_cells=recent_cells,
            notebook_summary=notebook_summary,
            last_error=last_error,
            imported_modules=imported_modules,
        )

    def get_conversation_log_path(self) -> Optional[str]:
        """Get the current conversation log file path."""
        if self.ai_service:
            log_path = self.ai_service.conversation_logger.get_current_log_path()
            return str(log_path) if log_path else None
        return None

    def _extract_output_from_result(self, result: ExecutionResult) -> Optional[str]:
        """Extract output text from an ExecutionResult."""
        if result.success and result.outputs:
            output_parts = []
            for output in result.outputs:
                if output["type"] == "execute_result":
                    output_parts.append(output["data"]["text/plain"])
            if output_parts:
                return "\n".join(output_parts)
        elif not result.success and result.error:
            return f"Error: {result.error['type']}: {result.error['message']}"
        return None

    def _on_code_executed(self, code: str, result: ExecutionResult) -> None:
        """Callback for when code is executed through the kernel interface."""
        # Add to code history
        self.add_code_to_history(
            code=code,
            execution_count=result.execution_count,
            success=result.success,
            output=self._extract_output_from_result(result),
        )

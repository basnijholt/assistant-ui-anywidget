"""Tests for AgentWidget with enhanced features."""
# mypy: disable-error-code=misc

from typing import Any
from unittest.mock import Mock, patch

import pytest

from assistant_ui_anywidget import AgentWidget
from assistant_ui_anywidget.kernel_interface import (
    VariableInfo,
    ExecutionResult,
    NotebookState,
    NotebookCell,
)


class MockKernel:
    """Mock kernel for testing."""

    def __init__(self) -> None:
        self.is_available = True
        self.namespace = {"x": 42, "y": "hello", "df": Mock()}
        self.execution_count = 0
        self._execution_callback = None

    def get_namespace(self) -> dict[str, Any]:
        if not self.is_available:
            return {}
        return self.namespace

    def get_kernel_info(self) -> dict[str, Any]:
        return {
            "available": True,
            "execution_count": self.execution_count,
            "namespace_size": len(self.namespace),
        }

    def get_variable_info(self, name: str, deep: bool = False) -> VariableInfo | None:
        if name not in self.namespace:
            return None
        value = self.namespace[name]
        return VariableInfo(
            name=name,
            type=type(value).__name__,
            type_str=str(type(value)),
            size=None,
            shape=None,
            preview=repr(value),
            is_callable=False,
            attributes=["attr1", "attr2"] if deep else [],
            last_modified=None,
        )

    def get_last_error(self) -> None:
        """Get the last error from the kernel."""
        return None  # No error for testing

    def set_execution_callback(self, callback: Any) -> None:
        """Set a callback to be called whenever code is executed."""
        self._execution_callback = callback

    def get_imported_modules(self) -> dict[str, str]:
        """Get modules that have been imported in the namespace."""
        return {"pandas": "external", "numpy": "external", "os": "builtin"}

    def execute_code(
        self, code: str, silent: bool = False, store_history: bool = True
    ) -> ExecutionResult:
        self.execution_count += 1

        if code == "1 + 1":
            result = ExecutionResult(
                success=True,
                execution_count=self.execution_count,
                outputs=[{"type": "execute_result", "data": {"text/plain": "2"}}],
                execution_time=0.001,
                variables_changed=[],
            )
        elif code.startswith("raise"):
            result = ExecutionResult(
                success=False,
                execution_count=self.execution_count,
                outputs=[],
                execution_time=0.001,
                variables_changed=[],
                error={
                    "type": "ValueError",
                    "message": "Test error",
                    "traceback": ["Traceback..."],
                },
            )
        elif "del globals()" in code:
            # Simulate clearing namespace
            self.namespace.clear()
            result = ExecutionResult(
                success=True,
                execution_count=self.execution_count,
                outputs=[],
                execution_time=0.001,
                variables_changed=[],
            )
        else:
            result = ExecutionResult(
                success=True,
                execution_count=self.execution_count,
                outputs=[],
                execution_time=0.001,
                variables_changed=[],
            )

        # Call the callback if set (to simulate real behavior)
        if self._execution_callback:
            self._execution_callback(code, result)  # type: ignore[unreachable]

        return result

    def get_notebook_inputs(self) -> dict[int, str]:
        """Mock notebook inputs."""
        return {
            1: "import pandas as pd",
            2: "x = 42",
            3: "print('hello')",
        }

    def get_notebook_outputs(self) -> dict[int, Any]:
        """Mock notebook outputs."""
        return {
            2: None,  # x = 42 has no output
            3: "hello",  # print output
        }

    def get_notebook_state(self) -> NotebookState:
        """Mock notebook state."""

        inputs = self.get_notebook_inputs()
        outputs = self.get_notebook_outputs()

        cells = []
        for cell_num in inputs:
            cell = NotebookCell(
                cell_number=cell_num,
                input_code=inputs[cell_num],
                output=outputs.get(cell_num),
                execution_count=cell_num if cell_num in outputs else None,
                has_output=cell_num in outputs,
            )
            cells.append(cell)

        return NotebookState(
            cells=cells,
            total_cells=len(inputs),
            executed_cells=len(outputs),
            current_execution_count=3,
        )

    def get_cell_by_number(self, cell_number: int) -> NotebookCell | None:
        """Mock get specific cell."""

        inputs = self.get_notebook_inputs()
        outputs = self.get_notebook_outputs()

        if cell_number not in inputs:
            return None

        return NotebookCell(
            cell_number=cell_number,
            input_code=inputs[cell_number],
            output=outputs.get(cell_number),
            execution_count=cell_number if cell_number in outputs else None,
            has_output=cell_number in outputs,
        )

    def search_cells_by_content(
        self, search_term: str, case_sensitive: bool = False
    ) -> list[NotebookCell]:
        """Mock search cells."""

        inputs = self.get_notebook_inputs()
        outputs = self.get_notebook_outputs()
        matching_cells = []

        search_term_normalized = search_term if case_sensitive else search_term.lower()

        for cell_num, input_code in inputs.items():
            input_normalized = input_code if case_sensitive else input_code.lower()

            if search_term_normalized in input_normalized:
                cell = NotebookCell(
                    cell_number=cell_num,
                    input_code=input_code,
                    output=outputs.get(cell_num),
                    execution_count=cell_num if cell_num in outputs else None,
                    has_output=cell_num in outputs,
                )
                matching_cells.append(cell)

        return matching_cells


@pytest.fixture
def mock_kernel() -> MockKernel:
    """Create mock kernel."""
    return MockKernel()


@pytest.fixture
def widget(mock_kernel: MockKernel) -> AgentWidget:
    """Create AgentWidget with mocked dependencies."""
    with patch("assistant_ui_anywidget.agent_widget.KernelInterface") as mock_ki:
        mock_ki.return_value = mock_kernel
        # Mock environment variables to ensure no API keys are present
        with patch.dict("os.environ", {}, clear=True):
            # Create widget without API keys to force mock AI
            widget = AgentWidget(
                require_approval=False,
                show_help=False,  # Disable welcome message for tests
            )
            widget.kernel = mock_kernel  # type: ignore[assignment]
            return widget


class TestAgentWidget:
    """Test AgentWidget functionality."""

    def test_initialization(self, widget: AgentWidget) -> None:
        """Test widget initialization."""
        assert widget.kernel is not None
        assert widget.handlers is not None
        assert len(widget.kernel_state) > 0
        assert widget.kernel_state["available"] is True
        assert len(widget.variables_info) > 0

    def test_handle_user_message(self, widget: AgentWidget) -> None:
        """Test handling regular user messages."""
        # Regular message
        widget._handle_user_message("Hello")
        assert len(widget.chat_history) == 2
        assert widget.chat_history[0]["role"] == "user"
        assert widget.chat_history[0]["content"] == "Hello"
        assert widget.chat_history[1]["role"] == "assistant"
        # Mock AI returns specific greeting response
        assert "mock AI assistant" in widget.chat_history[1]["content"]

        # Clear history for next test
        widget.clear_chat_history()

        # Command message
        widget._handle_user_message("/help")
        assert len(widget.chat_history) == 2
        assert "Available Commands" in widget.chat_history[1]["content"]

    def test_command_vars(self, widget: AgentWidget) -> None:
        """Test /vars command."""
        response = widget._cmd_show_variables()
        assert "Variables in namespace:" in response
        assert "`x`: int" in response
        assert "`y`: str" in response
        assert "`df`: Mock" in response

    def test_command_inspect(self, widget: AgentWidget) -> None:
        """Test /inspect command."""
        # With variable name
        response = widget._cmd_inspect_variable("x")
        assert "Inspection of `x`:" in response
        assert "Type: " in response
        assert "Preview:" in response

        # Without variable name
        response = widget._cmd_inspect_variable("")
        assert "Please specify a variable name" in response

        # Non-existent variable
        response = widget._cmd_inspect_variable("nonexistent")
        assert "not found" in response

        # Deep inspection
        response = widget._cmd_inspect_variable("y")
        assert "Attributes" in response
        assert "attr1" in response

    def test_command_exec(self, widget: AgentWidget) -> None:
        """Test /exec command."""
        # Successful execution
        response = widget._cmd_execute_code("1 + 1")
        assert "Executed:" in response
        assert "Success" in response
        assert "2" in response

        # Error execution
        response = widget._cmd_execute_code("raise ValueError()")
        assert "Error" in response
        assert "ValueError" in response
        assert "Traceback" in response

        # No code provided
        response = widget._cmd_execute_code("")
        assert "Please provide code" in response

    def test_command_clear(self, widget: AgentWidget) -> None:
        """Test /clear command."""
        response = widget._cmd_clear_namespace()
        assert "will clear" in response
        assert len(widget.action_buttons) == 2

        # Find confirm button
        confirm_button = None
        for button in widget.action_buttons:
            if button["text"] == "Confirm Clear":
                confirm_button = button
                break

        assert confirm_button is not None
        assert confirm_button["color"] == "#dc3545"

    def test_command_help(self, widget: AgentWidget) -> None:
        """Test /help command."""
        response = widget._cmd_show_help()
        assert "Available Commands:" in response
        assert "/vars" in response
        assert "/inspect" in response
        assert "/exec" in response
        assert "/clear" in response
        assert "/help" in response

    def test_handle_action_button(self, widget: AgentWidget) -> None:
        """Test action button handling."""
        # Setup clear command first
        widget._cmd_clear_namespace()

        # Test confirm clear
        widget._handle_action_button("Confirm Clear")
        assert len(widget.chat_history) == 1
        assert "cleared successfully" in widget.chat_history[0]["content"]
        assert len(widget.action_buttons) == 0

        # Test cancel
        widget.clear_chat_history()
        widget._cmd_clear_namespace()
        widget._handle_action_button("Cancel")
        assert "Cancelled" in widget.chat_history[0]["content"]
        assert len(widget.action_buttons) == 0

    def test_handle_message_api_request(self, widget: AgentWidget) -> None:
        """Test handling API requests."""
        # Mock send method
        widget.send = Mock()

        # Create API request
        content = {
            "type": "api_request",
            "request": {"id": "123", "type": "get_variables"},
        }

        widget._handle_message(widget, content)

        # Check response was sent
        widget.send.assert_called_once()
        call_args = widget.send.call_args[0][0]
        assert call_args["type"] == "api_response"
        assert "response" in call_args
        assert call_args["response"]["success"] is True

    def test_update_kernel_state(self, widget: AgentWidget) -> None:
        """Test kernel state updates."""
        widget._update_kernel_state()

        assert widget.kernel_state["available"] is True
        assert widget.kernel_state["status"] == "idle"
        assert widget.kernel_state["namespace_size"] == 3
        assert "variables_by_type" in widget.kernel_state

        # Test without kernel
        widget.kernel.is_available = False
        widget._update_kernel_state()
        assert widget.kernel_state["available"] is False
        assert widget.kernel_state["status"] == "not_connected"  # type: ignore[unreachable]

    def test_update_variables_info(self, widget: AgentWidget) -> None:
        """Test variables info updates."""
        widget._update_variables_info()

        assert len(widget.variables_info) == 3
        var_names = [v["name"] for v in widget.variables_info]
        assert "x" in var_names
        assert "y" in var_names
        assert "df" in var_names

        # Test without kernel
        widget.kernel.is_available = False
        widget._update_variables_info()
        assert widget.variables_info == []

    def test_programmatic_methods(self, widget: AgentWidget) -> None:
        """Test programmatic API methods."""
        # Test add_message
        widget.add_message("system", "Test message")
        assert widget.chat_history[-1]["role"] == "system"
        assert widget.chat_history[-1]["content"] == "Test message"

        # Test get_chat_history
        history = widget.get_chat_history()
        assert len(history) == len(widget.chat_history)

        # Test clear_chat_history
        widget.clear_chat_history()
        assert len(widget.chat_history) == 0

        # Test inspect_variable
        info = widget.inspect_variable("x")
        assert info is not None
        assert info["name"] == "x"
        assert info["type"] == "int"

        # Test execute_code
        result = widget.execute_code("1 + 1", show_result=True)
        assert result["success"] is True
        assert len(widget.chat_history) == 2  # Executed + Result messages

        # Test action buttons
        widget.set_action_buttons(["Button1", {"text": "Button2", "color": "red"}])
        assert len(widget.action_buttons) == 2
        assert widget.action_buttons[0]["text"] == "Button1"
        assert widget.action_buttons[1]["color"] == "red"

        widget.clear_action_buttons()
        assert len(widget.action_buttons) == 0

    def test_handle_unknown_command(self, widget: AgentWidget) -> None:
        """Test handling unknown commands."""
        response = widget._handle_command("/unknown")
        assert "Unknown command" in response
        assert "/help" in response

    def test_empty_namespace(self, widget: AgentWidget) -> None:
        """Test behavior with empty namespace."""
        widget.kernel.namespace = {}  # type: ignore[attr-defined]

        response = widget._cmd_show_variables()
        assert "No variables" in response

        widget._update_variables_info()
        assert widget.variables_info == []

    def test_kernel_not_available(self, widget: AgentWidget) -> None:
        """Test behavior when kernel is not available."""
        widget.kernel.is_available = False
        # Need to update the kernel info method too
        widget.kernel.get_kernel_info = lambda: {"available": False}  # type: ignore[method-assign]

        # Commands should still work and report kernel unavailable
        widget._handle_user_message("/vars")
        assert "No variables in namespace" in widget.chat_history[-1]["content"]

        widget._update_kernel_state()
        assert widget.kernel_state["status"] == "not_connected"

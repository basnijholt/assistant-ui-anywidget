"""Tests for message handlers."""
# mypy: disable-error-code=misc

from typing import Any
from unittest.mock import Mock

import pytest

from assistant_ui_anywidget.simple_handlers import SimpleHandlers
from assistant_ui_anywidget.kernel_interface import VariableInfo, ExecutionResult


class MockKernelInterface:
    """Mock kernel interface for testing."""

    def __init__(self) -> None:
        self.is_available = True
        self.namespace = {"x": 42, "y": "hello", "data": [1, 2, 3, 4, 5]}
        # Mock shell with execution_count
        self.shell = Mock(execution_count=10)

    def get_namespace(self) -> dict[str, Any]:
        """Get mock namespace."""
        return self.namespace

    def get_variable_info(self, name: str, deep: bool = False) -> VariableInfo | None:
        """Get mock variable info."""
        if name not in self.namespace:
            return None

        value = self.namespace[name]
        return VariableInfo(
            name=name,
            type=type(value).__name__,
            type_str=f"{type(value).__module__}.{type(value).__name__}",
            size=28 if isinstance(value, int) else None,
            shape=None,
            preview=repr(value),
            is_callable=False,
            attributes=["__class__", "__str__"] if deep else [],
            last_modified=None,
        )

    def execute_code(
        self, code: str, silent: bool = False, store_history: bool = True
    ) -> ExecutionResult:
        """Mock code execution."""
        if code == "1 + 1":
            return ExecutionResult(
                success=True,
                execution_count=1,
                outputs=[
                    {
                        "type": "execute_result",
                        "data": {"text/plain": "2"},
                        "execution_count": 1,
                    }
                ],
                execution_time=0.001,
                variables_changed=[],
            )
        elif code == "z = 100":
            self.namespace["z"] = 100
            return ExecutionResult(
                success=True,
                execution_count=2,
                outputs=[],
                execution_time=0.001,
                variables_changed=["z"],
            )
        elif code == "raise ValueError('test')":
            return ExecutionResult(
                success=False,
                execution_count=3,
                outputs=[],
                execution_time=0.001,
                variables_changed=[],
                error={
                    "type": "ValueError",
                    "message": "test",
                    "traceback": ["Traceback...", "ValueError: test"],
                },
            )
        else:
            return ExecutionResult(
                success=True,
                execution_count=4,
                outputs=[],
                execution_time=0.001,
                variables_changed=[],
            )

    def get_kernel_info(self) -> dict[str, Any]:
        """Get mock kernel info."""
        return {
            "available": self.is_available,
            "language": "python",
            "execution_count": 10,
        }

    def get_stack_trace(
        self, include_locals: bool = False, max_frames: int = 10
    ) -> list[Any]:
        """Get mock stack trace."""
        return []

    def get_last_error(self) -> None:
        """Get mock last error."""
        return None


@pytest.fixture
def mock_kernel() -> MockKernelInterface:
    """Create mock kernel interface."""
    return MockKernelInterface()


@pytest.fixture
def message_handlers(mock_kernel: Any) -> SimpleHandlers:
    """Create message handlers with mock kernel."""
    return SimpleHandlers(mock_kernel)


class TestMessageHandlers:
    """Test message handler functionality."""

    def test_handle_invalid_message(self, message_handlers: Any) -> None:
        """Test handling invalid messages."""
        # Test non-dict message
        response = message_handlers.handle_message("not a dict")
        assert response["success"] is False
        assert "type is required" in response["error"]

        # Test missing type
        response = message_handlers.handle_message({})
        assert response["success"] is False
        assert "type is required" in response["error"]

        # Test unknown type
        response = message_handlers.handle_message(
            {"id": "123", "type": "unknown_type"}
        )
        assert response["success"] is False
        assert "Unknown message type" in response["error"]

    def test_handle_get_variables(self, message_handlers: Any) -> None:
        """Test get_variables handler."""
        # Basic request
        response = message_handlers.handle_message(
            {"id": "123", "type": "get_variables"}
        )

        assert response["success"] is True
        assert len(response["data"]["variables"]) == 3
        assert response["data"]["total_count"] == 3

        # Test with filter
        response = message_handlers.handle_message(
            {
                "id": "124",
                "type": "get_variables",
                "params": {"filter": {"types": ["int"]}},
            }
        )

        assert response["success"] is True
        variables = response["data"]["variables"]
        assert len(variables) == 1
        assert variables[0]["name"] == "x"
        assert variables[0]["type"] == "int"

        # Test with pattern filter
        response = message_handlers.handle_message(
            {
                "id": "125",
                "type": "get_variables",
                "params": {"filter": {"pattern": "^[xy]$"}},
            }
        )

        variables = response["data"]["variables"]
        assert len(variables) == 2
        assert all(v["name"] in ["x", "y"] for v in variables)

        # Test sorting
        response = message_handlers.handle_message(
            {
                "id": "126",
                "type": "get_variables",
                "params": {"sort": {"by": "name", "order": "desc"}},
            }
        )

        variables = response["data"]["variables"]
        names = [v["name"] for v in variables]
        assert names == ["y", "x", "data"]

    def test_handle_inspect_variable(self, message_handlers: Any) -> None:
        """Test inspect_variable handler."""
        # Valid variable
        response = message_handlers.handle_message(
            {"id": "200", "type": "inspect_variable", "params": {"name": "x"}}
        )

        assert response["success"] is True
        info = response["data"]
        assert info["name"] == "x"
        assert info["type"] == "int"
        assert info["preview"] == "42"

        # Deep inspection
        response = message_handlers.handle_message(
            {
                "id": "201",
                "type": "inspect_variable",
                "params": {"name": "y", "deep": True},
            }
        )

        info = response["data"]
        assert len(info["attributes"]) > 0
        assert "name" in info
        assert info["name"] == "y"

        # Non-existent variable
        response = message_handlers.handle_message(
            {"id": "202", "type": "inspect_variable", "params": {"name": "nonexistent"}}
        )

        assert response["success"] is False
        assert "not found" in response["error"]

        # Missing variable name
        response = message_handlers.handle_message(
            {"id": "203", "type": "inspect_variable", "params": {}}
        )

        assert response["success"] is False
        assert "Variable name is required" in response["error"]

    def test_handle_execute_code(self, message_handlers: Any) -> None:
        """Test execute_code handler."""
        # Successful execution
        response = message_handlers.handle_message(
            {"id": "300", "type": "execute_code", "params": {"code": "1 + 1"}}
        )

        assert response["success"] is True
        data = response["data"]
        assert data["success"] is True
        assert data["execution_count"] == 1
        assert len(data["outputs"]) == 1
        assert data["outputs"][0]["data"]["text/plain"] == "2"

        # Variable assignment
        response = message_handlers.handle_message(
            {"id": "301", "type": "execute_code", "params": {"code": "z = 100"}}
        )

        assert response["success"] is True
        data = response["data"]
        assert data["variables_changed"] == ["z"]

        # Execution error
        response = message_handlers.handle_message(
            {
                "id": "302",
                "type": "execute_code",
                "params": {"code": "raise ValueError('test')"},
            }
        )

        assert response["success"] is False
        assert "test" in response["error"]

        # Missing code
        response = message_handlers.handle_message(
            {"id": "303", "type": "execute_code", "params": {}}
        )

        assert response["success"] is False
        assert "Code is required" in response["error"]

    def test_handle_get_kernel_info(self, message_handlers: Any) -> None:
        """Test get_kernel_info handler."""
        response = message_handlers.handle_message(
            {"id": "400", "type": "get_kernel_info"}
        )

        assert response["success"] is True
        data = response["data"]
        assert data["available"] is True
        assert data["language"] == "python"
        assert data["execution_count"] == 10

    def test_handle_get_stack_trace(self, message_handlers: Any) -> None:
        """Test get_stack_trace handler."""
        response = message_handlers.handle_message(
            {
                "id": "500",
                "type": "get_stack_trace",
                "params": {"include_locals": True, "max_frames": 5},
            }
        )

        assert response["success"] is True
        data = response["data"]
        assert "stack_trace" in data
        assert data["stack_trace"] is None  # Mock returns None
        assert "message" in data

    def test_handle_get_history(self, message_handlers: Any) -> None:
        """Test get_history handler."""
        # Execute some code first
        message_handlers.handle_message(
            {"id": "600", "type": "execute_code", "params": {"code": "1 + 1"}}
        )

        message_handlers.handle_message(
            {"id": "601", "type": "execute_code", "params": {"code": "z = 100"}}
        )

        # Get history
        response = message_handlers.handle_message(
            {
                "id": "602",
                "type": "get_history",
                "params": {"n_items": 10, "include_output": True},
            }
        )

        assert response["success"] is True
        items = response["data"]["items"]
        assert len(items) == 2
        assert items[0]["input"] == "1 + 1"
        assert items[1]["input"] == "z = 100"

        # Search history
        response = message_handlers.handle_message(
            {"id": "603", "type": "get_history", "params": {"search": "z ="}}
        )

        items = response["data"]["items"]
        assert len(items) == 1
        assert items[0]["input"] == "z = 100"

    def test_kernel_not_available(self, message_handlers: Any) -> None:
        """Test handling when kernel is not available."""
        message_handlers.kernel.is_available = False

        response = message_handlers.handle_message(
            {"id": "700", "type": "get_variables"}
        )

        assert response["success"] is False
        assert "not available" in response["error"]

        # get_kernel_info should still work
        response = message_handlers.handle_message(
            {"id": "701", "type": "get_kernel_info"}
        )

        assert response["success"] is True
        assert response["data"]["available"] is False

    def test_response_structure(self, message_handlers: Any) -> None:
        """Test response message structure."""
        response = message_handlers.handle_message(
            {"id": "800", "type": "get_kernel_info"}
        )

        # Check required fields in simplified format
        assert "success" in response
        assert response["success"] is True

        # Success response should have data
        assert "data" in response
        assert "error" not in response

    def test_simple_response_structure(self) -> None:
        """Test simplified response structure."""
        # Success response
        success_response: dict[str, Any] = {"success": True, "data": {"result": 42}}
        assert success_response["success"] is True
        assert success_response["data"]["result"] == 42

        # Error response
        error_response: dict[str, Any] = {
            "success": False,
            "error": "Something went wrong",
        }
        assert error_response["success"] is False
        assert "Something went wrong" in error_response["error"]

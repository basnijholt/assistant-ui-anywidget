"""Tests for kernel interface functionality."""

from unittest.mock import Mock, patch

import pytest

from assistant_ui_anywidget.kernel_interface import (
    KernelInterface,
    VariableInfo,
    ExecutionResult,
    StackFrame,
)


class MockIPython:
    """Mock IPython shell for testing."""

    def __init__(self):
        self.user_ns = {
            "x": 42,
            "y": "hello",
            "df": self._create_mock_dataframe(),
            "arr": self._create_mock_array(),
            "_private": "hidden",
            "func": lambda x: x * 2,
        }
        self.execution_count = 10
        self._last_error = None

    def _create_mock_dataframe(self):
        """Create a mock DataFrame-like object."""
        mock_df = Mock()
        mock_df.__class__.__name__ = "DataFrame"
        mock_df.__class__.__module__ = "pandas.core.frame"
        mock_df.__class__.__qualname__ = "DataFrame"
        mock_df.shape = (100, 5)
        mock_df.nbytes = 4000
        mock_df.head = Mock(return_value="   A  B  C\n0  1  2  3\n1  4  5  6")
        return mock_df

    def _create_mock_array(self):
        """Create a mock numpy array-like object."""
        # Use a MagicMock with spec to make it non-callable
        mock_arr = Mock(spec=["shape", "dtype", "nbytes", "__class__", "__repr__"])
        mock_arr.__class__.__name__ = "ndarray"
        mock_arr.__class__.__module__ = "numpy"
        mock_arr.__class__.__qualname__ = "ndarray"
        mock_arr.shape = (10, 20)
        mock_arr.dtype = "float64"
        mock_arr.nbytes = 1600
        # Configure repr to return expected format
        mock_arr.__repr__ = Mock(return_value="array(shape=(10, 20), dtype=float64)")
        return mock_arr

    def run_cell(self, code, silent=False, store_history=True):
        """Mock run_cell method."""
        result = Mock()

        # Simulate successful execution
        if code == "1 + 1":
            result.result = 2
            result.error_in_exec = None
        elif code == "new_var = 100":
            self.user_ns["new_var"] = 100
            result.result = None
            result.error_in_exec = None
        elif code == "raise ValueError('test error')":
            error = ValueError("test error")
            result.result = None
            result.error_in_exec = error
            self._last_error = error
        else:
            result.result = None
            result.error_in_exec = None

        self.execution_count += 1
        return result

    def _get_exc_info(self):
        """Mock for getting exception info."""
        if self._last_error:
            return (type(self._last_error), self._last_error, None)
        return (None, None, None)


@pytest.fixture
def mock_ipython():
    """Create a mock IPython instance."""
    return MockIPython()


@pytest.fixture
def kernel_interface(mock_ipython):
    """Create a KernelInterface with mock IPython."""
    with patch(
        "assistant_ui_anywidget.kernel_interface.get_ipython", return_value=mock_ipython
    ):
        interface = KernelInterface()
        interface.shell = mock_ipython
        return interface


class TestKernelInterface:
    """Test KernelInterface functionality."""

    def test_is_available(self, kernel_interface):
        """Test kernel availability check."""
        assert kernel_interface.is_available is True

        # Test without IPython
        kernel_interface.shell = None
        assert kernel_interface.is_available is False

    def test_get_namespace(self, kernel_interface):
        """Test getting namespace variables."""
        namespace = kernel_interface.get_namespace()

        # Should include public variables
        assert "x" in namespace
        assert "y" in namespace
        assert "df" in namespace
        assert "arr" in namespace
        assert "func" in namespace

        # Should exclude private and IPython internals
        assert "_private" not in namespace
        assert "In" not in namespace
        assert "Out" not in namespace

    def test_get_variable_info(self, kernel_interface):
        """Test getting variable information."""
        # Test integer variable
        x_info = kernel_interface.get_variable_info("x")
        assert x_info is not None
        assert x_info.name == "x"
        assert x_info.type == "int"
        assert x_info.preview == "42"
        assert x_info.is_callable is False

        # Test string variable
        y_info = kernel_interface.get_variable_info("y")
        assert y_info.name == "y"
        assert y_info.type == "str"
        assert y_info.preview == "'hello'"

        # Test DataFrame-like variable
        df_info = kernel_interface.get_variable_info("df")
        assert df_info.name == "df"
        assert df_info.type == "DataFrame"
        assert df_info.shape == [100, 5]
        assert df_info.size == 4000
        assert "A  B  C" in df_info.preview

        # Test array-like variable
        arr_info = kernel_interface.get_variable_info("arr")
        assert arr_info.name == "arr"
        assert arr_info.type == "ndarray"
        assert arr_info.shape == [10, 20]
        assert "array(shape=" in arr_info.preview
        assert "dtype=" in arr_info.preview

        # Test callable
        func_info = kernel_interface.get_variable_info("func")
        assert func_info.is_callable is True

        # Test non-existent variable
        none_info = kernel_interface.get_variable_info("nonexistent")
        assert none_info is None

        # Test deep inspection
        deep_info = kernel_interface.get_variable_info("x", deep=True)
        assert len(deep_info.attributes) > 0

    def test_execute_code_success(self, kernel_interface):
        """Test successful code execution."""
        # Test expression evaluation
        result = kernel_interface.execute_code("1 + 1")
        assert result.success is True
        assert result.execution_count == 11  # Started at 10
        assert len(result.outputs) == 1
        assert result.outputs[0]["type"] == "execute_result"
        assert result.outputs[0]["data"]["text/plain"] == "2"
        assert result.error is None

        # Test variable assignment
        result = kernel_interface.execute_code("new_var = 100")
        assert result.success is True
        assert "new_var" in result.variables_changed
        assert result.outputs == []  # No output for assignment

    def test_execute_code_error(self, kernel_interface):
        """Test code execution with error."""
        result = kernel_interface.execute_code("raise ValueError('test error')")
        assert result.success is False
        assert result.error is not None
        assert result.error["type"] == "ValueError"
        assert result.error["message"] == "test error"
        assert len(result.error["traceback"]) > 0

    def test_get_last_error(self, kernel_interface):
        """Test getting last error information."""
        # Initially no error
        assert kernel_interface.get_last_error() is None

        # Execute code that raises error
        kernel_interface.execute_code("raise ValueError('test error')")

        # Should be able to get error info
        error_info = kernel_interface.get_last_error()
        assert error_info is not None
        assert error_info["type"] == "ValueError"
        assert error_info["message"] == "test error"

    def test_get_stack_trace(self, kernel_interface):
        """Test getting stack trace."""
        frames = kernel_interface.get_stack_trace(max_frames=5)
        assert isinstance(frames, list)
        assert len(frames) <= 5

        if frames:
            frame = frames[0]
            assert isinstance(frame, StackFrame)
            assert frame.is_current is True
            assert frame.filename is not None
            assert frame.line_number > 0
            assert frame.function_name is not None

    def test_get_kernel_info(self, kernel_interface):
        """Test getting kernel information."""
        info = kernel_interface.get_kernel_info()
        assert info["available"] is True
        assert info["status"] == "idle"
        assert info["language"] == "python"
        assert info["execution_count"] == 10
        assert info["namespace_size"] == 5  # x, y, df, arr, func (excluding _private)

        # Test without kernel
        kernel_interface.shell = None
        info = kernel_interface.get_kernel_info()
        assert info["available"] is False
        assert info["status"] == "not_connected"

    def test_preview_generation(self, kernel_interface):
        """Test preview generation for different types."""
        # Test long string preview
        kernel_interface.shell.user_ns["long_str"] = "a" * 200
        info = kernel_interface.get_variable_info("long_str")
        assert len(info.preview) <= 103  # 100 + "..."
        assert info.preview.endswith("...")

        # Test object without special handling
        kernel_interface.shell.user_ns["obj"] = object()
        info = kernel_interface.get_variable_info("obj")
        assert info.preview.startswith("<object")

    def test_variable_info_to_dict(self):
        """Test VariableInfo serialization."""
        var_info = VariableInfo(
            name="test",
            type="int",
            type_str="builtins.int",
            size=28,
            shape=None,
            preview="42",
            is_callable=False,
            attributes=["bit_length", "real", "imag"],
            last_modified=None,
        )

        data = var_info.to_dict()
        assert data["name"] == "test"
        assert data["type"] == "int"
        assert data["size"] == 28
        assert len(data["attributes"]) == 3

    def test_execution_result_to_dict(self):
        """Test ExecutionResult serialization."""
        result = ExecutionResult(
            success=True,
            execution_count=5,
            outputs=[{"type": "execute_result", "data": {"text/plain": "42"}}],
            execution_time=0.001,
            variables_changed=["x"],
        )

        data = result.to_dict()
        assert data["success"] is True
        assert data["execution_count"] == 5
        assert len(data["outputs"]) == 1
        assert data["variables_changed"] == ["x"]
        assert data["error"] is None


class TestKernelInterfaceWithoutIPython:
    """Test KernelInterface when IPython is not available."""

    def test_without_ipython(self):
        """Test behavior when IPython is not available."""
        with patch(
            "assistant_ui_anywidget.kernel_interface.get_ipython", return_value=None
        ):
            interface = KernelInterface()

            assert interface.is_available is False
            assert interface.get_namespace() == {}
            assert interface.get_variable_info("x") is None

            result = interface.execute_code("1 + 1")
            assert result.success is False
            assert result.error["type"] == "KernelError"
            assert "not available" in result.error["message"]

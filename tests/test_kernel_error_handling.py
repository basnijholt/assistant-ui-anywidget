"""Test kernel error handling, especially get_last_error edge cases."""

from unittest.mock import Mock

from assistant_ui_anywidget.kernel_interface import KernelContext, KernelInterface


def test_get_last_error_no_exception() -> None:
    """Test get_last_error when no exception exists."""
    kernel = KernelInterface()

    # Mock IPython shell
    kernel.shell = Mock()

    # Simulate _get_exc_info raising ValueError when no exception
    kernel.shell._get_exc_info.side_effect = ValueError("No exception to find")

    # Should return None instead of raising
    result = kernel.get_last_error()
    assert result is None


def test_get_last_error_attribute_error() -> None:
    """Test get_last_error with different IPython versions."""
    kernel = KernelInterface()

    # Mock IPython shell without _get_exc_info
    kernel.shell = Mock()
    del kernel.shell._get_exc_info  # Simulate missing method

    # Should return None instead of raising
    result = kernel.get_last_error()
    assert result is None


def test_get_last_error_no_kernel() -> None:
    """Test get_last_error when kernel is not available."""
    kernel = KernelInterface()
    kernel.shell = None

    result = kernel.get_last_error()
    assert result is None


def test_get_last_error_with_exception() -> None:
    """Test get_last_error when there is an actual exception."""
    kernel = KernelInterface()

    # Mock IPython shell
    kernel.shell = Mock()

    # Mock exception info
    class MockException(Exception):
        pass

    mock_exception = MockException("Test error")
    kernel.shell._get_exc_info.return_value = (MockException, mock_exception, None)

    # Mock _format_traceback
    kernel._format_traceback = Mock(return_value=["line 1", "line 2"])  # type: ignore

    result = kernel.get_last_error()
    assert result is not None
    assert result["type"] == "MockException"
    assert result["message"] == "Test error"
    assert result["traceback"] == ["line 1", "line 2"]


def test_agent_widget_context_no_kernel() -> None:
    """Test that _get_kernel_context handles missing kernel gracefully."""
    from assistant_ui_anywidget import AgentWidget

    widget = AgentWidget(show_help=False)

    # Should not raise even when kernel operations fail
    context = widget._get_kernel_context()
    assert isinstance(context, KernelContext)
    assert context.kernel_info is not None
    assert context.variables is not None

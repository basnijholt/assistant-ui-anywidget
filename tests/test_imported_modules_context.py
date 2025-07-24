"""Test that imported modules are included in kernel context."""

from unittest.mock import MagicMock
import sys

from assistant_ui_anywidget.kernel_interface import KernelInterface
from assistant_ui_anywidget.agent_widget import AgentWidget


class TestImportedModulesContext:
    """Test imported modules detection and context inclusion."""

    def test_get_imported_modules(self) -> None:
        """Test that get_imported_modules correctly identifies module types."""
        # Create a mock kernel
        mock_kernel = KernelInterface()

        # Mock the shell and namespace
        mock_shell = MagicMock()
        mock_kernel.shell = mock_shell

        # Import types to create proper module type
        from types import ModuleType

        # Create proper module objects for testing
        mock_numpy = ModuleType("numpy")
        mock_numpy.__file__ = (
            "/usr/local/lib/python3.11/site-packages/numpy/__init__.py"
        )

        mock_custom = ModuleType("mymodule")
        mock_custom.__file__ = "/home/user/project/mymodule.py"

        # Set up namespace with modules
        mock_namespace = {
            "np": mock_numpy,
            "mymodule": mock_custom,
            "sys": sys,  # Real sys module (builtin)
            "x": 42,  # Not a module
        }
        mock_shell.user_ns = mock_namespace

        # Test get_imported_modules
        imported = mock_kernel.get_imported_modules()

        # Verify results
        assert "np" in imported
        assert "external" in imported["np"]
        assert "numpy" in imported["np"]

        assert "mymodule" in imported
        assert "user" in imported["mymodule"]

        assert "sys" in imported
        assert "builtin" in imported["sys"]

        # Non-module objects should not be included
        assert "x" not in imported

    def test_kernel_context_includes_modules(self) -> None:
        """Test that KernelContext includes imported modules."""
        # Create widget
        widget = AgentWidget()

        # Replace kernel with a mock
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True
        mock_kernel.get_kernel_info.return_value = {
            "available": True,
            "status": "idle",
            "execution_count": 0,
            "namespace_size": 3,
        }
        mock_kernel.get_namespace.return_value = {
            "np": "module",
            "pd": "module",
            "x": 42,
        }
        mock_kernel.get_variable_info.return_value = None
        mock_kernel.get_notebook_state.return_value = MagicMock(cells=[])
        mock_kernel.get_last_error.return_value = None
        mock_kernel.get_imported_modules.return_value = {
            "np": "numpy (external)",
            "pd": "pandas (external)",
        }

        # Replace the kernel
        widget.kernel = mock_kernel

        # Get context
        context = widget._get_kernel_context()

        # Verify imported modules are in context
        assert context.imported_modules is not None
        assert "np" in context.imported_modules
        assert "pd" in context.imported_modules
        assert context.imported_modules["np"] == "numpy (external)"
        assert context.imported_modules["pd"] == "pandas (external)"

        # Verify to_dict includes modules
        context_dict = context.to_dict()
        assert "imported_modules" in context_dict
        assert context_dict["imported_modules"] == {
            "np": "numpy (external)",
            "pd": "pandas (external)",
        }

    def test_context_message_includes_modules(self) -> None:
        """Test that build_context_message includes imported modules."""
        from assistant_ui_anywidget.ai.langgraph_service import build_context_message
        from assistant_ui_anywidget.kernel_interface import KernelContext

        # Create context with modules
        context = KernelContext(
            kernel_info={"namespace_size": 5},
            variables=[],
            imported_modules={
                "np": "numpy (external)",
                "pd": "pandas (external)",
                "mymodule": "mymodule (user)",
            },
        )

        # Build message
        message = build_context_message(context)

        # Verify modules are included
        assert "IMPORTED MODULES:" in message
        assert "np: numpy (external)" in message
        assert "pd: pandas (external)" in message
        assert "mymodule: mymodule (user)" in message

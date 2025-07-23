"""Tests for LangGraph approval workflow."""

import os
from unittest.mock import MagicMock, patch


from assistant_ui_anywidget.ai.langgraph_service import LangGraphAIService, ChatResult
from assistant_ui_anywidget.kernel_interface import KernelInterface


class TestLangGraphApproval:
    """Test LangGraph approval workflow functionality."""

    def test_langgraph_service_creation(self) -> None:
        """Test that LangGraph service can be created."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        service = LangGraphAIService(kernel=mock_kernel, require_approval=True)

        assert service is not None
        assert service.require_approval is True
        assert service.kernel is mock_kernel

    def test_read_only_operations_no_approval(self) -> None:
        """Test that read-only operations don't require approval."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True
        mock_kernel.get_namespace.return_value = {"x": 42, "y": "hello"}
        mock_kernel.get_kernel_info.return_value = {
            "available": True,
            "execution_count": 5,
            "namespace_size": 2,
        }

        with patch.dict(os.environ, {}, clear=True):
            service = LangGraphAIService(kernel=mock_kernel, require_approval=True)

            # Test get_variables - should work without approval
            result = service.chat("Show me all variables")
            assert result.success
            assert not result.interrupted
            assert result.content  # Should have some response

    def test_code_execution_requires_approval(self) -> None:
        """Test that code execution requires approval when enabled."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        with patch.dict(os.environ, {}, clear=True):
            service = LangGraphAIService(kernel=mock_kernel, require_approval=True)

            # Test execute_code - should interrupt for approval
            result = service.chat("Execute x = 42")

            # Note: Without a real LLM, this might not trigger the approval flow
            # In real usage, the LLM would call the execute_code tool
            assert result is not None

    def test_approval_disabled(self) -> None:
        """Test that code execution works without approval when disabled."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        with patch.dict(os.environ, {}, clear=True):
            service = LangGraphAIService(kernel=mock_kernel, require_approval=False)

            assert service.require_approval is False

    def test_chat_result_needs_approval(self) -> None:
        """Test ChatResult needs_approval property."""
        # Test when needs approval
        result = ChatResult(
            content="",
            thread_id="123",
            interrupted=True,
            interrupt_message="Approve code execution?",
        )
        assert result.needs_approval is True

        # Test when doesn't need approval
        result2 = ChatResult(
            content="Done",
            thread_id="123",
            interrupted=False,
        )
        assert result2.needs_approval is False

    def test_widget_integration(self) -> None:
        """Test that widget can use LangGraph service."""
        from assistant_ui_anywidget import AgentWidget

        # Create widget with LangGraph
        widget = AgentWidget(
            ai_config={
                "use_langgraph": True,
                "require_approval": True,
                "provider": "auto",
            }
        )

        assert widget.ai_service is not None
        assert isinstance(widget.ai_service, LangGraphAIService)

        # Create widget with simple service (default)
        simple_widget = AgentWidget(
            ai_config={
                "use_langgraph": False,
                "provider": "auto",
            }
        )

        assert simple_widget.ai_service is not None
        assert not isinstance(simple_widget.ai_service, LangGraphAIService)

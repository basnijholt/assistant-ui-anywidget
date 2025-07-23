"""Regression tests for AI service issues."""

import os
from typing import Any
from unittest.mock import MagicMock, patch

from assistant_ui_anywidget.ai import AIService
from assistant_ui_anywidget.kernel_interface import KernelInterface


class TestAIServiceRegression:
    """Regression tests for AI service bugs."""

    def test_missing_model_argument_regression(self) -> None:
        """Test for bug: _init_chat_model_helper() missing 1 required positional argument: 'model'.

        This reproduces the error from ai_conversation_logs/conversation_20250723_115415.json
        where the AI service fails to initialize when no API keys are available and no model
        is explicitly specified.

        The bug occurs in the _init_llm method when:
        1. Some API keys are detected (but init_chat_model still fails)
        2. The code tries to call init_chat_model with model=None
        3. init_chat_model requires the model parameter but gets None
        """
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        # Setup: Mock init_chat_model to raise the exact error from the log
        def mock_init_chat_model_error(*args: Any, **kwargs: Any) -> MagicMock:
            # Simulate the exact error condition
            if kwargs.get("model") is None:
                raise TypeError(
                    "_init_chat_model_helper() missing 1 required positional argument: 'model'"
                )
            return MagicMock()

        # Create a scenario where we have API keys but init_chat_model fails
        with (
            patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True),
            patch("assistant_ui_anywidget.ai.simple_service.load_dotenv"),
            patch(
                "assistant_ui_anywidget.ai.simple_service.init_chat_model",
                side_effect=mock_init_chat_model_error,
            ),
        ):
            # This should NOT crash but should fall back to MockLLM when init_chat_model fails
            service = AIService(kernel=mock_kernel)

            # Verify it fell back to MockLLM after the init_chat_model error
            assert service.llm is not None
            # Should be MockLLM since init_chat_model failed
            assert "mock" in str(type(service.llm)).lower()

    def test_missing_model_argument_specific_case(self) -> None:
        """Test the specific case where model inference fails and model=None is passed."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        # Mock a scenario where we have keys but model inference fails
        def mock_init_chat_model_with_none_check(
            *args: Any, **kwargs: Any
        ) -> MagicMock:
            model = kwargs.get("model")
            if model is None:
                raise TypeError(
                    "_init_chat_model_helper() missing 1 required positional argument: 'model'"
                )
            return MagicMock()

        with (
            patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True),
            patch("assistant_ui_anywidget.ai.simple_service.load_dotenv"),
            patch(
                "assistant_ui_anywidget.ai.simple_service.init_chat_model",
                side_effect=mock_init_chat_model_with_none_check,
            ),
        ):
            # Force the condition where no model is provided and provider auto-detection has issues
            service = AIService(kernel=mock_kernel, model=None, provider="openai")

            # Should fall back to MockLLM due to our fix that prevents None model/provider
            assert service.llm is not None
            assert "mock" in str(type(service.llm)).lower()

    def test_none_model_and_provider_prevention(self) -> None:
        """Test that None model and provider are prevented from being passed to init_chat_model."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        # This should trigger the fix that prevents calling init_chat_model with None values
        with (
            patch.dict(os.environ, {}, clear=True),
            patch("assistant_ui_anywidget.ai.simple_service.load_dotenv"),
        ):
            # This should never call init_chat_model because both model and provider will be None
            with patch(
                "assistant_ui_anywidget.ai.simple_service.init_chat_model"
            ) as mock_init:
                service = AIService(kernel=mock_kernel, model=None, provider=None)

                # Should not have called init_chat_model at all
                mock_init.assert_not_called()

                # Should be using MockLLM
                assert service.llm is not None
                assert "mock" in str(type(service.llm)).lower()

    def test_auto_detection_with_single_provider(self) -> None:
        """Test auto-detection works correctly with a single API key."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        # Test with only OpenAI key
        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.simple_service.init_chat_model"
            ) as mock_init:
                mock_init.return_value = MagicMock()

                AIService(kernel=mock_kernel)

                # Should have called init_chat_model with model and provider
                mock_init.assert_called_once()
                call_args = mock_init.call_args
                assert call_args.kwargs["model"] is not None
                assert call_args.kwargs["model_provider"] is not None

    def test_explicit_model_without_provider(self) -> None:
        """Test specifying model without provider should infer provider correctly."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.simple_service.init_chat_model"
            ) as mock_init:
                mock_init.return_value = MagicMock()

                # Should infer openai provider from gpt model name
                AIService(kernel=mock_kernel, model="gpt-4")

                mock_init.assert_called_once()
                call_args = mock_init.call_args
                assert call_args.kwargs["model"] == "gpt-4"
                assert call_args.kwargs["model_provider"] == "openai"

    def test_no_api_keys_fallback_to_mock(self) -> None:
        """Test that when no API keys are available, it falls back to MockLLM."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        # Clear all environment variables and prevent .env loading
        with (
            patch.dict(os.environ, {}, clear=True),
            patch("assistant_ui_anywidget.ai.simple_service.load_dotenv"),
        ):
            service = AIService(kernel=mock_kernel)

            # Should have fallen back to MockLLM
            assert service.llm is not None
            # MockLLM should be identifiable
            assert (
                hasattr(service.llm, "_llm_type")
                or "mock" in str(type(service.llm)).lower()
            )

    def test_chat_with_no_api_keys_should_not_crash(self) -> None:
        """Test that chat operations work even with no API keys (using MockLLM)."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True
        mock_kernel.get_kernel_info.return_value = {
            "available": True,
            "status": "idle",
            "language": "python",
            "execution_count": 0,
            "namespace_size": 0,
        }
        mock_kernel.get_namespace.return_value = {}

        with (
            patch.dict(os.environ, {}, clear=True),
            patch("assistant_ui_anywidget.ai.simple_service.load_dotenv"),
        ):
            service = AIService(kernel=mock_kernel)

            # This should not crash and should return a response
            result = service.chat("hi")

            assert result is not None
            assert hasattr(result, "content")
            assert hasattr(result, "success")
            assert result.success is True
            assert result.content  # Should have some response content

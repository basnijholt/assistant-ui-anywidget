"""Test auto-detection functionality in global agent."""

import os
from unittest.mock import MagicMock, patch

from assistant_ui_anywidget import get_agent, reset_agent


class TestGlobalAgentAutoDetection:
    """Test that get_agent() correctly handles automatic provider detection."""

    def setup_method(self) -> None:
        """Reset the global agent before each test."""
        reset_agent()

    def test_get_agent_auto_detection_with_openai_key(self) -> None:
        """Test that get_agent() auto-detects OpenAI when API key is available."""
        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.langgraph_service.init_chat_model"
            ) as mock_init:
                mock_init.return_value = MagicMock()

                # get_agent() should auto-detect OpenAI
                get_agent()

                # Should have called init_chat_model with OpenAI provider
                mock_init.assert_called_once()
                call_args = mock_init.call_args
                assert call_args.kwargs["model"] == "gpt-4o-mini"
                assert call_args.kwargs["model_provider"] == "openai"

    def test_get_agent_auto_detection_with_google_key(self) -> None:
        """Test that get_agent() auto-detects Google when API key is available."""
        with patch.dict(os.environ, {"GOOGLE_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.langgraph_service.init_chat_model"
            ) as mock_init:
                mock_init.return_value = MagicMock()

                get_agent()

                # Should have called init_chat_model with Google provider
                mock_init.assert_called_once()
                call_args = mock_init.call_args
                assert call_args.kwargs["model"] == "gemini-1.5-flash"
                assert call_args.kwargs["model_provider"] == "google_genai"

    def test_get_agent_auto_detection_with_explicit_provider(self) -> None:
        """Test that explicit provider overrides auto-detection."""
        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.langgraph_service.init_chat_model"
            ) as mock_init:
                mock_init.return_value = MagicMock()

                # Override auto-detection with explicit provider
                get_agent(ai_config={"provider": "openai", "model": "gpt-3.5-turbo"})

                mock_init.assert_called_once()
                call_args = mock_init.call_args
                assert call_args.kwargs["model"] == "gpt-3.5-turbo"
                assert call_args.kwargs["model_provider"] == "openai"

    def test_get_agent_auto_detection_no_keys_fallback(self) -> None:
        """Test that get_agent() falls back to MockLLM when no API keys available."""
        # Clear all API keys to ensure fallback to mock
        with patch.dict(os.environ, {}, clear=True):
            with patch("assistant_ui_anywidget.ai.langgraph_service.load_dotenv"):
                agent = get_agent()

                # Should be using MockLLM
                assert agent.ai_service is not None
                assert agent.ai_service.llm is not None
                assert "mock" in str(type(agent.ai_service.llm)).lower()

    def test_get_agent_model_inference_with_auto_provider(self) -> None:
        """Test that get_agent() infers provider from model name when provider is auto."""
        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.langgraph_service.init_chat_model"
            ) as mock_init:
                mock_init.return_value = MagicMock()

                # Specify model but keep provider as auto
                get_agent(ai_config={"model": "gpt-3.5-turbo"})

                mock_init.assert_called_once()
                call_args = mock_init.call_args
                assert call_args.kwargs["model"] == "gpt-3.5-turbo"
                assert call_args.kwargs["model_provider"] == "openai"

    def test_get_agent_prefers_openai_when_multiple_keys(self) -> None:
        """Test that get_agent() prefers OpenAI when multiple API keys are available."""
        with patch.dict(
            os.environ,
            {"OPENAI_API_KEY": "test-key", "GOOGLE_API_KEY": "test-key2"},
            clear=True,
        ):
            with patch(
                "assistant_ui_anywidget.ai.langgraph_service.init_chat_model"
            ) as mock_init:
                mock_init.return_value = MagicMock()

                get_agent()

                # Should prefer OpenAI (first in the list)
                mock_init.assert_called_once()
                call_args = mock_init.call_args
                assert call_args.kwargs["model"] == "gpt-4o-mini"
                assert call_args.kwargs["model_provider"] == "openai"

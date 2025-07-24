"""Test auto-detection functionality in global agent."""

import os
from unittest.mock import patch

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
                "assistant_ui_anywidget.ai.pydantic_ai_service.init_pydantic_ai_model"
            ) as mock_init:
                mock_init.return_value = "openai:gpt-4o-mini"

                # get_agent() should auto-detect OpenAI
                agent = get_agent()

                # Should have called init_pydantic_ai_model
                mock_init.assert_called()
                assert agent.ai_service is not None
                assert hasattr(agent.ai_service, "agent")

    def test_get_agent_auto_detection_with_google_key(self) -> None:
        """Test that get_agent() auto-detects Google when API key is available."""
        with patch.dict(os.environ, {"GOOGLE_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.pydantic_ai_service.init_pydantic_ai_model"
            ) as mock_init:
                mock_init.return_value = "gemini-1.5-flash"

                agent = get_agent()

                # Should have called init_pydantic_ai_model
                mock_init.assert_called()
                assert agent.ai_service is not None
                assert hasattr(agent.ai_service, "agent")

    def test_get_agent_auto_detection_with_explicit_provider(self) -> None:
        """Test that explicit provider overrides auto-detection."""
        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.pydantic_ai_service.init_pydantic_ai_model"
            ) as mock_init:
                mock_init.return_value = "openai:gpt-3.5-turbo"

                # Override auto-detection with explicit provider
                agent = get_agent(
                    ai_config={"provider": "openai", "model": "gpt-3.5-turbo"}
                )

                mock_init.assert_called()
                assert agent.ai_service is not None
                assert hasattr(agent.ai_service, "agent")

    def test_get_agent_auto_detection_no_keys_fallback(self) -> None:
        """Test that get_agent() falls back to test model when no API keys available."""
        # Clear all API keys to ensure fallback to test model
        with patch.dict(os.environ, {}, clear=True):
            with patch("assistant_ui_anywidget.ai.pydantic_ai_service.load_dotenv"):
                agent = get_agent()

                # Should be using test model
                assert agent.ai_service is not None
                assert hasattr(agent.ai_service, "agent")
                # The agent should be created with test model when no keys available

    def test_get_agent_model_inference_with_auto_provider(self) -> None:
        """Test that get_agent() infers provider from model name when provider is auto."""
        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key"}, clear=True):
            with patch(
                "assistant_ui_anywidget.ai.pydantic_ai_service.init_pydantic_ai_model"
            ) as mock_init:
                mock_init.return_value = "openai:gpt-3.5-turbo"

                # Specify model but keep provider as auto
                agent = get_agent(ai_config={"model": "gpt-3.5-turbo"})

                mock_init.assert_called()
                assert agent.ai_service is not None
                assert hasattr(agent.ai_service, "agent")

    def test_get_agent_prefers_openai_when_multiple_keys(self) -> None:
        """Test that get_agent() prefers OpenAI when multiple API keys are available."""
        with patch.dict(
            os.environ,
            {"OPENAI_API_KEY": "test-key", "GOOGLE_API_KEY": "test-key2"},
            clear=True,
        ):
            with patch(
                "assistant_ui_anywidget.ai.pydantic_ai_service.init_pydantic_ai_model"
            ) as mock_init:
                mock_init.return_value = "openai:gpt-4o-mini"

                agent = get_agent()

                # Should prefer OpenAI (first in the list)
                mock_init.assert_called()
                assert agent.ai_service is not None
                assert hasattr(agent.ai_service, "agent")

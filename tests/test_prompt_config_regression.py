"""Regression tests for system prompt configuration loading."""

from unittest.mock import patch, MagicMock

from assistant_ui_anywidget.ai.prompt_config import SystemPromptConfig
from assistant_ui_anywidget.ai.langgraph_service import LangGraphAIService
from assistant_ui_anywidget.kernel_interface import KernelInterface


class TestPromptConfigRegression:
    """Test for system prompt configuration loading issues."""

    def test_pydantic_settings_yaml_loading_fixed(self) -> None:
        """Test that YAML loading works correctly with our fix.

        The issue was that pydantic-settings doesn't automatically load YAML files.
        We fixed it by using YamlConfigSettingsSource.
        """
        # This should now work without errors
        config = SystemPromptConfig()

        # Verify all fields are loaded
        assert config.approval_note
        assert config.main_prompt
        assert config.slash_commands
        assert config.examples_of_proactive_behavior
        assert config.scientific_computing_awareness
        assert config.final_reminder

        # Test get_full_prompt method
        full_prompt = config.get_full_prompt(require_approval=True)
        assert "TOOL USAGE - BE EXTREMELY EAGER!" in full_prompt
        assert "You are an **EXTREMELY PROACTIVE** AI assistant" in full_prompt

    def test_langgraph_service_initialization_works(self) -> None:
        """Test that LangGraphAIService initializes correctly with fixed prompt config."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        # This should work now
        service = LangGraphAIService(kernel=mock_kernel)
        assert service is not None
        assert service.require_approval is True

    def test_chat_works_with_fixed_prompt_config(self) -> None:
        """Test that chat operations work correctly with the fixed prompt config."""
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

        # Create service (this should work)
        service = LangGraphAIService(kernel=mock_kernel)

        # Chat should work and include the system prompt
        result = service.chat("hi")

        # Should return a successful result
        assert result.success
        assert result.content
        assert result.thread_id

    def test_system_prompt_included_in_messages(self) -> None:
        """Test that the system prompt is correctly included in chat messages."""
        mock_kernel = MagicMock(spec=KernelInterface)
        mock_kernel.is_available = True

        # Mock the agent to capture messages
        with patch(
            "assistant_ui_anywidget.ai.langgraph_service.create_agent_graph"
        ) as mock_create:
            mock_agent = MagicMock()
            captured_messages = []

            def capture_invoke(payload: dict, config: dict) -> dict:
                captured_messages.extend(payload.get("messages", []))
                return {"messages": []}

            mock_agent.invoke = capture_invoke
            mock_create.return_value = mock_agent

            service = LangGraphAIService(kernel=mock_kernel)
            service.chat("test message")

            # Verify system message is included
            assert len(captured_messages) >= 2
            system_msg = captured_messages[0]
            assert system_msg.content
            assert "EXTREMELY PROACTIVE" in system_msg.content
            assert "TOOL USAGE - BE EXTREMELY EAGER!" in system_msg.content

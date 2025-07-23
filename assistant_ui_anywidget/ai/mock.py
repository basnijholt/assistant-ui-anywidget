"""Mock LLM for testing and when no API is configured."""

from typing import Any, List, Optional, Sequence, Union
from langchain_core.language_models import BaseChatModel
from langchain_core.messages import AIMessage, BaseMessage
from langchain_core.outputs import ChatResult, ChatGeneration
from langchain_core.callbacks import CallbackManagerForLLMRun
from langchain_core.tools import BaseTool
from langchain_core.runnables import Runnable


class MockLLM(BaseChatModel):
    """Mock LLM that provides helpful responses without calling an API."""

    @property
    def _llm_type(self) -> str:
        """Return identifier of llm type."""
        return "mock"

    def _generate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ) -> ChatResult:
        """Generate a mock response."""
        # Get the last user message
        last_message = ""
        for msg in reversed(messages):
            if msg.type == "human":
                last_message = msg.content
                break

        # Generate a helpful response
        response = self._get_mock_response(last_message)

        message = AIMessage(content=response)
        generation = ChatGeneration(message=message)

        return ChatResult(generations=[generation])

    def _get_mock_response(self, message: str) -> str:
        """Generate a mock response based on the message."""
        message_lower = message.lower()

        if any(greeting in message_lower for greeting in ["hello", "hi", "hey"]):
            return (
                "Hello! I'm a mock AI assistant. While I can't provide intelligent responses, "
                "I can help demonstrate the kernel integration features.\n\n"
                "To use a real AI, please:\n"
                "1. Install an AI provider: `pip install openai anthropic google-generativeai`\n"
                "2. Set your API key: `export OPENAI_API_KEY='your-key'`\n\n"
                "Try asking me to show variables or execute code!"
            )

        elif "variable" in message_lower or "namespace" in message_lower:
            return (
                "I can help you explore variables! While I'm just a mock AI, "
                "I have access to kernel tools. Try these:\n\n"
                "- Ask me to 'list all variables'\n"
                "- Ask me to 'inspect df' (if you have a DataFrame named df)\n"
                "- Ask me to 'show the type of x' (for any variable x)\n\n"
                "I'll use the appropriate tools to get real information from your kernel!"
            )

        elif (
            "execute" in message_lower
            or "run" in message_lower
            or "calculate" in message_lower
        ):
            return (
                "I can execute code in your kernel! For example:\n\n"
                "- 'Calculate 2 + 2'\n"
                "- 'Create a variable x with value 42'\n"
                "- 'Import numpy as np'\n\n"
                "Note: As a mock AI, I'll execute simple requests but won't provide "
                "intelligent code generation. Install a real AI provider for that!"
            )

        elif "help" in message_lower:
            return (
                "I'm a mock AI assistant with kernel access. Here's what I can do:\n\n"
                "**Kernel Tools:**\n"
                "- List variables: 'Show me all variables'\n"
                "- Inspect data: 'What's in the variable df?'\n"
                "- Execute code: 'Calculate the mean of [1, 2, 3]'\n"
                "- Kernel info: 'What's the kernel status?'\n\n"
                "**To use a real AI:**\n"
                "1. `pip install langchain-openai` (or anthropic, google-genai)\n"
                "2. Set API key: `export OPENAI_API_KEY='your-key'`\n"
                "3. Restart the kernel\n\n"
                "Even as a mock, I have real access to your kernel!"
            )

        elif any(
            word in message_lower for word in ["error", "debug", "problem", "issue"]
        ):
            return (
                "I can help you debug! While I'm a mock AI, I can:\n\n"
                "- Check your variables: 'Show me all variables'\n"
                "- Inspect specific data: 'What's the type of my_var?'\n"
                "- Look at error details: 'Show me the last error'\n\n"
                "For intelligent debugging assistance, please set up a real AI provider."
            )

        else:
            return (
                f"I understood: '{message}'\n\n"
                "As a mock AI, I can't provide intelligent responses, but I can:\n"
                "- List your variables\n"
                "- Inspect specific data\n"
                "- Execute simple code\n"
                "- Show kernel information\n\n"
                "For better assistance, please configure an AI provider with an API key."
            )

    def bind_tools(
        self,
        tools: Sequence[Union[BaseTool, type[BaseTool], dict]],
        **kwargs: Any,
    ) -> Runnable[Any, Any]:
        """Bind tools to the model for compatibility."""
        # Return self since mock doesn't actually use tools
        return self

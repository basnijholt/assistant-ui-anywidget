#!/usr/bin/env python3
"""
Real AI Integration Test Script

This script tests the assistant-ui-anywidget with actual AI providers to catch
integration issues that mock tests might miss. It uses cheap models by default
(Gemini 2.5 Flash) to keep costs low.

Usage:
    python test_real_ai_integration.py

Environment variables (loaded from .env):
    GOOGLE_API_KEY - for Gemini models (default)
    OPENAI_API_KEY - for OpenAI models
    ANTHROPIC_API_KEY - for Claude models
"""

import logging
import os
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional

from dotenv import load_dotenv

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from assistant_ui_anywidget.kernel_interface import KernelInterface
from assistant_ui_anywidget.ai.pydantic_ai_service import PydanticAIService
from assistant_ui_anywidget.agent_widget import AgentWidget
from assistant_ui_anywidget.kernel_interface import AIConfig

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class RealAIIntegrationTest:
    """Test class for real AI integration testing."""

    def __init__(self, model: str = "gemini-2.5-flash", provider: str = "google_genai"):
        """Initialize test with specified model and provider."""
        self.model = model
        self.provider = provider
        self.kernel = KernelInterface()
        self.test_results: List[Dict[str, any]] = []

        # Check if required API key is available
        self._check_api_key()

        logger.info(f"Initializing test with model: {model}, provider: {provider}")

    def _check_api_key(self):
        """Check if the required API key is available."""
        key_map = {
            "google_genai": "GOOGLE_API_KEY",
            "openai": "OPENAI_API_KEY",
            "anthropic": "ANTHROPIC_API_KEY",
        }

        required_key = key_map.get(self.provider)
        if not required_key or not os.getenv(required_key):
            available_keys = [k for k, v in key_map.items() if os.getenv(v)]
            if available_keys:
                # Fall back to first available provider
                fallback_provider = available_keys[0]
                fallback_models = {
                    "google_genai": "gemini-2.5-flash",
                    "openai": "gpt-4o-mini",
                    "anthropic": "claude-3-haiku-20240307",
                }
                self.provider = fallback_provider
                self.model = fallback_models[fallback_provider]
                logger.warning(
                    f"API key for {required_key} not found. Using {self.provider} with {self.model}"
                )
            else:
                raise ValueError(
                    f"No API keys found. Please set one of: {list(key_map.values())}"
                )

    def _record_test(
        self,
        test_name: str,
        success: bool,
        details: str = "",
        error: Optional[str] = None,
    ):
        """Record test result."""
        result = {
            "test_name": test_name,
            "success": success,
            "details": details,
            "error": error,
            "timestamp": time.time(),
        }
        self.test_results.append(result)

        status = "✅ PASS" if success else "❌ FAIL"
        logger.info(f"{status} - {test_name}: {details}")
        if error:
            logger.error(f"Error details: {error}")

    def test_basic_ai_service_creation(self):
        """Test that AI service can be created successfully."""
        try:
            ai_service = PydanticAIService(
                kernel=self.kernel,
                model=self.model,
                provider=self.provider,
                require_approval=True,
            )
            self._record_test(
                "Basic AI Service Creation",
                True,
                f"Successfully created PydanticAIService with {self.model}",
            )
            return ai_service
        except Exception as e:
            self._record_test(
                "Basic AI Service Creation",
                False,
                f"Failed to create AI service with {self.model}",
                str(e),
            )
            return None

    def test_simple_chat_interaction(self, ai_service: PydanticAIService):
        """Test basic chat interaction without tools."""
        try:
            result = ai_service.chat("Hello! Can you tell me what 2+2 equals?")

            success = (
                result.success
                and result.content
                and len(result.content.strip()) > 0
                and not result.interrupted
            )

            self._record_test(
                "Simple Chat Interaction",
                success,
                f"Got response: {result.content[:100]}..."
                if result.content
                else "No content",
                result.error if not success else None,
            )
            return success
        except Exception as e:
            self._record_test(
                "Simple Chat Interaction", False, "Exception during basic chat", str(e)
            )
            return False

    def test_kernel_info_tool(self, ai_service: PydanticAIService):
        """Test kernel info tool usage."""
        try:
            result = ai_service.chat("Can you check the kernel status for me?")

            success = (
                result.success
                and result.content
                and (
                    "kernel" in result.content.lower()
                    or "available" in result.content.lower()
                )
            )

            self._record_test(
                "Kernel Info Tool",
                success,
                f"Tool usage result: {result.content[:100]}..."
                if result.content
                else "No content",
                result.error if not success else None,
            )
            return success
        except Exception as e:
            self._record_test(
                "Kernel Info Tool",
                False,
                "Exception during kernel info tool test",
                str(e),
            )
            return False

    def test_code_execution_approval_workflow(self, ai_service: PydanticAIService):
        """Test the code execution approval workflow - the critical test."""
        try:
            # Step 1: Request code execution
            logger.info(
                "Step 1: Requesting code execution that should trigger approval"
            )
            result1 = ai_service.chat(
                "Please execute this Python code: x = 5 + 3; print(f'Result: {x}')"
            )

            if not result1.interrupted:
                self._record_test(
                    "Code Execution Approval - Interrupt",
                    False,
                    "Code execution should have triggered approval interrupt",
                    "No interrupt triggered",
                )
                return False

            logger.info(
                f"Step 1 Success: Approval interrupt triggered. Thread ID: {result1.thread_id}"
            )

            # Step 2: Test approval with "Approve" string
            logger.info("Step 2: Testing approval with 'Approve' string")
            result2 = ai_service.chat("Approve", thread_id=result1.thread_id)

            approval_success = (
                result2.success
                and not result2.error
                and result2.content  # Should have execution results
            )

            if not approval_success:
                self._record_test(
                    "Code Execution Approval - Approve",
                    False,
                    f"Approval failed. Error: {result2.error}",
                    result2.error,
                )
                return False

            logger.info(
                f"Step 2 Success: Approval worked. Content: {result2.content[:100]}..."
            )

            # Step 3: Test denial workflow with new thread (this should also work)
            logger.info("Step 3: Testing denial workflow with new thread")
            result3 = ai_service.chat("Execute: y = 10 * 2; print(y)")

            if result3.interrupted:
                logger.info("Step 3a: New approval interrupt triggered")
                result4 = ai_service.chat("Deny", thread_id=result3.thread_id)

                denial_success = result4.success and not result4.error

                if not denial_success:
                    self._record_test(
                        "Code Execution Approval - Deny",
                        False,
                        f"Denial failed. Error: {result4.error}",
                        result4.error,
                    )
                    return False

                logger.info("Step 3 Success: Denial workflow worked")

            self._record_test(
                "Code Execution Approval Workflow",
                True,
                "Full approval workflow (interrupt → approve → deny) completed successfully",
            )
            return True

        except Exception as e:
            self._record_test(
                "Code Execution Approval Workflow",
                False,
                "Exception during approval workflow test",
                str(e),
            )
            return False

    def test_widget_integration(self):
        """Test widget integration with real AI."""
        try:
            # Create widget with AI config
            ai_config = AIConfig(
                model=self.model, provider=self.provider, require_approval=True
            )

            widget = AgentWidget(ai_config=ai_config)

            # Test basic message handling
            test_message = "What is the capital of France?"
            widget._handle_user_message(test_message)

            # Check if message was added to chat history
            chat_history = widget.get_chat_history()
            user_message_found = any(
                msg.get("role") == "user" and msg.get("content") == test_message
                for msg in chat_history
            )

            # Check if AI response was generated
            ai_response_found = any(
                msg.get("role") == "assistant" and msg.get("content")
                for msg in chat_history
            )

            success = user_message_found and ai_response_found

            self._record_test(
                "Widget Integration",
                success,
                f"Chat history entries: {len(chat_history)}, AI response: {ai_response_found}",
                None if success else "Failed to generate proper chat interaction",
            )
            return success

        except Exception as e:
            self._record_test(
                "Widget Integration",
                False,
                "Exception during widget integration test",
                str(e),
            )
            return False

    def test_memory_persistence(self, ai_service: PydanticAIService):
        """Test that the AI remembers information from previous turns in the conversation."""
        try:
            # Use a consistent thread ID to maintain conversation context
            thread_id = "memory_test_thread"
            
            # First interaction - provide name
            logger.info("Step 1: Providing name to AI")
            result1 = ai_service.chat("Hello! My name is John Smith.", thread_id=thread_id)
            
            if not result1.success or not result1.content:
                self._record_test(
                    "Memory Persistence - Initial",
                    False,
                    "Failed to establish initial conversation",
                    result1.error,
                )
                return False
            
            logger.info(f"Step 1 Success: {result1.content[:100]}...")
            
            # Second interaction - ask for name (should remember)
            logger.info("Step 2: Asking AI to recall the name")
            result2 = ai_service.chat("What is my name?", thread_id=thread_id)
            
            name_remembered = (
                result2.success 
                and result2.content 
                and ("John" in result2.content or "Smith" in result2.content)
            )
            
            if not name_remembered:
                self._record_test(
                    "Memory Persistence - Name Recall",
                    False,
                    f"AI should remember the name John Smith but responded: {result2.content[:200]}",
                    result2.error,
                )
                return False
                
            logger.info(f"Step 2 Success: AI remembered name - {result2.content[:100]}...")
            
            # Third interaction - provide additional information
            logger.info("Step 3: Providing job information")
            result3 = ai_service.chat("I work as a software engineer.", thread_id=thread_id)
            
            if not result3.success:
                self._record_test(
                    "Memory Persistence - Additional Info",
                    False,
                    "Failed to provide additional information",
                    result3.error,
                )
                return False
                
            logger.info(f"Step 3 Success: {result3.content[:100]}...")
            
            # Fourth interaction - ask about both pieces of information
            logger.info("Step 4: Asking AI to recall both name and job")
            result4 = ai_service.chat("Can you tell me my name and job?", thread_id=thread_id)
            
            full_memory_success = (
                result4.success 
                and result4.content
                and ("John" in result4.content or "Smith" in result4.content)
                and ("engineer" in result4.content.lower() or "software" in result4.content.lower())
            )
            
            if not full_memory_success:
                self._record_test(
                    "Memory Persistence - Full Recall",
                    False,
                    f"AI should remember both name and job but responded: {result4.content[:200]}",
                    result4.error,
                )
                return False
                
            logger.info(f"Step 4 Success: AI remembered both name and job - {result4.content[:100]}...")
            
            self._record_test(
                "Memory Persistence",
                True,
                "AI successfully remembered information across multiple conversation turns",
            )
            return True
            
        except Exception as e:
            self._record_test(
                "Memory Persistence",
                False,
                "Exception during memory persistence test",
                str(e),
            )
            return False

    def test_error_handling(self, ai_service: PydanticAIService):
        """Test error handling with malformed requests."""
        try:
            # Test with a very long message that might cause issues
            long_message = "Please help me with this: " + "x" * 10000
            result = ai_service.chat(long_message)

            # Should either succeed gracefully or fail gracefully
            graceful_handling = result.success or (
                result.error and not result.interrupted
            )

            self._record_test(
                "Error Handling",
                graceful_handling,
                f"Long message handled gracefully: success={result.success}, error={bool(result.error)}",
            )
            return graceful_handling

        except Exception as e:
            # Even exceptions should be caught and handled gracefully
            self._record_test(
                "Error Handling",
                False,
                "Unhandled exception during error handling test",
                str(e),
            )
            return False

    def run_all_tests(self):
        """Run all integration tests."""
        logger.info("=" * 60)
        logger.info("STARTING REAL AI INTEGRATION TESTS")
        logger.info(f"Model: {self.model}, Provider: {self.provider}")
        logger.info("=" * 60)

        # Test 1: Basic service creation
        ai_service = self.test_basic_ai_service_creation()
        if not ai_service:
            logger.error("Cannot continue tests without AI service")
            return self._print_summary()

        # Test 2: Simple chat
        self.test_simple_chat_interaction(ai_service)

        # Test 3: Tool usage
        self.test_kernel_info_tool(ai_service)

        # Test 4: Critical approval workflow test
        self.test_code_execution_approval_workflow(ai_service)

        # Test 5: Memory persistence (CRITICAL TEST for the new issue)
        self.test_memory_persistence(ai_service)

        # Test 6: Widget integration
        self.test_widget_integration()

        # Test 7: Error handling
        self.test_error_handling(ai_service)

        return self._print_summary()

    def _print_summary(self):
        """Print test summary and return overall success."""
        logger.info("=" * 60)
        logger.info("TEST SUMMARY")
        logger.info("=" * 60)

        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)

        for result in self.test_results:
            status = "✅ PASS" if result["success"] else "❌ FAIL"
            logger.info(f"{status} {result['test_name']}")
            if not result["success"] and result["error"]:
                logger.info(f"    Error: {result['error']}")

        success_rate = (passed / total * 100) if total > 0 else 0
        logger.info("-" * 60)
        logger.info(f"OVERALL: {passed}/{total} tests passed ({success_rate:.1f}%)")

        if success_rate >= 80:
            logger.info("🎉 Tests mostly successful!")
            return True
        elif success_rate >= 60:
            logger.warning("⚠️  Some tests failed - needs attention")
            return False
        else:
            logger.error("💥 Many tests failed - critical issues need fixing")
            return False


def main():
    """Main test function."""
    # Allow model override via environment variable or command line
    model = os.getenv("TEST_AI_MODEL", "gemini-2.5-flash")
    provider = os.getenv("TEST_AI_PROVIDER", "google_genai")

    if len(sys.argv) > 1:
        model = sys.argv[1]
    if len(sys.argv) > 2:
        provider = sys.argv[2]

    try:
        tester = RealAIIntegrationTest(model=model, provider=provider)
        success = tester.run_all_tests()

        # Exit with appropriate code
        sys.exit(0 if success else 1)

    except Exception as e:
        logger.error(f"Critical test failure: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

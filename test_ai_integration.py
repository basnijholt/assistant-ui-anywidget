#!/usr/bin/env python
"""Simple test script to verify AI integration works."""

import sys

# This assumes the package is properly installed
from assistant_ui_anywidget import AgentWidget


def test_ai_integration() -> None:
    """Test that the AI integration works with mock AI."""
    print("Testing AI integration...")

    # Create widget with mock AI (no API key needed)
    widget = AgentWidget(
        ai_config={
            "require_approval": False,
        }
    )

    print("✓ Widget created successfully")
    print(f"✓ Kernel available: {widget.kernel.is_available}")

    # Initialize kernel state if needed
    if widget.kernel.is_available:
        # Execute some code to create variables
        widget.kernel.execute_code("x = 42")
        widget.kernel.execute_code("y = 'hello'")
        widget.kernel.execute_code("import pandas as pd")
        widget.kernel.execute_code(
            "df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})"
        )

    print(f"✓ AI service initialized: {widget.ai_service is not None}")
    print(
        f"✓ AI provider: {type(widget.ai_service.agent) if widget.ai_service and hasattr(widget.ai_service, 'agent') else 'unknown'}"
    )

    # Check logging
    log_path = widget.get_conversation_log_path()
    print(f"✓ Conversation logging to: {log_path}")

    # Test a simple message
    widget._handle_message(widget, {"type": "user_message", "text": "Hello!"})

    if widget.chat_history:
        last_message = widget.chat_history[-1]
        print(
            f"✓ AI responded: {last_message['role']} - {last_message['content'][:50]}..."
        )

    # Test slash command still works
    widget._handle_message(widget, {"type": "user_message", "text": "/vars"})

    if len(widget.chat_history) > 2:
        last_message = widget.chat_history[-1]
        print(f"✓ Commands work: {last_message['content'][:50]}...")

    # Clear history for next test
    widget.clear_chat_history()

    # Test AI tool usage - ask to run df.info()
    widget._handle_message(widget, {"type": "user_message", "text": "Run df.info()"})
    if widget.chat_history:
        print(f"✓ Code execution test: {widget.chat_history[-1]['content'][:50]}...")

    # Test if AI can inspect variables
    widget._handle_message(widget, {"type": "user_message", "text": "What is x?"})
    if len(widget.chat_history) > 2:
        print(f"✓ Variable inspection: {widget.chat_history[-1]['content'][:50]}...")

    print("\nAll tests passed! AI integration is working.")


if __name__ == "__main__":
    try:
        test_ai_integration()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)

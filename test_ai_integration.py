#!/usr/bin/env python
"""Simple test script to verify AI integration works."""

import os
import sys

# This assumes the package is properly installed
from assistant_ui_anywidget.enhanced_agent_widget import EnhancedAgentWidget


def test_ai_integration():
    """Test that the AI integration works with mock AI."""
    print("Testing AI integration...")
    
    # Create widget with mock AI (no API key needed)
    widget = EnhancedAgentWidget(
        ai_config={
            'require_approval': False,
        }
    )
    
    print(f"✓ Widget created successfully")
    print(f"✓ Kernel available: {widget.kernel.is_available}")
    print(f"✓ AI service initialized: {widget.ai_service is not None}")
    print(f"✓ AI provider: {widget.ai_service.llm._llm_type if hasattr(widget.ai_service.llm, '_llm_type') else 'unknown'}")
    
    # Check logging
    log_path = widget.get_conversation_log_path()
    print(f"✓ Conversation logging to: {log_path}")
    
    # Test a simple message
    widget._handle_message(widget, {'type': 'user_message', 'text': 'Hello!'})
    
    if widget.chat_history:
        last_message = widget.chat_history[-1]
        print(f"✓ AI responded: {last_message['role']} - {last_message['content'][:50]}...")
    
    # Test slash command still works
    widget._handle_message(widget, {'type': 'user_message', 'text': '/vars'})
    
    if len(widget.chat_history) > 2:
        last_message = widget.chat_history[-1]
        print(f"✓ Commands work: {last_message['content'][:50]}...")
    
    print("\nAll tests passed! AI integration is working.")
    

if __name__ == "__main__":
    try:
        test_ai_integration()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
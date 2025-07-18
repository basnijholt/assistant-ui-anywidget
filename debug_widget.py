#!/usr/bin/env python3
"""Debug widget to help understand the UI synchronization issue."""

import sys
import time

sys.path.insert(0, "python")

from agent_widget import AgentWidget

# Create a widget for debugging
widget = AgentWidget()

print("🔍 DEBUG WIDGET CREATED")
print("=" * 50)
print("Now run this in Jupyter:")
print()
print("1. Display the widget:")
print("   widget")
print()
print("2. Check the debug output in the browser console (F12)")
print()
print("3. Try these operations and observe the debug output:")
print()
print("   # Set initial history")
print("   widget.chat_history = [")
print("       {'role': 'user', 'content': 'Test message 1'},")
print("       {'role': 'assistant', 'content': 'Response 1'}")
print("   ]")
print()
print("   # Check what's displayed")
print("   print(f'Python side: {widget.chat_history}')")
print()
print("   # Try typing in the UI and check:")
print("   # - Does the console show 'Chat history changed, forcing re-render'?")
print("   # - Does the debug info at the bottom update?")
print("   # - Are messages visible in the UI?")
print()
print("   # Test clearing")
print("   widget.chat_history = []")
print("   print(f'After clear: {widget.chat_history}')")
print()
print("4. Report back what you see in the console and UI!")
print()
print("The widget has debug logging enabled, so you'll see:")
print("- 'Chat history changed, forcing re-render' when sync happens")
print("- Current chat history state")
print("- Messages to display")
print("- Raw chatHistory value")
print()
print("This will help us understand exactly where the synchronization breaks.")

# Make widget available globally
globals()["widget"] = widget


# Also create a simple test function
def test_sync():
    """Test synchronization step by step."""
    print("\n🧪 TESTING SYNCHRONIZATION")
    print("-" * 30)

    # Step 1: Set history
    print("Step 1: Setting chat history...")
    widget.chat_history = [
        {"role": "user", "content": "Debug test"},
        {"role": "assistant", "content": "Debug response"},
    ]
    print(f"Python side: {len(widget.chat_history)} messages")
    time.sleep(0.5)  # Give time for sync

    # Step 2: Simulate UI message
    print("Step 2: Simulating UI message...")
    before = len(widget.chat_history)
    widget._handle_message(None, {"type": "user_message", "text": "UI debug test"})
    after = len(widget.chat_history)
    print(f"Before: {before}, After: {after}")

    # Step 3: Clear
    print("Step 3: Clearing history...")
    widget.chat_history = []
    print(f"After clear: {len(widget.chat_history)} messages")

    print("\nCheck the widget UI to see if it matches these changes!")


globals()["test_sync"] = test_sync

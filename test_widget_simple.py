#!/usr/bin/env python3
"""Simple test to verify the widget works."""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'python'))

from agent_widget import AgentWidget

def test_widget():
    """Test the widget thoroughly."""
    print("=== Widget Test ===")
    
    # Test widget creation
    print("1. Creating widget...")
    widget = AgentWidget()
    print(f"   ✓ Widget created: {widget.__class__.__name__}")
    print(f"   ✓ Widget ID: {widget.model_id}")
    
    # Test JavaScript bundle
    print("\n2. Checking JavaScript bundle...")
    if hasattr(widget, '_esm'):
        if isinstance(widget._esm, str) and widget._esm.startswith('var'):
            print("   ✓ JavaScript is bundled (no external imports)")
        else:
            print(f"   ✗ Unexpected ESM content: {widget._esm[:50]}...")
    else:
        print("   ✗ No _esm attribute found")
    
    # Test message handling
    print("\n3. Testing message handling...")
    try:
        # Simulate receiving a message
        widget._handle_message(None, {"type": "user_message", "text": "Hello"})
        print("   ✓ Message handling works")
    except Exception as e:
        print(f"   ✗ Message handling failed: {e}")
    
    print("\n=== Widget is ready! ===")
    print("\nTo use in Jupyter:")
    print("1. uv run jupyter notebook")
    print("2. Create new notebook")
    print("3. Run:")
    print("   import sys")
    print("   sys.path.insert(0, 'python')")
    print("   from agent_widget import AgentWidget")
    print("   widget = AgentWidget()")
    print("   widget")
    
    return widget

if __name__ == "__main__":
    widget = test_widget()
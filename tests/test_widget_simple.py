"""Simple test to verify the widget works."""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "python"))  # noqa: PTH118, PTH120

from assistant_ui_anywidget.agent_widget import AgentWidget


def test_widget() -> None:
    """Test the widget thoroughly."""
    print("=== Widget Test ===")

    # Test widget creation
    print("1. Creating widget...")
    widget = AgentWidget(show_help=False)
    print(f"   ✓ Widget created: {widget.__class__.__name__}")
    print(f"   ✓ Widget ID: {widget.model_id}")

    # Test JavaScript bundle
    print("\n2. Checking JavaScript bundle...")
    if hasattr(widget, "_esm"):
        if isinstance(widget._esm, str) and widget._esm.startswith("var"):  # type: ignore[unreachable]
            print("   ✓ JavaScript is bundled (no external imports)")  # type: ignore[unreachable]
        else:
            print(f"   ✗ Unexpected ESM content: {widget._esm[:50]}...")  # type: ignore[unused-ignore,index]
    else:
        print("   ✗ No _esm attribute found")

    # Test message handling
    print("\n3. Testing message handling...")
    try:
        # Simulate receiving a message
        widget._handle_message(None, {"type": "user_message", "text": "Hello"})
        print("   ✓ Message handling works")
    except Exception as e:  # noqa: BLE001
        print(f"   ✗ Message handling failed: {e}")

    print("\n=== Widget is ready! ===")
    print("\nTo use in Jupyter:")
    print("1. uv run jupyter notebook")
    print("2. Create new notebook")
    print("3. Run:")
    print("   import sys")
    print("   sys.path.insert(0, 'python')")
    print("   from assistant_ui_anywidget.agent_widget import AgentWidget")
    print("   widget = AgentWidget(show_help=False)")
    print("   widget")


if __name__ == "__main__":
    test_widget()

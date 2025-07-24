"""Test script for the AgentWidget."""

import os
import pathlib
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "python"))  # noqa: PTH118, PTH120

from assistant_ui_anywidget.agent_widget import AgentWidget


def test_widget_creation() -> None:
    """Test that we can create a widget instance."""
    widget = AgentWidget()
    print("✓ Widget created successfully")
    print(f"  - Initial message: '{widget.message}'")

    # Debug the ESM path
    esm_path = pathlib.Path(__file__).parent.parent / "frontend" / "dist" / "index.js"
    print(f"  - Expected ESM path: {esm_path}")
    print(f"  - ESM path exists: {esm_path.exists()}")
    print(f"  - Widget ESM path: {widget._esm}")

    # Assert the widget was created successfully
    assert widget is not None
    assert hasattr(widget, "message")


if __name__ == "__main__":
    print("Testing AgentWidget...")
    test_widget_creation()
    print("\nWidget ready! In a Jupyter notebook, you can use:")
    print("  from assistant_ui_anywidget import AgentWidget")
    print("  widget = AgentWidget()")
    print("  widget  # Display the widget")

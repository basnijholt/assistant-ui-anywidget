"""Test script for the AgentWidget."""

import pathlib

from assistant_ui_anywidget.agent_widget import AgentWidget


def test_widget_creation() -> None:
    """Test that we can create a widget instance."""
    widget = AgentWidget(show_help=False)
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
    print("  widget = AgentWidget(show_help=False)")
    print("  widget  # Display the widget")

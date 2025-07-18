#!/usr/bin/env python3
"""Test the widget in a Jupyter notebook environment."""

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "python"))

from agent_widget import AgentWidget


def test_widget_in_notebook():
    """Test widget creation and display."""
    print("Creating AgentWidget...")
    widget = AgentWidget()

    print("Widget created successfully!")
    print(f"Widget ID: {widget.model_id}")
    print(f"Widget class: {widget.__class__.__name__}")

    # Display the widget
    print("\nDisplaying widget...")
    return widget


if __name__ == "__main__":
    widget = test_widget_in_notebook()

    print("\nTo use in Jupyter:")
    print("1. Start Jupyter: uv run jupyter notebook")
    print("2. Create new notebook")
    print("3. Run: from python.agent_widget import AgentWidget")
    print("4. Run: widget = AgentWidget()")
    print("5. Run: widget")

    # For testing, we can also create a simple notebook file
    notebook_content = """
{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "import sys\\n",
    "sys.path.insert(0, 'python')\\n",
    "from agent_widget import AgentWidget"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "widget = AgentWidget()\\n",
    "widget"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.0"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
"""

    with open("test_widget.ipynb", "w") as f:
        f.write(notebook_content)

    print("\nCreated test_widget.ipynb for testing in Jupyter!")

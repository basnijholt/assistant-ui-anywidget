#!/usr/bin/env python3
"""Simple test for Jupyter notebook usage."""

import sys

sys.path.insert(0, "python")

from agent_widget import AgentWidget

# Create widget with initial history
widget = AgentWidget()
widget.chat_history = [
    {"role": "user", "content": "Hello, how are you?"},
    {
        "role": "assistant",
        "content": "I'm doing well, thank you! How can I assist you today?",
    },
]

print("Widget created with initial chat history!")
print("In Jupyter, run:")
print("1. Display widget: widget")
print("2. Type messages in the UI")
print("3. Check sync: print(widget.chat_history)")
print(f"\nInitial history: {widget.chat_history}")

# Make the widget available as a global variable
globals()["widget"] = widget

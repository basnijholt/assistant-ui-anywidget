#!/usr/bin/env python3
"""Automated tests to simulate UI interactions and debug synchronization issues."""

import sys

sys.path.insert(0, "python")

from agent_widget import AgentWidget


class UISimulator:
    """Simulate UI interactions by directly calling the widget methods."""

    def __init__(self, widget):
        self.widget = widget
        self.test_results = []

    def simulate_ui_send(self, message_text):
        """Simulate what happens when user types in UI and hits send."""
        print(f"🖱️  Simulating UI send: '{message_text}'")

        # Record state before
        before_count = len(self.widget.chat_history)
        print(f"   Before: {before_count} messages in chat_history")

        # This is exactly what the UI does when user hits send
        message_content = {"type": "user_message", "text": message_text}
        self.widget._handle_message(None, message_content)

        # Record state after
        after_count = len(self.widget.chat_history)
        print(f"   After: {after_count} messages in chat_history")

        # Check if messages were added
        expected_count = before_count + 2  # user message + assistant response
        success = after_count == expected_count

        result = {
            "action": "ui_send",
            "message": message_text,
            "before_count": before_count,
            "after_count": after_count,
            "expected_count": expected_count,
            "success": success,
            "chat_history": list(self.widget.chat_history),
        }

        self.test_results.append(result)
        print(f"   Result: {'✅ SUCCESS' if success else '❌ FAILED'}")

        return success

    def simulate_python_add(self, role, content):
        """Simulate adding message from Python side."""
        print(f"🐍 Simulating Python add: {role} - '{content}'")

        before_count = len(self.widget.chat_history)
        self.widget.add_message(role, content)
        after_count = len(self.widget.chat_history)

        success = after_count == before_count + 1

        result = {
            "action": "python_add",
            "role": role,
            "content": content,
            "before_count": before_count,
            "after_count": after_count,
            "success": success,
            "chat_history": list(self.widget.chat_history),
        }

        self.test_results.append(result)
        print(f"   Result: {'✅ SUCCESS' if success else '❌ FAILED'}")

        return success

    def simulate_python_set_history(self, history):
        """Simulate setting entire chat history from Python."""
        print(f"🐍 Simulating Python set history: {len(history)} messages")

        self.widget.chat_history = history
        after_count = len(self.widget.chat_history)

        success = after_count == len(history)

        result = {
            "action": "python_set_history",
            "input_history": history,
            "after_count": after_count,
            "success": success,
            "chat_history": list(self.widget.chat_history),
        }

        self.test_results.append(result)
        print(f"   Result: {'✅ SUCCESS' if success else '❌ FAILED'}")

        return success

    def simulate_python_clear(self):
        """Simulate clearing chat history from Python."""
        print("🐍 Simulating Python clear")

        before_count = len(self.widget.chat_history)
        self.widget.clear_chat_history()
        after_count = len(self.widget.chat_history)

        success = after_count == 0

        result = {
            "action": "python_clear",
            "before_count": before_count,
            "after_count": after_count,
            "success": success,
            "chat_history": list(self.widget.chat_history),
        }

        self.test_results.append(result)
        print(f"   Result: {'✅ SUCCESS' if success else '❌ FAILED'}")

        return success

    def print_detailed_results(self):
        """Print detailed test results."""
        print("\n" + "=" * 60)
        print("DETAILED TEST RESULTS")
        print("=" * 60)

        for i, result in enumerate(self.test_results, 1):
            print(f"\n{i}. {result['action'].upper()}")
            print(f"   Success: {'✅' if result['success'] else '❌'}")

            if result["action"] == "ui_send":
                print(f"   Message: '{result['message']}'")
                print(f"   Before: {result['before_count']} messages")
                print(f"   After: {result['after_count']} messages")
                print(f"   Expected: {result['expected_count']} messages")
            elif result["action"] == "python_add":
                print(f"   Role: {result['role']}")
                print(f"   Content: '{result['content']}'")
                print(f"   Before: {result['before_count']} messages")
                print(f"   After: {result['after_count']} messages")
            elif result["action"] == "python_set_history":
                print(f"   Input: {len(result['input_history'])} messages")
                print(f"   After: {result['after_count']} messages")
            elif result["action"] == "python_clear":
                print(f"   Before: {result['before_count']} messages")
                print(f"   After: {result['after_count']} messages")

            print(f"   Final chat_history: {result['chat_history']}")

        # Summary
        successful = sum(1 for r in self.test_results if r["success"])
        total = len(self.test_results)
        print(f"\n📊 SUMMARY: {successful}/{total} tests passed")

        return successful == total


def run_comprehensive_ui_tests():
    """Run comprehensive UI simulation tests."""
    print("🧪 RUNNING COMPREHENSIVE UI SIMULATION TESTS")
    print("=" * 60)

    # Create widget and simulator
    widget = AgentWidget()
    simulator = UISimulator(widget)

    # Test 1: Start with empty state
    print("\n1. Testing initial empty state...")
    assert len(widget.chat_history) == 0, "Should start empty"

    # Test 2: UI send with empty history
    print("\n2. Testing UI send with empty history...")
    simulator.simulate_ui_send("Hello from UI")

    # Test 3: Python add message
    print("\n3. Testing Python add message...")
    simulator.simulate_python_add("user", "Hello from Python")

    # Test 4: UI send with existing history
    print("\n4. Testing UI send with existing history...")
    simulator.simulate_ui_send("Second UI message")

    # Test 5: Python set entire history
    print("\n5. Testing Python set entire history...")
    new_history = [
        {"role": "user", "content": "New conversation"},
        {"role": "assistant", "content": "New response"},
    ]
    simulator.simulate_python_set_history(new_history)

    # Test 6: UI send after Python set
    print("\n6. Testing UI send after Python set...")
    simulator.simulate_ui_send("UI message after Python set")

    # Test 7: Python clear
    print("\n7. Testing Python clear...")
    simulator.simulate_python_clear()

    # Test 8: UI send after clear
    print("\n8. Testing UI send after clear...")
    simulator.simulate_ui_send("UI message after clear")

    # Print detailed results
    all_passed = simulator.print_detailed_results()

    return widget, simulator, all_passed


if __name__ == "__main__":
    widget, simulator, all_passed = run_comprehensive_ui_tests()

    if all_passed:
        print("\n🎉 ALL TESTS PASSED! The widget should work correctly.")
    else:
        print(
            "\n❌ SOME TESTS FAILED! There are issues with the widget synchronization."
        )

    print("\nFor debugging in Jupyter:")
    print("1. widget = AgentWidget()")
    print("2. widget  # Display the widget")
    print("3. Try typing messages and check: widget.chat_history")
    print("4. Try: widget.chat_history = [{'role': 'user', 'content': 'Test'}]")
    print("5. Check if UI updates immediately")

    # Make widget available globally for debugging
    globals()["widget"] = widget
    globals()["simulator"] = simulator

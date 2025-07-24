#!/usr/bin/env python3
"""Test interrupt flow directly."""

import uuid
from assistant_ui_anywidget.kernel_interface import KernelInterface
from assistant_ui_anywidget.ai.simple_functional_ai_service import SimpleFunctionalAIService


def test_interrupt_flow():
    """Test interrupt flow."""
    kernel = KernelInterface()
    service = SimpleFunctionalAIService(kernel, require_approval=True)
    
    thread_id = str(uuid.uuid4())
    
    print("=== Testing Interrupt Flow ===")
    
    # Try different phrasings to trigger code execution
    test_messages = [
        "Please execute this code: print('hello')",
        "Run this Python code: x = 5",
        "Execute the following: 2 + 2",
        "Can you run this code for me: print('test')",
        "I need you to execute: y = 10"
    ]
    
    for i, msg in enumerate(test_messages):
        print(f"\nTest {i+1}: {msg}")
        result = service.chat(msg, thread_id=f"test_{i}")
        print(f"Response: {result.content[:200]}...")
        print(f"Success: {result.success}")
        
        # Check if approval was requested
        if any(word in result.content.lower() for word in ["approve", "approval", "permission"]):
            print("✅ Approval workflow triggered!")
            
            # Try to approve
            result2 = service.chat("approve", thread_id=f"test_{i}")
            print(f"After approval: {result2.content[:200]}...")
        else:
            print("❌ No approval workflow triggered")


if __name__ == "__main__":
    test_interrupt_flow()
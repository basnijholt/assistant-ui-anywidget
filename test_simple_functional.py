#!/usr/bin/env python3
"""Test the simple functional AI service."""

import uuid
from assistant_ui_anywidget.kernel_interface import KernelInterface
from assistant_ui_anywidget.ai.simple_functional_ai_service import SimpleFunctionalAIService


def test_simple_functional_service():
    """Test the simple functional service."""
    kernel = KernelInterface()
    # Force OpenAI if available, otherwise use whatever is available
    import os
    if os.getenv("OPENAI_API_KEY"):
        service = SimpleFunctionalAIService(kernel, model="openai:gpt-4o-mini", require_approval=True)
    else:
        service = SimpleFunctionalAIService(kernel, require_approval=True)
    
    thread_id = str(uuid.uuid4())
    
    print("=== Test 1: Simple Chat ===")
    result1 = service.chat("Hello! What is 2+2?", thread_id)
    print(f"Response: {result1.content}")
    print(f"Success: {result1.success}")
    print()
    
    print("=== Test 2: Memory Test ===")
    result2 = service.chat("My name is Alice", thread_id)
    print(f"Response: {result2.content}")
    
    # Check the state to debug
    state = service.graph.get_state({"configurable": {"thread_id": thread_id}})
    print(f"State after first message: {state.values}")
    
    result3 = service.chat("What's my name?", thread_id)
    print(f"Response: {result3.content}")
    print(f"Memory works: {'Alice' in result3.content}")
    print()
    
    print("=== Test 3: Code Execution with Approval ===")
    result4 = service.chat("Please execute this code: print('Hello World')", thread_id)
    print(f"Response: {result4.content}")
    
    if "Approve" in result4.content or "approve" in result4.content:
        print("\nApproving code execution...")
        result5 = service.chat("approve", thread_id)
        print(f"Response: {result5.content}")
    print()
    
    print("=== Test 4: New Thread - Code Denial ===")
    thread_id2 = str(uuid.uuid4())
    result6 = service.chat("Execute: x = 5", thread_id2)
    print(f"Response: {result6.content}")
    
    if "Approve" in result6.content or "approve" in result6.content:
        print("\nDenying code execution...")
        result7 = service.chat("deny", thread_id2)
        print(f"Response: {result7.content}")


if __name__ == "__main__":
    test_simple_functional_service()
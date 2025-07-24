#!/usr/bin/env python3
"""Test the simplified AI service."""

import uuid
from assistant_ui_anywidget.kernel_interface import KernelInterface
from assistant_ui_anywidget.ai.simplified_pydantic_ai_service import SimplifiedPydanticAIService


def test_simplified_service():
    """Test the simplified service."""
    kernel = KernelInterface()
    service = SimplifiedPydanticAIService(kernel, require_approval=True)
    
    thread_id = str(uuid.uuid4())
    
    print("=== Test 1: Simple Chat ===")
    result1 = service.chat("Hello! What is 2+2?", thread_id)
    print(f"Response: {result1.content}")
    print(f"Success: {result1.success}")
    print()
    
    print("=== Test 2: Memory Test ===")
    result2 = service.chat("My name is Alice", thread_id)
    print(f"Response: {result2.content}")
    
    result3 = service.chat("What's my name?", thread_id)
    print(f"Response: {result3.content}")
    print()
    
    print("=== Test 3: Code Execution with Approval ===")
    result4 = service.chat("Please execute this code: print('Hello World')", thread_id)
    print(f"Response: {result4.content}")
    
    if "Approve" in result4.content:
        print("\nApproving code execution...")
        result5 = service.chat("approve", thread_id)
        print(f"Response: {result5.content}")
    print()
    
    print("=== Test 4: New Thread - Code Denial ===")
    thread_id2 = str(uuid.uuid4())
    result6 = service.chat("Execute: x = 5", thread_id2)
    print(f"Response: {result6.content}")
    
    if "Approve" in result6.content:
        print("\nDenying code execution...")
        result7 = service.chat("deny", thread_id2)
        print(f"Response: {result7.content}")


if __name__ == "__main__":
    test_simplified_service()
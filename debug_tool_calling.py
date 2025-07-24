#!/usr/bin/env python3
"""Debug script to test tool calling in Pydantic AI."""

import asyncio
import os
from dotenv import load_dotenv
from pydantic_ai import Agent, RunContext
from typing import Any

# Load environment variables
load_dotenv()


def get_model_string():
    """Get the appropriate model string based on available API keys."""
    if os.getenv("OPENAI_API_KEY"):
        return "openai:gpt-4o-mini"
    elif os.getenv("ANTHROPIC_API_KEY"):
        return "anthropic:claude-3-haiku-20240307" 
    elif os.getenv("GOOGLE_API_KEY"):
        return "gemini-1.5-flash"
    else:
        return "test"


async def test_tool_calling():
    """Test if the AI calls tools properly."""
    model = get_model_string()
    print(f"Using model: {model}")
    
    # Create agent with a simple tool
    agent = Agent(
        model,
        system_prompt=(
            "You are a helpful assistant. When users ask you to execute code, "
            "you MUST use the execute_code tool. Always call the tool when requested."
        )
    )
    
    # Track if tool was called
    tool_called = False
    
    @agent.tool
    async def execute_code(ctx: RunContext[Any], code: str) -> str:
        """Execute Python code."""
        nonlocal tool_called
        tool_called = True
        print(f"Tool called with code: {code}")
        return f"Code executed: {code}"
    
    # Test 1: Simple request
    print("\n=== Test 1: Simple code execution request ===")
    result = await agent.run("Please execute this code: print('hello')")
    print(f"Response: {result.output}")
    print(f"Tool called: {tool_called}")
    
    # Reset
    tool_called = False
    
    # Test 2: More explicit request
    print("\n=== Test 2: Explicit execution request ===")
    result = await agent.run("Execute the following Python code: x = 5 + 3")
    print(f"Response: {result.output}")
    print(f"Tool called: {tool_called}")
    
    # Reset
    tool_called = False
    
    # Test 3: With more context
    print("\n=== Test 3: With reasoning ===")
    result = await agent.run(
        "I need you to run this Python code to calculate something: 2 + 2. "
        "Please use the execute_code tool to do this."
    )
    print(f"Response: {result.output}")
    print(f"Tool called: {tool_called}")


if __name__ == "__main__":
    asyncio.run(test_tool_calling())
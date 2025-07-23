# Pydantic AI Migration Plan

## Overview

Migrate from LangChain to Pydantic AI while keeping LangGraph for orchestration. This will solve the "No AIMessage found in input" errors and provide a cleaner, more reliable AI integration.

## Key Benefits of Pydantic AI

1. **Type Safety**: Built-in Pydantic validation for all inputs/outputs
2. **Simpler Tools**: Clean function definitions with automatic schema generation
3. **Better Error Handling**: Clear error messages and robust failure modes
4. **Structured Outputs**: Native support for structured responses
5. **Agent State**: Built-in conversation state management
6. **Testing**: Easy to test with test models and mocking

## Architecture Design

### Current Architecture (LangChain + LangGraph)

```
User Input → LangGraph StateGraph → LangChain LLM → LangChain Tools → Response
```

### New Architecture (Pydantic AI + LangGraph)

```
User Input → LangGraph StateGraph → Pydantic AI Agent → Pydantic AI Tools → Response
```

## Implementation Plan

### Phase 1: Core Pydantic AI Integration ✅

- [x] Add Pydantic AI dependency
- [x] Create basic PydanticAIService
- [x] Remove LangChain fallbacks
- [x] Update AgentWidget to use PydanticAIService

### Phase 2: Model Configuration (IN PROGRESS)

- [ ] Fix model string format for different providers
- [ ] Implement proper provider detection
- [ ] Support all current providers (OpenAI, Anthropic, Google)
- [ ] Test model initialization

### Phase 3: Tools Implementation

- [ ] Migrate kernel tools to Pydantic AI format
- [ ] Implement `get_variables` tool
- [ ] Implement `inspect_variable` tool
- [ ] Implement `execute_code` tool with approval
- [ ] Implement `kernel_info` tool

### Phase 4: LangGraph Integration

- [ ] Create Pydantic AI compatible message types
- [ ] Implement approval workflow with LangGraph
- [ ] Handle interrupts and resume correctly
- [ ] Maintain conversation state

### Phase 5: Advanced Features

- [ ] Implement conversation memory
- [ ] Add structured outputs for complex responses
- [ ] Implement retry logic and error recovery
- [ ] Add conversation logging compatibility

### Phase 6: Testing & Validation

- [ ] Update real AI integration tests
- [ ] Test approval workflow end-to-end
- [ ] Verify all UI interactions work
- [ ] Performance testing and optimization

## Technical Details

### Model Configuration

Based on Pydantic AI docs, model strings should be:

```python
# OpenAI
"openai:gpt-4o-mini"
"openai:gpt-4"

# Anthropic
"anthropic:claude-3-haiku-20240307"
"anthropic:claude-3-sonnet-20240229"

# Google/Gemini
"gemini:gemini-1.5-flash"
"gemini:gemini-1.5-pro"

# Test model for development
"test"
```

### Tool Definitions

Tools in Pydantic AI are simple async functions:

```python
async def get_variables(ctx: RunContext[Any]) -> str:
    """List all variables in the kernel namespace."""
    # Implementation here
    return result

# Register with agent
agent = Agent('openai:gpt-4o-mini', tools=[get_variables])
```

### Agent Configuration

```python
from pydantic_ai import Agent

agent = Agent(
    model='openai:gpt-4o-mini',
    system_prompt="You are a helpful Jupyter assistant...",
    tools=[get_variables, inspect_variable, execute_code, kernel_info],
    deps_type=KernelInterface,  # Dependency injection
)
```

### Conversation State

Pydantic AI handles conversation state automatically:

```python
# Run with conversation memory
result = await agent.run('Hello', deps=kernel_interface)

# Continue conversation
result = await agent.run('What variables do I have?', deps=kernel_interface)
```

### Approval Workflow Integration

For LangGraph integration, we need to:

1. Convert Pydantic AI results to LangChain message format
2. Handle tool calls that require approval
3. Implement interrupt/resume mechanism
4. Maintain state consistency

```python
def convert_pydantic_to_langchain(result: RunResult) -> AIMessage:
    """Convert Pydantic AI result to LangChain message."""
    tool_calls = []
    if result.tool_calls:
        for call in result.tool_calls:
            tool_calls.append({
                "name": call.tool_name,
                "args": call.args,
                "id": call.call_id,
            })

    return AIMessage(
        content=result.data,
        tool_calls=tool_calls if tool_calls else None,
    )
```

## Risk Mitigation

### Backward Compatibility

- Keep existing ChatResult interface
- Maintain same API for AgentWidget
- Preserve conversation logging format

### Error Handling

- Graceful fallback for model failures
- Clear error messages for debugging
- Robust retry mechanisms

### Testing Strategy

- Unit tests for each component
- Integration tests with real AI providers
- End-to-end UI testing
- Performance benchmarking

## Success Criteria

1. ✅ No more "No AIMessage found in input" errors
2. ✅ All existing UI functionality works
3. ✅ Approval workflow works reliably
4. ✅ Performance is equal or better than LangChain
5. ✅ Code is cleaner and more maintainable
6. ✅ All tests pass

## Next Steps

1. **Immediate**: Fix model string format and test basic functionality
2. **Short-term**: Implement all kernel tools in Pydantic AI format
3. **Medium-term**: Integrate with LangGraph for approval workflow
4. **Long-term**: Optimize and add advanced features

## File Changes Required

### New Files

- `assistant_ui_anywidget/ai/pydantic_ai_service.py` ✅
- `PYDANTIC_AI_MIGRATION_PLAN.md` ✅

### Modified Files

- `assistant_ui_anywidget/agent_widget.py` ✅
- `test_real_ai_integration.py` (update for Pydantic AI)
- `pyproject.toml` (add pydantic-ai dependency) ✅

### Deprecated Files (Phase 2)

- `assistant_ui_anywidget/ai/langgraph_service.py` (keep for reference)
- Related LangChain imports and utilities

## Timeline

- **Week 1**: Basic Pydantic AI integration and model configuration
- **Week 2**: Tool implementation and testing
- **Week 3**: LangGraph integration and approval workflow
- **Week 4**: Testing, optimization, and documentation

This migration will significantly improve reliability and maintainability while solving the current LangChain-related issues.

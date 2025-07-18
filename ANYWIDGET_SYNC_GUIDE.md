# AnyWidget + Assistant UI Synchronization Guide

This document captures the key learnings and patterns for implementing bidirectional state synchronization between Python and JavaScript in AnyWidget, specifically for chat/message interfaces.

## 🎯 Overview

We successfully implemented a chat widget that synchronizes message history between Python (backend) and JavaScript (frontend) using AnyWidget. The key challenge was achieving reliable bidirectional synchronization of complex data structures (lists of message dictionaries).

## 🔧 Technical Architecture

### Python Side (`agent_widget.py`)

```python
import anywidget
import traitlets
import pathlib

class AgentWidget(anywidget.AnyWidget):
    # Path to compiled JavaScript bundle
    _esm = str(pathlib.Path(__file__).parent.parent / "frontend" / "dist" / "index.js")

    # Synchronized state - this is the KEY
    chat_history = traitlets.List([]).tag(sync=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.on_msg(self._handle_message)

    def _handle_message(self, _, content, buffers=None):
        """Handle messages from JavaScript frontend"""
        if content.get("type") == "user_message":
            user_text = content.get("text", "")

            # Update synchronized state
            new_history = list(self.chat_history)
            new_history.append({"role": "user", "content": user_text})
            self.chat_history = new_history  # This triggers sync!
```

### JavaScript Side (`frontend/src/index.tsx`)

```typescript
import React, { useState, useEffect } from 'react';
import { createRender, useModelState, useModel } from '@anywidget/react';

function ChatWidget() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useModelState('chat_history');
  const model = useModel();

  // Use synchronized state as single source of truth
  const messages = Array.isArray(chatHistory) ? chatHistory : [];

  // Listen for state changes from Python
  useEffect(() => {
    if (model) {
      const handleChange = () => {
        console.log('Chat history changed via model event');
        setRenderKey(prev => prev + 1); // Force re-render
      };

      model.on('change:chat_history', handleChange);
      return () => model.off('change:chat_history', handleChange);
    }
  }, [model]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (model) {
      // Send to Python
      model.send({ type: 'user_message', text: input });

      // CRITICAL: Force synchronization
      model.save_changes();
    }

    setInput('');
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={`${msg.role}-${i}`}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default { render: createRender(ChatWidget) };
```

## 🔑 Key Synchronization Patterns

### 1. **Traitlets with `sync=True`**
```python
# Python side - this is the foundation
chat_history = traitlets.List([]).tag(sync=True)
```
- Enables automatic serialization/deserialization
- Supports complex data structures (lists, dicts)
- Changes trigger events on both sides

### 2. **useModelState Hook**
```typescript
// JavaScript side - reactive state hook
const [chatHistory, setChatHistory] = useModelState('chat_history');
```
- Automatically syncs with Python traitlet
- Triggers React re-renders when state changes
- Two-way binding between Python and React

### 3. **Event-Driven Updates**
```typescript
// Listen for changes from Python
model.on('change:chat_history', handleChange);
```
- React to Python state changes
- Trigger UI updates when backend modifies data

### 4. **Critical: `model.save_changes()`**
```typescript
// After sending data to Python
model.send({ type: 'user_message', text: input });
model.save_changes(); // ESSENTIAL - forces sync
```
- **Without this, JavaScript→Python updates may not sync**
- Always call after `model.send()` or `model.set()`

## 🚨 Common Pitfalls & Solutions

### Problem 1: Messages Not Appearing in UI
**Symptom**: Python receives messages, but UI doesn't update
**Cause**: Missing `model.save_changes()` call
**Solution**: Always call `model.save_changes()` after sending data

### Problem 2: Duplicate Messages
**Symptom**: Each message appears twice in UI
**Cause**: Both local state and synchronized state being displayed
**Solution**: Use synchronized state as single source of truth

### Problem 3: State Not Clearing
**Symptom**: Setting `chat_history = []` doesn't clear UI
**Cause**: Event listeners not properly triggering re-renders
**Solution**: Add force re-render mechanism + proper event handling

### Problem 4: Race Conditions
**Symptom**: Inconsistent state between Python and JavaScript
**Cause**: Multiple rapid state updates
**Solution**: Use proper React keys and avoid batching state updates

## 📋 Testing Strategy

### 1. **Automated Backend Tests**
```python
def test_synchronization():
    widget = AgentWidget()

    # Test Python → Python
    widget.chat_history = [{"role": "user", "content": "test"}]
    assert len(widget.chat_history) == 1

    # Test UI simulation
    widget._handle_message(None, {"type": "user_message", "text": "hi"})
    assert len(widget.chat_history) == 2
```

### 2. **UI Simulation Tests**
```python
class UISimulator:
    def simulate_ui_send(self, message):
        # Simulate exact UI behavior
        self.widget._handle_message(None, {"type": "user_message", "text": message})
        return len(self.widget.chat_history)
```

### 3. **Integration Tests**
- Test Python → JavaScript sync
- Test JavaScript → Python sync
- Test clearing and state reset
- Test rapid message sending

## 🛠️ Development Workflow

### 1. **Set Up Development Environment**
```bash
# Install dependencies
uv sync
cd frontend && npm install

# Build frontend
npm run build
```

### 2. **Debug Synchronization Issues**
```javascript
// Add debug logging
useEffect(() => {
  console.log('Current chat history:', chatHistory);
  console.log('Messages to display:', messages);
}, [chatHistory, messages]);
```

### 3. **Test in Jupyter**
```python
# Create widget
widget = AgentWidget()

# Set initial state
widget.chat_history = [{"role": "user", "content": "Hello"}]

# Display widget
widget

# Test synchronization
print(widget.chat_history)  # Should match UI
```

## 📊 Message Format

### Standard Message Structure
```python
{
    "role": "user" | "assistant",
    "content": "string"
}
```

### Chat History Format
```python
[
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"},
    {"role": "user", "content": "How are you?"}
]
```

## 🔄 State Management Patterns

### 1. **Python as Source of Truth**
```python
# Python manages all state changes
def add_message(self, role: str, content: str):
    new_history = list(self.chat_history)
    new_history.append({"role": role, "content": content})
    self.chat_history = new_history  # Triggers sync
```

### 2. **JavaScript as Display Layer**
```typescript
// JavaScript only displays, doesn't manage state
const messages = Array.isArray(chatHistory) ? chatHistory : [];
```

### 3. **Event-Driven Communication**
```typescript
// JavaScript → Python: Custom messages
model.send({ type: 'user_message', text: input });

// Python → JavaScript: State updates
self.chat_history = new_history  # Auto-syncs
```

## 🚀 Performance Considerations

### 1. **React Rendering**
```typescript
// Use stable keys for list items
key={`${msg.role}-${i}-${msg.content?.slice(0, 20)}`}
```

### 2. **State Updates**
```python
# Batch updates when possible
new_history = list(self.chat_history)
new_history.append(message1)
new_history.append(message2)
self.chat_history = new_history  # Single update
```

### 3. **Memory Management**
```python
# Clear old messages if history gets large
if len(self.chat_history) > 1000:
    self.chat_history = self.chat_history[-500:]  # Keep last 500
```

## 📚 Resources & References

### Official Documentation
- [AnyWidget Documentation](https://anywidget.dev/)
- [AnyWidget React Integration](https://www.npmjs.com/package/@anywidget/react)
- [Traitlets Documentation](https://traitlets.readthedocs.io/)

### Key Concepts
- **Traitlets**: Python library for type-safe, reactive attributes
- **useModelState**: React hook for AnyWidget state synchronization
- **model.save_changes()**: Essential for JavaScript→Python sync
- **Event Listeners**: `model.on('change:attr', handler)` for reactive updates

### Message Format Standards
- **Role-based messaging**: `{"role": "user|assistant", "content": "text"}`
- **OpenAI-compatible**: Can integrate with OpenAI API format
- **Extensible**: Easy to add metadata, timestamps, etc.

## 🎉 Success Metrics

✅ **Bidirectional Sync**: Messages flow Python ↔ JavaScript
✅ **Real-time Updates**: UI updates immediately on state change
✅ **State Persistence**: Chat history survives widget refresh
✅ **Type Safety**: Proper TypeScript/Python typing
✅ **Error Handling**: Graceful handling of malformed data
✅ **Performance**: Smooth UI with large chat histories
✅ **Testing**: Comprehensive automated test coverage

## 🔮 Future Enhancements

### 1. **AI Integration**
```python
async def _handle_message(self, _, content, buffers=None):
    if content.get("type") == "user_message":
        # Add user message
        self.add_message("user", content.get("text", ""))

        # Get AI response
        response = await ai_client.chat(content.get("text", ""))
        self.add_message("assistant", response)
```

### 2. **Streaming Responses**
```python
def stream_response(self, text):
    for chunk in ai_client.stream(text):
        self.send({"type": "stream_chunk", "delta": chunk})
```

### 3. **Rich Message Types**
```python
{
    "role": "assistant",
    "content": "Here's an image",
    "attachments": [{"type": "image", "url": "..."}]
}
```

---

**This guide represents hard-won knowledge from extensive debugging and testing. The patterns here are proven to work reliably for AnyWidget + React chat interfaces.**

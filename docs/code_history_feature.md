# Code History Feature

The AgentWidget now includes a code history feature that tracks all executed code snippets for easy reference and reuse.

## Features

- **Tabbed Interface**: Switch between Chat and Code History views
- **Automatic Tracking**: All code executed through the widget is automatically tracked
- **Execution Metadata**: Each code entry includes:
  - Execution count
  - Timestamp
  - Success/error status
  - Output (if available)
- **Copy Functionality**: Each code snippet has a copy button for easy reuse
- **Visual Indicators**:
  - Badge showing number of code entries
  - Error highlighting for failed executions
  - Hover effects on copy buttons

## Usage

### From Python

```python
from assistant_ui_anywidget import AgentWidget

# Create widget
widget = AgentWidget()

# Execute code - automatically tracked
widget.execute_code("x = 42")
widget.execute_code("print(x)")

# Access code history programmatically
for item in widget.code_history:
    print(f"[{item['execution_count']}] {item['code']}")
```

### From Chat

When using the chat interface:

- Use `/exec <code>` command to execute code
- AI-executed code (with approval) is also tracked
- Switch to "Code History" tab to see all executed code

## Implementation Details

### Backend (Python)

- Added `code_history` trait to `AgentWidget` class
- Implemented `add_code_to_history()` method
- Updated all code execution paths to track history
- Maintains last 50 code executions

### Frontend (React)

- Added tabbed interface with Chat and Code History tabs
- Implemented `CodeHistoryItem` type for type safety
- Created dedicated copy function for code snippets
- Added visual feedback for copy operations

## Future Enhancements

Potential improvements:

- Export code history to a Python script
- Filter/search functionality
- Persistent storage across sessions
- Syntax highlighting for different languages
- Group related code executions

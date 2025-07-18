# Assistant-UI AnyWidget

> [!WARNING]
> This is a work in progress!

A minimal integration of Assistant-UI with AnyWidget for Jupyter notebooks.

## Quick Start

```bash
# Set up the environment
uv sync

# Build the frontend
cd frontend
npm install
npm run build
cd ..

# Run tests
uv run python tests/run_tests.py
```

## Usage in Jupyter

```bash
# Start Jupyter notebook
uv run jupyter notebook

# In a new notebook:
import sys
sys.path.insert(0, 'python')
from agent_widget import AgentWidget

# Create and display the widget
widget = AgentWidget()
widget
```

## Features

- ✅ **Working chat interface** with React components
- ✅ **Bidirectional communication** between Python and JavaScript
- ✅ **Browser compatibility** - no external dependencies
- ✅ **Message echoing** for testing
- ✅ **Modern tooling** (Vite, TypeScript, uv)
- ✅ **Comprehensive test suite**

## Project Structure

```
├── python/
│   ├── __init__.py
│   └── agent_widget.py     # Python widget implementation
├── frontend/
│   ├── src/
│   │   └── index.tsx       # React component
│   ├── dist/
│   │   └── index.js        # Built bundle (203KB)
│   ├── package.json
│   └── vite.config.ts      # Build configuration
├── tests/
│   ├── conftest.py         # pytest fixtures and configuration
│   ├── test_widget_basic.py      # Basic widget tests
│   ├── test_chat_synchronization_pytest.py  # Comprehensive sync tests
│   ├── run_tests.py        # Legacy test runner
│   └── test_widget.ipynb   # Jupyter test notebook
├── pyproject.toml          # Python dependencies
└── README.md
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev      # Watch mode with hot reload
npm run build    # Production build
```

### Testing
```bash
# Run all tests with pytest
uv run pytest

# Run specific test file
uv run pytest tests/test_widget_basic.py

# Run with verbose output
uv run pytest -v

# Run specific test class or function
uv run pytest tests/test_widget_basic.py::TestWidgetBasics::test_widget_creation

# Run with coverage
uv run pytest --cov=python

# Test in Jupyter
uv run jupyter notebook tests/test_widget.ipynb
```

### Python Development
```bash
# Install dependencies
uv sync

# Test widget creation
uv run python tests/test_widget_simple.py
```

## How It Works

1. **Python Side** (`python/agent_widget.py`):
   - Extends `anywidget.AnyWidget`
   - Handles message routing and state management
   - Echoes user messages for testing

2. **JavaScript Side** (`frontend/src/index.tsx`):
   - React component with chat interface
   - Uses `@anywidget/react` for widget integration
   - Handles user input and message display

3. **Communication**:
   - Python → JS: `widget.send()` method
   - JS → Python: `model.send()` method
   - Bidirectional message passing with JSON

## Troubleshooting

**Widget not displaying?**
- Ensure frontend is built: `cd frontend && npm run build`
- Check imports: `sys.path.insert(0, 'python')`
- Verify bundle exists: `ls frontend/dist/index.js`

**Import errors?**
- All dependencies bundled (no external imports)
- Bundle size: ~203KB (includes React)
- Works in any Jupyter environment

**Need more features?**
- Add AI agent integration (OpenAI, LangChain)
- Implement streaming responses
- Add file upload support
- Customize UI components

# Assistant-UI AnyWidget

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

# Test the widget
uv run python test_widget.py
```

## Usage in Jupyter

```python
from python.agent_widget import AgentWidget

# Create and display the widget
widget = AgentWidget()
widget
```

## Features

- ✅ Basic chat interface with React
- ✅ Bidirectional communication between Python and JavaScript
- ✅ Simple message echoing for testing
- ✅ Built with modern tooling (Vite, TypeScript, uv)

## Project Structure

```
├── python/
│   └── agent_widget.py     # Python widget implementation
├── frontend/
│   ├── src/
│   │   └── index.tsx       # React component
│   ├── package.json
│   └── vite.config.ts      # Build configuration
├── pyproject.toml          # Python dependencies
└── test_widget.py          # Test script
```

## Development

- Frontend: `cd frontend && npm run dev` for watch mode
- Python: `uv run python test_widget.py` to test
- Build: `cd frontend && npm run build` to create production bundle
# Assistant-UI AnyWidget

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://github.com/basnijholt/assistant-ui-anywidget/workflows/CI/badge.svg)](https://github.com/basnijholt/assistant-ui-anywidget/actions)

A production-ready interactive chat widget integrating Assistant-UI with AnyWidget for Jupyter notebooks, featuring comprehensive testing, modern tooling, and CI/CD automation.

## Quick Start

```bash
# Set up the environment (Python 3.10+)
uv sync --all-extras

# Build the frontend
cd frontend
npm install
npm run build
cd ..

# Run tests
pytest

# Run frontend tests
cd frontend && npm test
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

- ✅ **Production-ready chat interface** with React and TypeScript
- ✅ **Bidirectional communication** between Python and JavaScript
- ✅ **Self-contained** - all dependencies bundled (1.4MB)
- ✅ **Markdown support** with syntax highlighting
- ✅ **Dynamic action buttons** for interactive responses
- ✅ **Screenshot capability** - View widget without Jupyter using Puppeteer
- ✅ **Modern tooling** (Vite, TypeScript, ESLint, Prettier)
- ✅ **Comprehensive test suite** (74 Python + 6 frontend tests)
- ✅ **CI/CD automation** with GitHub Actions
- ✅ **Type safety** with full TypeScript and mypy coverage
- ✅ **Code quality** with pre-commit hooks and linting

## Project Structure

```
├── python/
│   ├── __init__.py
│   └── agent_widget.py     # Python widget implementation
├── frontend/
│   ├── src/
│   │   └── index.tsx       # React component
│   ├── dist/
│   │   └── index.js        # Built bundle (1.4MB)
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

**Python Tests (74 tests with 75% coverage):**

```bash
# Run all tests with coverage
pytest

# Run specific test file
pytest tests/test_widget_basic.py

# Run with verbose output
pytest -v

# Generate coverage report
pytest --cov-report=html
```

**Frontend Tests (6 tests with Vitest):**

```bash
cd frontend
npm test              # Run tests
npm run test:ui       # Interactive test UI
npm run test:coverage # Coverage report
```

### Taking Screenshots

You can capture screenshots of the widget without running Jupyter:

```bash
# From the project root
python take_screenshot.py

# Or manually from the frontend directory
cd frontend
npm run demo       # Start demo server
npm run screenshot # Take screenshot (in another terminal)
```

Screenshots are saved to `frontend/screenshots/`. This is useful for:
- Visual documentation
- Sharing widget appearance
- Visual regression testing

### Code Quality

```bash
# Run pre-commit hooks
pre-commit run --all-files

# Install pre-commit hooks
pre-commit install

# Format code
cd frontend && npm run format    # Frontend
ruff format python tests        # Python

# Lint code
cd frontend && npm run lint      # Frontend
ruff check python tests         # Python
mypy python                      # Type checking
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
- Bundle size: 1.4MB (includes React, TypeScript libs)
- Works in any Jupyter environment

## Development Environment

This project includes a comprehensive development setup:

- **Pre-commit hooks**: Automated code formatting and linting
- **GitHub Actions CI/CD**: Matrix testing across Python 3.10-3.12
- **Dependabot**: Automated dependency updates
- **VS Code settings**: Optimized development experience
- **Test coverage**: 75% Python coverage, full frontend test suite
- **Type safety**: Complete TypeScript and mypy integration

## Architecture

The widget supports:

- **Message synchronization** between Python backend and React frontend
- **Action buttons** for dynamic user interactions
- **Markdown rendering** with syntax highlighting
- **Extensible design** for AI agent integration
- **Modern React patterns** with hooks and TypeScript

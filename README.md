# Assistant-UI AnyWidget

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://github.com/basnijholt/assistant-ui-anywidget/workflows/CI/badge.svg)](https://github.com/basnijholt/assistant-ui-anywidget/actions)

A production-ready AI-powered assistant widget with Jupyter kernel access, featuring automatic provider detection, comprehensive testing, and modern tooling.

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

## AI Setup (Optional)

The widget automatically detects and uses available AI providers. Create a `.env` file:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add any API key:
OPENAI_API_KEY=sk-...          # For GPT-4, GPT-3.5
ANTHROPIC_API_KEY=sk-ant-...    # For Claude 3 models
GOOGLE_API_KEY=...              # For Gemini Pro
```

The widget will:

- Automatically load API keys from `.env`
- Use the first available provider (OpenAI → Anthropic → Google)
- Fall back to a helpful mock AI if no keys are set
- Work perfectly with just one provider (e.g., only Google)

## Usage in Jupyter

### 🚀 **Recommended: Global Agent Interface**

The new global agent interface prevents keyboard shortcut conflicts and provides better notebook experience:

```python
# Start Jupyter notebook
uv run jupyter notebook

# NEW RECOMMENDED WAY - Simple and safe!
from assistant_ui_anywidget import get_agent

# Get the global agent (creates if doesn't exist)
agent = get_agent()
agent

# Even simpler - one line to display
from assistant_ui_anywidget import display_agent
display_agent()

# Or use the short alias
from assistant_ui_anywidget import agent
my_agent = agent()
```

**🔥 Key Benefits:**

- **Keyboard Safety**: Uses **Ctrl+D** to send messages (not Shift+Enter)
- **No Conflicts**: Never accidentally execute cells when chatting
- **Global State**: Same agent instance across all notebook cells
- **Auto-Config**: Sensible defaults for notebook use

### ⚙️ **Custom Configuration**

```python
# With custom configuration
agent = get_agent(ai_config={
    'provider': 'openai',         # Force specific provider
    'model': 'gpt-4',            # Choose model
    'require_approval': False,    # Auto-approve code execution
    'temperature': 0.7           # Response creativity
})

# Reset to create fresh instance
agent = get_agent(reset=True)
```

### 🔧 **Advanced: Direct Widget (Legacy)**

```python
# Direct widget creation (still works, but not recommended for notebooks)
from assistant_ui_anywidget import AgentWidget

widget = AgentWidget(
    ai_config={
        'provider': 'google_genai',  # Force specific provider
        'model': 'gemini-pro',       # Choose model
        'require_approval': False,    # Auto-approve code execution
    }
)
widget
```

## Features

### AI Capabilities

- ✅ **Multi-provider AI support** - OpenAI, Anthropic, Google (automatic detection)
- ✅ **Automatic provider selection** - Uses any available API key
- ✅ **Environment variable loading** - Reads from `.env` files via python-dotenv
- ✅ **Kernel-aware AI** - Can inspect variables and execute code
- ✅ **Natural language interface** - Ask questions in plain English
- ✅ **Fallback mock AI** - Works without API keys for development

### Core Features

- ✅ **Production-ready chat interface** with React and TypeScript
- ✅ **Jupyter kernel access** - Read variables, execute code, debug errors
- ✅ **Bidirectional communication** between Python and JavaScript
- ✅ **Self-contained** - all dependencies bundled (1.4MB)
- ✅ **Markdown support** with syntax highlighting
- ✅ **Dynamic action buttons** for interactive responses
- ✅ **Screenshot capability** - View widget without Jupyter using Puppeteer
- ✅ **Modern tooling** (Vite, TypeScript, ESLint, Prettier)
- ✅ **Comprehensive test suite** (85% Python coverage + frontend tests)
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
   - **Keyboard**: Ctrl+D (or Cmd+D) sends messages safely without cell execution conflicts

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

# Assistant-UI AnyWidget

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://github.com/basnijholt/assistant-ui-anywidget/workflows/CI/badge.svg)](https://github.com/basnijholt/assistant-ui-anywidget/actions)

A production-ready AI-powered assistant widget with Jupyter kernel access, featuring automatic provider detection, comprehensive testing, and modern tooling.

## 🤖 Project Context for AI Assistants

This section provides immediate context for AI assistants (like Claude) working with this codebase.

### Purpose & Value

- **What**: An AI-powered chat widget for Jupyter notebooks with direct kernel access
- **Why**: Enables natural language interaction with notebook variables, code execution, and debugging
- **Core Innovation**: Prevents keyboard conflicts by using Ctrl+D instead of Shift+Enter for sending messages

### Current State

- **Maturity**: Production-ready with 75%+ test coverage
- **Recent Work**: Major simplification effort reduced codebase by 31% (see docs/SIMPLIFICATION_PLAN.md)
- **Architecture**: Functional programming style, minimal class hierarchies, aggressive code removal

### Key Technical Decisions

- **Bundled React**: All JS dependencies bundled into single 1.4MB file for maximum compatibility
- **Global Agent Pattern**: Single instance per notebook session to avoid conflicts
- **LangGraph Integration**: Optional state machine for approval workflows
- **Auto-Detection**: Automatically finds and uses available AI providers (OpenAI → Anthropic → Google)

### Development Philosophy (from CLAUDE.md)

- **Simplicity First**: Implement the simplest solution that works
- **No Backward Compatibility**: This is a new project, prioritize improvement
- **Functional Style**: Prefer functions over complex class hierarchies
- **Ruthless Removal**: Aggressively remove unused code
- **Test Everything**: Never claim completion without running pytest

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

# With LangGraph for approval workflows
agent = get_agent(ai_config={
    'use_langgraph': True,       # Enable LangGraph agent
    'require_approval': True,    # Require approval for code execution
    'provider': 'auto'           # Auto-detect AI provider
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

## 📁 Project Structure & Architecture

```
assistant-ui-anywidget/
├── assistant_ui_anywidget/          # Main Python package
│   ├── __init__.py                  # Package exports and global agent interface
│   ├── agent_widget.py              # Core AgentWidget class (consolidated from 2 files)
│   ├── global_agent.py              # Singleton pattern for notebook safety
│   ├── kernel_interface.py          # Direct kernel access and variable inspection
│   ├── kernel_tools.py              # LangChain tools for AI integration
│   ├── simple_handlers.py           # Simplified message handling (reduced by 199 lines)
│   ├── module_inspector.py          # Import analysis for AI context
│   ├── ai/                          # AI service implementations
│   │   ├── langgraph_service.py     # LangGraph approval workflows
│   │   ├── mock.py                  # Development fallback AI
│   │   └── prompt_config.py         # System prompts and configuration
│   └── static/
│       └── index.js                 # Bundled frontend (1.4MB, includes React)
├── frontend/                        # TypeScript/React frontend
│   ├── src/
│   │   ├── index.tsx                # Main chat interface component
│   │   ├── VariableExplorer.tsx     # Kernel variable browser
│   │   ├── kernelApi.ts             # API client for kernel communication
│   │   └── types.ts                 # TypeScript interfaces
│   ├── vite.config.ts               # Build configuration
│   └── package.json                 # Frontend dependencies
├── tests/                           # Comprehensive test suite (129 tests)
│   ├── conftest.py                  # Shared pytest fixtures
│   ├── test_widget_basic.py         # Core functionality tests
│   ├── test_kernel_interface.py     # Kernel access tests
│   ├── test_langgraph_approval.py   # Approval workflow tests
│   └── test_ai_service_regression.py # AI provider tests
├── docs/                            # Architecture documentation
│   ├── DESIGN.md                    # Original design document
│   ├── API_DESIGN.md                # Message protocol specification
│   ├── IMPLEMENTATION_SUMMARY.md    # What's built vs planned
│   └── SIMPLIFICATION_PLAN.md       # Recent refactoring progress
├── examples/                        # Demo notebooks
│   ├── demo_global_agent.ipynb      # Recommended usage pattern
│   └── langgraph_approval_demo.ipynb # Approval workflow example
├── CLAUDE.md                        # Development principles
└── pyproject.toml                   # Python package configuration
```

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Jupyter Notebook                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐         ┌─────────────────────────┐    │
│  │ Python Kernel  │◄────────┤    AgentWidget          │    │
│  │                │         │                         │    │
│  │ - Variables    │         │ - Message Handler      │    │
│  │ - Execution    │         │ - AI Service           │    │
│  │ - State        │         │ - Kernel Interface     │    │
│  └────────────────┘         └───────────┬─────────────┘    │
│                                         │                    │
│                                         │ anywidget         │
│                                         ▼                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           React Frontend (TypeScript)                │    │
│  │                                                      │    │
│  │  - Chat UI with Markdown rendering                  │    │
│  │  - Variable Explorer for kernel inspection          │    │
│  │  - Action buttons for quick commands                │    │
│  │  - Ctrl+D to send (avoids notebook conflicts)       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Technical Details

### Core Technologies

- **Python**: 3.10+ with type hints throughout
- **TypeScript**: Strict mode enabled for frontend
- **React**: 18.x with hooks and functional components
- **AnyWidget**: 0.9.0+ for Jupyter integration
- **LangChain**: For AI tool calling and agent workflows
- **Vite**: Modern frontend build system

### Key Dependencies & Why

- **anywidget**: Provides the Python ↔ JavaScript bridge for Jupyter
- **langchain-community**: Multi-provider AI integration
- **python-dotenv**: Automatic `.env` file loading for API keys
- **@anywidget/react**: React integration for widget development
- **react-markdown**: Markdown rendering in chat interface
- **react-syntax-highlighter**: Code highlighting

### Message Architecture

```python
# Python → JavaScript
widget.send({
    "type": "assistant_message",
    "text": "Here's your analysis...",
    "action_buttons": [{"label": "Run", "action": "execute"}]
})

# JavaScript → Python
model.send({
    type: "user_message",
    text: "Show me all DataFrame variables"
})
```

### AI Provider Integration

1. **Auto-detection**: Checks environment for API keys in order
2. **Provider Priority**: OpenAI → Anthropic → Google → Mock
3. **Unified Interface**: Same API regardless of provider
4. **Conversation Logging**: All interactions saved to `examples/ai_conversation_logs/`

## 📋 Development Workflow

### Initial Setup

```bash
# Clone and setup environment
git clone <repo>
cd assistant-ui-anywidget
uv sync --all-extras          # Install all dependencies
source .venv/bin/activate     # Activate virtual environment

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Run tests to verify setup
pytest
```

### Development Commands

#### Adding Dependencies

```bash
uv add <package>              # Add runtime dependency
uv add --dev <package>        # Add development dependency
```

#### Git Workflow (from CLAUDE.md)

```bash
# Check latest changes
git diff origin/main | cat    # Note: pipe to cat or use --no-pager

# Development cycle
# 1. Make changes
# 2. Run tests: pytest
# 3. Run linting: pre-commit run --all-files
# 4. Add files individually: git add <file>
# 5. Commit with clear message

# NEVER use git add .         # This is critical!
```

### Testing Requirements

```bash
# Python tests (MUST PASS before claiming completion)
pytest                        # Run all tests
pytest tests/test_widget_basic.py  # Run specific test
pytest -v                     # Verbose output
pytest --cov-report=html     # Generate coverage report

# Frontend tests
cd frontend
npm test                      # Run tests
npm run test:ui              # Interactive UI
npm run test:coverage        # Coverage report
```

### Code Quality Tools

```bash
# Pre-commit hooks (MUST RUN before committing)
pre-commit install           # One-time setup
pre-commit run --all-files   # Run all checks

# Individual tools
ruff format assistant_ui_anywidget tests  # Format Python
ruff check assistant_ui_anywidget tests   # Lint Python
mypy assistant_ui_anywidget              # Type check Python

cd frontend
npm run format               # Format TypeScript
npm run lint                 # Lint TypeScript
```

## Development

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

## AI Service Architecture

The widget supports two AI service implementations:

### 1. **Simple Service** (Default)

- Direct tool calling without state management
- Lightweight and fast
- Perfect for basic chat and code execution
- No approval workflows

### 2. **LangGraph Service** (Optional)

- State machine-based agent with approval workflows
- Requires approval for code execution
- Automatic execution for read-only operations
- Extensible for complex multi-step workflows

Enable LangGraph with:

```python
agent = get_agent(ai_config={'use_langgraph': True, 'require_approval': True})
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

## 📊 Current State & Roadmap

### ✅ Implemented Features

- Multi-provider AI support (OpenAI, Anthropic, Google)
- Automatic provider detection from environment
- Jupyter kernel access (read/write variables, execute code)
- Global agent pattern for notebook safety
- LangGraph approval workflows
- Comprehensive test suite (75%+ coverage)
- Modern React UI with TypeScript
- Markdown rendering with syntax highlighting
- Action buttons for interactive operations
- Conversation logging

### ⏳ In Progress

- Advanced UI components (enhanced Variable Explorer)
- Streaming AI responses in UI
- Performance optimizations

### ❌ Future Enhancements (from docs/PLAN.md)

- Vector database for documentation search
- Advanced debugging features (breakpoints, stack traces)
- File upload support
- Rich message formatting
- Message history persistence
- Custom themes
- Export conversations
- Multiple conversation threads

### Recent Changes

- **2025-07-23**: Major simplification effort reduced codebase by 31%
  - Consolidated widget classes (removed 422 lines)
  - Simplified message handling (removed 199 lines)
  - Streamlined AI service (removed 258 lines)
  - See `docs/SIMPLIFICATION_PLAN.md` for details

## 🎯 Quick Reference for AI Assistants

### Common Commands

```bash
# Environment setup
uv sync --all-extras          # Install dependencies
source .venv/bin/activate     # Activate environment

# Testing (CRITICAL - must pass!)
pytest                        # Run all Python tests
pytest -v                     # Verbose test output
cd frontend && npm test       # Run frontend tests

# Code quality
pre-commit run --all-files    # Run all linters/formatters

# Building
cd frontend && npm run build  # Build frontend bundle

# Development
cd frontend && npm run dev    # Frontend hot reload
python take_screenshot.py     # Capture widget screenshot
```

### Key File Locations

- **Main widget**: `assistant_ui_anywidget/agent_widget.py`
- **Kernel access**: `assistant_ui_anywidget/kernel_interface.py`
- **Message handling**: `assistant_ui_anywidget/simple_handlers.py`
- **AI service**: `assistant_ui_anywidget/ai/langgraph_service.py`
- **Frontend entry**: `frontend/src/index.tsx`
- **Tests**: `tests/` directory
- **Development guide**: `CLAUDE.md`

### Important Rules (from CLAUDE.md)

1. **NEVER** use `git add .` - always add files individually
2. **NEVER** claim a task is done without running `pytest`
3. **ALWAYS** run `pre-commit run --all-files` before committing
4. **DO NOT** add backward compatibility (project has no users yet)
5. **PREFER** functional style over complex class hierarchies
6. **AGGRESSIVELY** remove unused code

### Testing a Change

1. Make your changes
2. Run `pytest` - ALL tests must pass
3. Run `pre-commit run --all-files` - fix any issues
4. Test in notebook: `uv run jupyter notebook`
5. Create example in `examples/` if adding features
6. Update relevant documentation

## Architecture

The widget supports:

- **Message synchronization** between Python backend and React frontend
- **Action buttons** for dynamic user interactions
- **Markdown rendering** with syntax highlighting
- **Extensible design** for AI agent integration
- **Modern React patterns** with hooks and TypeScript
- **Kernel isolation** for security and stability

### Architecture Decision Records

1. **Bundled React (1.4MB)**: Maximum compatibility across Jupyter environments
2. **Global Agent Pattern**: Prevents multiple instances and keyboard conflicts
3. **Ctrl+D for Send**: Avoids conflicts with Jupyter's Shift+Enter
4. **Functional Programming**: Simpler to understand and maintain
5. **No Backward Compatibility**: Allows rapid improvement and simplification
6. **LangGraph Optional**: Simple by default, complex workflows when needed

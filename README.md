# Assistant-UI AnyWidget

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://github.com/basnijholt/assistant-ui-anywidget/workflows/CI/badge.svg)](https://github.com/basnijholt/assistant-ui-anywidget/actions)

An AI-powered chat widget for Jupyter notebooks that can directly access and manipulate your kernel variables, execute code, and help with debugging.

## Features

### 🤖 AI Capabilities

- **Multi-provider support**: Works with OpenAI, Anthropic, and Google Gemini
- **Automatic detection**: Uses any available API key from your environment
- **Kernel awareness**: Can read variables, execute code, and see errors
- **Natural language**: Ask questions in plain English about your data
- **No API key? No problem**: Falls back to a helpful mock AI for development

### 🔧 Core Features

- **Safe keyboard shortcuts**: Uses Ctrl+D to send messages (never conflicts with Jupyter)
- **Global agent**: Single instance across all notebook cells
- **Markdown rendering**: Beautiful formatting with syntax highlighting
- **Action buttons**: Interactive buttons for common operations
- **Approval workflows**: Optional LangGraph integration for code execution approval

## Installation

```bash
# Install with all AI providers
pip install assistant-ui-anywidget[ai]

# Or install base package and add providers as needed
pip install assistant-ui-anywidget
```

## Quick Start

### 1. Set up AI (Optional)

Create a `.env` file with your API keys:

```bash
OPENAI_API_KEY=sk-...          # For GPT-4
ANTHROPIC_API_KEY=sk-ant-...    # For Claude
GOOGLE_API_KEY=...              # For Gemini
```

The widget automatically detects available providers. No keys? It'll use a mock AI for development.

### 2. Use in Jupyter

```python
from assistant_ui_anywidget import get_agent

# Display the assistant
agent = get_agent()
agent
```

That's it! The agent will appear in your notebook cell. Use **Ctrl+D** (or Cmd+D on Mac) to send messages.

### 3. Optional Configuration

```python
# Choose a specific AI provider
agent = get_agent(ai_config={
    'provider': 'openai',         # or 'anthropic', 'google_genai'
    'model': 'gpt-4',            # or 'claude-3', 'gemini-pro'
    'require_approval': False,    # Auto-approve code execution
})

# Enable approval workflows
agent = get_agent(ai_config={
    'require_approval': True,     # Ask before executing code
})

# Reset to a fresh instance
agent = get_agent(reset=True)
```

## How It Works

The assistant can:

- **Read your variables**: "Show me all DataFrames in memory"
- **Execute code**: "Create a scatter plot of x vs y"
- **Debug errors**: "Why am I getting this KeyError?"
- **Explain code**: "What does this function do?"

## Examples

```python
# Ask about your data
"What columns does my dataframe have?"
"Show me summary statistics for df"
"Plot a histogram of the age column"

# Get help with errors
"Why am I getting a KeyError?"
"How do I fix this TypeError?"

# Generate code
"Create a function to calculate moving averages"
"Write a class for data validation"
```

## Troubleshooting

**Widget not displaying?**

- Ensure you have Jupyter installed: `pip install jupyter`
- Try restarting your kernel
- Check browser console for errors

**AI not responding?**

- Verify your API keys in `.env` file
- Check you have the AI extra: `pip install assistant-ui-anywidget[ai]`
- The mock AI should work without any keys

## License

MIT - see [LICENSE](LICENSE) file for details.

---

<details>
<summary><h2>🤖 For AI Assistants & Contributors</h2></summary>

### Project Context

This section provides comprehensive context for AI assistants (like Claude) working with this codebase.

### Purpose & Value

- **What**: An AI-powered chat widget for Jupyter notebooks with direct kernel access
- **Why**: Enables natural language interaction with notebook variables, code execution, and debugging
- **Core Innovation**: Prevents keyboard conflicts by using Ctrl+D instead of Shift+Enter for sending messages

### Current State

- **Maturity**: Production-ready with 75%+ test coverage
- **Architecture**: Functional programming style, minimal class hierarchies, aggressive code removal
- **Recent Work**: Major simplification effort reduced codebase by 31%

### Key Technical Decisions

- **Bundled React**: All JS dependencies bundled into single 1.4MB file for maximum compatibility
- **Global Agent Pattern**: Single instance per notebook session to avoid conflicts
- **LangGraph Integration**: Optional state machine for approval workflows
- **Auto-Detection**: Automatically finds and uses available AI providers (OpenAI → Anthropic → Google)

### Development Philosophy

- **Simplicity First**: Implement the simplest solution that works
- **No Backward Compatibility**: This is a new project, prioritize improvement
- **Functional Style**: Prefer functions over complex class hierarchies
- **Ruthless Removal**: Aggressively remove unused code
- **Test Everything**: Never claim completion without running pytest

### Project Structure

```
assistant-ui-anywidget/
├── assistant_ui_anywidget/          # Main Python package
│   ├── __init__.py                  # Package exports and global agent interface
│   ├── agent_widget.py              # Core AgentWidget class
│   ├── global_agent.py              # Singleton pattern for notebook safety
│   ├── kernel_interface.py          # Direct kernel access and variable inspection
│   ├── kernel_tools.py              # LangChain tools for AI integration
│   ├── simple_handlers.py           # Simplified message handling
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
│   └── vite.config.ts               # Build configuration
├── tests/                           # Comprehensive test suite (129 tests)
├── examples/                        # Demo notebooks
├── CLAUDE.md                        # Development principles and workflow
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
│  ┌─────────────────────────────────────────────────┐    │
│  │           React Frontend (TypeScript)                │    │
│  │                                                      │    │
│  │  - Chat UI with Markdown rendering                  │    │
│  │  - Variable Explorer for kernel inspection          │    │
│  │  - Action buttons for quick commands                │    │
│  │  - Ctrl+D to send (avoids notebook conflicts)       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Technical Stack

- **Python 3.10+** with comprehensive type hints
- **TypeScript** with strict mode for frontend
- **React 18** with hooks and functional components
- **AnyWidget** for Jupyter integration
- **LangChain** for AI tool calling
- **Vite** for fast frontend builds

### AI Service Architecture

The widget supports two AI service implementations:

1. **Simple Service (Default)**: Direct tool calling, lightweight and fast
2. **LangGraph Service**: State machine-based with approval workflows

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

### Development Workflow

#### Initial Setup

```bash
# Clone and setup
git clone <repo>
cd assistant-ui-anywidget
uv sync --all-extras          # Install all dependencies
source .venv/bin/activate     # Activate virtual environment

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Verify setup
pytest
```

#### Development Commands

```bash
# Adding dependencies
uv add <package>              # Runtime dependency
uv add --dev <package>        # Development dependency

# Testing (MUST PASS before claiming completion)
pytest                        # Run all Python tests (129 tests, 75%+ coverage)
pytest -v                     # Verbose output
cd frontend && npm test       # Frontend tests (Vitest)

# Code quality (MUST RUN before committing)
pre-commit run --all-files    # Run all checks
ruff format assistant_ui_anywidget tests  # Format Python
mypy assistant_ui_anywidget   # Type check

# Frontend development
cd frontend && npm run dev    # Hot reload
cd frontend && npm run build  # Production build
```

#### Git Workflow

```bash
# Check latest changes
git diff origin/main | cat    # Note: pipe to cat

# Development cycle
# 1. Make changes
# 2. Run tests: pytest
# 3. Run linting: pre-commit run --all-files
# 4. Add files individually: git add <file>
# 5. Commit with clear message

# NEVER use git add .         # This is critical!
```

### Testing Requirements

- **Python**: 129 tests with 75%+ coverage
- **Frontend**: Vitest with React Testing Library
- **All tests must pass** before any commit
- Run `pytest` for Python tests
- Run `cd frontend && npm test` for frontend tests

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

### Architecture Decision Records

1. **Bundled React (1.4MB)**: Maximum compatibility across Jupyter environments
2. **Global Agent Pattern**: Prevents multiple instances and keyboard conflicts
3. **Ctrl+D for Send**: Avoids conflicts with Jupyter's Shift+Enter
4. **Functional Programming**: Simpler to understand and maintain
5. **No Backward Compatibility**: Allows rapid improvement and simplification
6. **LangGraph Optional**: Simple by default, complex workflows when needed

### Current Implementation Status

✅ **Implemented**

- Multi-provider AI support (OpenAI, Anthropic, Google)
- Automatic provider detection from environment
- Jupyter kernel access (read/write variables, execute code)
- Global agent pattern for notebook safety
- LangGraph approval workflows
- Comprehensive test suite (129 tests, 75%+ coverage)
- Modern React UI with TypeScript
- Markdown rendering with syntax highlighting
- Action buttons for interactive operations
- Conversation logging
- CI/CD with GitHub Actions (Python 3.10-3.12)
- Full type safety (mypy + TypeScript)

⏳ **In Progress**

- Advanced UI components (enhanced Variable Explorer)
- Streaming AI responses in UI
- Performance optimizations

❌ **Future Enhancements**

- Vector database for documentation search
- Advanced debugging features (breakpoints, stack traces)
- File upload support
- Rich message formatting
- Message history persistence
- Custom themes
- Export conversations
- Multiple conversation threads

</details>

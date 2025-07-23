# AI Assistant Widget Design Document

## Executive Summary

This document outlines the design for an AI-powered assistant widget for Jupyter Notebooks that has direct access to the running Python kernel. The assistant can:

- Access and analyze existing variables
- View stack traces and debug information
- Execute Python code in the kernel
- Help debug the current notebook
- (Future) Connect to a local vector database for documentation indexing

## Architecture Overview

### Core Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Jupyter Notebook                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────┐         ┌─────────────────────────────┐ │
│  │   Python Kernel      │◄────────┤    AgentWidget (Python)     │ │
│  │                      │         │                             │ │
│  │  - User Variables    │         │  - Kernel Communication     │ │
│  │  - Stack Traces      │         │  - Code Execution          │ │
│  │  - Module State      │         │  - Variable Inspection     │ │
│  │  - Execution Context │         │  - AI Integration          │ │
│  └─────────────────────┘         └──────────┬──────────────────┘ │
│                                              │                     │
│                                              │ anywidget          │
│                                              │                     │
│  ┌─────────────────────────────────────────┴──────────────────┐ │
│  │              React Frontend (TypeScript)                     │ │
│  │                                                              │ │
│  │  - Chat Interface                                           │ │
│  │  - Code Display with Syntax Highlighting                    │ │
│  │  - Variable Explorer UI                                     │ │
│  │  - Debug Information Display                                │ │
│  │  - Action Buttons for Quick Commands                        │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Future
                                    ▼
                        ┌─────────────────────┐
                        │  Vector Database    │
                        │  (Documentation)    │
                        └─────────────────────┘
```

## Detailed Component Design

### 1. Python Backend (`agent_widget.py`)

#### Enhanced AgentWidget Class

```python
class AgentWidget(anywidget.AnyWidget):
    """AI-powered assistant widget with kernel access."""

    # Existing traits
    message = traitlets.Unicode("").tag(sync=True)
    chat_history = traitlets.List([]).tag(sync=True)
    action_buttons = traitlets.List([]).tag(sync=True)

    # New traits for kernel interaction
    kernel_state = traitlets.Dict({}).tag(sync=True)  # Current kernel state info
    code_result = traitlets.Dict({}).tag(sync=True)   # Result of code execution
    variables_info = traitlets.List([]).tag(sync=True) # Variable inspection data
    debug_info = traitlets.Dict({}).tag(sync=True)    # Debug/trace information

    # AI assistant configuration
    ai_config = traitlets.Dict({
        'model': 'gpt-4',
        'temperature': 0.7,
        'max_tokens': 2000,
        'system_prompt': 'You are a helpful AI assistant...'
    }).tag(sync=True)
```

#### Key Methods

```python
def inspect_variable(self, var_name: str) -> dict:
    """Inspect a variable in the kernel namespace."""

def execute_code(self, code: str, capture_output: bool = True) -> dict:
    """Execute code in the kernel and return results."""

def get_stack_trace(self) -> dict:
    """Get current stack trace if available."""

def get_kernel_state(self) -> dict:
    """Get current kernel state including variables, modules, etc."""

def process_ai_request(self, user_message: str, context: dict) -> str:
    """Process user message with AI, including kernel context."""
```

### 2. Kernel Communication Layer

#### IPython Integration

```python
class KernelInterface:
    """Interface for interacting with the IPython kernel."""

    def __init__(self):
        self.shell = get_ipython()  # Get current IPython instance

    def get_namespace(self) -> dict:
        """Get current namespace variables."""
        return self.shell.user_ns

    def execute_code(self, code: str) -> ExecutionResult:
        """Execute code and capture output."""
        result = self.shell.run_cell(code, store_history=False)
        return self._format_result(result)

    def get_variable_info(self, var_name: str) -> dict:
        """Get detailed information about a variable."""
        # Type, size, preview, attributes, methods, etc.

    def get_last_error(self) -> dict:
        """Get information about the last error."""
        # Traceback, exception type, message, etc.
```

### 3. AI Integration Layer

#### AI Assistant Core

```python
class AIAssistant:
    """Core AI assistant logic with kernel awareness."""

    def __init__(self, config: dict):
        self.config = config
        self.context_builder = ContextBuilder()

    def process_request(self, message: str, kernel_state: dict) -> dict:
        """Process user request with full kernel context."""

        # Build context from kernel state
        context = self.context_builder.build(
            message=message,
            variables=kernel_state['variables'],
            recent_code=kernel_state['history'],
            errors=kernel_state['errors']
        )

        # Generate AI response
        response = self._call_ai(context)

        # Parse response for code blocks, explanations, etc.
        return self._parse_response(response)

    def suggest_debug_steps(self, error_info: dict) -> list[str]:
        """Suggest debugging steps based on error."""

    def explain_code(self, code: str, context: dict) -> str:
        """Explain code in the context of current kernel state."""
```

### 4. Frontend Enhancements

#### New UI Components

```typescript
// Variable Explorer Component
interface VariableExplorerProps {
  variables: Variable[];
  onInspect: (varName: string) => void;
}

// Code Execution Component
interface CodeExecutorProps {
  onExecute: (code: string) => void;
  result: ExecutionResult | null;
}

// Debug Panel Component
interface DebugPanelProps {
  debugInfo: DebugInfo;
  onAction: (action: string) => void;
}

// Enhanced Chat Component
interface EnhancedChatProps {
  messages: Message[];
  kernelState: KernelState;
  onSendMessage: (message: string) => void;
  onExecuteCode: (code: string) => void;
}
```

#### State Management

```typescript
interface WidgetState {
  // Chat state
  messages: Message[];
  input: string;

  // Kernel state
  variables: Variable[];
  executionHistory: Execution[];
  currentError: Error | null;

  // AI state
  isProcessing: boolean;
  suggestions: Suggestion[];

  // UI state
  activePanel: "chat" | "variables" | "debug";
  codePreview: string | null;
}
```

### 5. Communication Protocol

#### Message Types

```typescript
// Python → Frontend
interface KernelStateUpdate {
  type: "kernel_state_update";
  variables: Variable[];
  modules: string[];
  history: string[];
}

interface CodeExecutionResult {
  type: "code_execution_result";
  success: boolean;
  output: string;
  error?: ErrorInfo;
}

interface AIResponse {
  type: "ai_response";
  message: string;
  code_blocks: CodeBlock[];
  suggestions: string[];
}

// Frontend → Python
interface ExecuteCodeRequest {
  type: "execute_code";
  code: string;
  capture_output: boolean;
}

interface InspectVariableRequest {
  type: "inspect_variable";
  var_name: string;
  deep: boolean;
}

interface AIRequest {
  type: "ai_request";
  message: string;
  include_context: boolean;
}
```

## Key Features

### 1. Variable Inspection

- Real-time view of kernel namespace
- Deep inspection with type info, size, preview
- Support for complex objects (DataFrames, arrays, etc.)
- Variable history tracking

### 2. Code Execution

- Execute code snippets from chat
- Capture and display output
- Handle errors gracefully
- Maintain execution history

### 3. Debugging Support

- Automatic error detection
- Stack trace visualization
- Contextual debugging suggestions
- Step-by-step debugging guidance

### 4. AI-Powered Assistance

- Context-aware responses using kernel state
- Code generation with current variables
- Explanation of existing code
- Debugging help based on errors

### 5. Interactive Features

- Quick action buttons for common tasks
- Code snippet copying
- Variable exploration UI
- Debug control panel

## Security Considerations

### Code Execution Safety

- Sandboxed execution environment
- Configurable execution permissions
- Code validation before execution
- Audit logging of all executions

### Data Privacy

- Local-only processing by default
- Configurable AI endpoint
- No automatic data transmission
- Clear indication when AI is used

## Future Enhancements

### 1. Vector Database Integration

```python
class DocumentationIndex:
    """Local vector database for documentation."""

    def __init__(self, db_path: str):
        self.db = VectorDatabase(db_path)

    def index_documentation(self, package: str):
        """Index package documentation."""

    def search(self, query: str, context: dict) -> list[Document]:
        """Search documentation with context."""
```

### 2. Advanced Features

- Multi-cell analysis
- Notebook-wide refactoring suggestions
- Performance profiling integration
- Git integration for version control
- Collaborative features

## Implementation Phases

### Phase 1: Core Kernel Integration (Current)

- [x] Basic widget structure
- [ ] Kernel communication interface
- [ ] Variable inspection
- [ ] Code execution

### Phase 2: AI Integration

- [ ] AI service integration
- [ ] Context-aware responses
- [ ] Debug assistance
- [ ] Code generation

### Phase 3: Enhanced UI

- [ ] Variable explorer
- [ ] Debug panel
- [ ] Code preview
- [ ] Advanced chat features

### Phase 4: Vector Database

- [ ] Local vector DB setup
- [ ] Documentation indexing
- [ ] Contextual search
- [ ] Package-specific help

## API Design

### Python API

```python
# Creating the widget
widget = AgentWidget(
    ai_config={
        'model': 'gpt-4',
        'api_key': 'your-key',
        'temperature': 0.7
    }
)

# Programmatic interaction
widget.inspect_variable('df')
widget.execute_code('df.head()')
widget.add_message('assistant', 'Here is the analysis...')

# Event handlers
widget.on_code_execution = lambda result: print(f"Executed: {result}")
widget.on_variable_change = lambda var: print(f"Changed: {var}")
```

### Frontend API

```typescript
// Custom hooks
const { variables, executeCode } = useKernelState();
const { sendMessage, messages } = useChat();
const { inspect, variableInfo } = useVariableInspector();

// Event handling
onCodeExecute={(code) => {
  executeCode(code);
  trackExecution(code);
}}

onVariableInspect={(varName) => {
  inspect(varName);
  showVariablePanel();
}}
```

## Testing Strategy

### Unit Tests

- Kernel communication layer
- AI integration logic
- Variable inspection
- Code execution safety

### Integration Tests

- Widget-kernel interaction
- Frontend-backend sync
- AI response handling
- Error scenarios

### End-to-End Tests

- Full user workflows
- Debug scenarios
- Performance testing
- Security testing

## Performance Considerations

### Optimization Strategies

- Lazy loading of variable data
- Debounced kernel state updates
- Efficient message serialization
- Caching of AI responses
- Virtual scrolling for large outputs

### Benchmarks

- Variable inspection: <100ms for most types
- Code execution: Native kernel speed
- AI response: <2s for typical queries
- UI updates: 60fps maintained

## Conclusion

This design provides a comprehensive foundation for building an AI-powered assistant widget with deep kernel integration. The modular architecture allows for incremental development while maintaining flexibility for future enhancements.

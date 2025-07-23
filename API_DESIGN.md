# API Design: Assistant-Kernel Communication

## Overview

This document defines the API for communication between the AI assistant and the Jupyter kernel. The design prioritizes safety, extensibility, and clear separation of concerns.

## Core Message Protocol

### Message Structure

All messages follow a consistent structure:

```typescript
interface BaseMessage {
  id: string;           // Unique message ID for tracking
  timestamp: number;    // Unix timestamp
  type: string;         // Message type identifier
  version: string;      // API version (e.g., "1.0.0")
}

interface Request extends BaseMessage {
  params?: unknown;     // Request-specific parameters
}

interface Response extends BaseMessage {
  request_id: string;   // ID of the request this responds to
  success: boolean;     // Whether the operation succeeded
  data?: unknown;       // Response data (if success)
  error?: ErrorInfo;    // Error information (if failed)
}

interface ErrorInfo {
  code: string;         // Error code (e.g., "VARIABLE_NOT_FOUND")
  message: string;      // Human-readable error message
  details?: unknown;    // Additional error context
}
```

## Kernel Interaction APIs

### 1. Variable Management

#### Get Variables List
```typescript
// Request
interface GetVariablesRequest extends Request {
  type: 'get_variables';
  params: {
    filter?: {
      types?: string[];      // Filter by type (e.g., ['DataFrame', 'ndarray'])
      pattern?: string;      // Name pattern (regex)
      exclude_private?: boolean; // Exclude names starting with _
      max_preview_size?: number; // Max size for value preview
    };
    sort?: {
      by: 'name' | 'type' | 'size' | 'modified';
      order: 'asc' | 'desc';
    };
  };
}

// Response
interface GetVariablesResponse extends Response {
  type: 'get_variables';
  data: {
    variables: VariableInfo[];
    total_count: number;
    filtered_count: number;
  };
}

interface VariableInfo {
  name: string;
  type: string;          // Type name (e.g., 'DataFrame', 'int')
  type_str: string;      // Full type string
  size: number | null;   // Size in bytes (if applicable)
  shape?: number[];      // Shape for arrays/dataframes
  preview?: string;      // String preview of value
  is_callable: boolean;
  attributes?: string[]; // List of attributes (limited)
  last_modified?: number; // Timestamp of last modification
}
```

#### Inspect Variable
```typescript
// Request
interface InspectVariableRequest extends Request {
  type: 'inspect_variable';
  params: {
    name: string;
    deep: boolean;           // Deep inspection
    include_methods?: boolean;
    include_source?: boolean; // Include source code if available
    max_depth?: number;      // Max recursion depth
  };
}

// Response
interface InspectVariableResponse extends Response {
  type: 'inspect_variable';
  data: {
    name: string;
    info: DetailedVariableInfo;
  };
}

interface DetailedVariableInfo extends VariableInfo {
  value?: unknown;           // Actual value (for simple types)
  repr: string;             // repr() output
  str: string;              // str() output
  doc?: string;             // Docstring
  source?: string;          // Source code (if available)
  methods?: MethodInfo[];
  attributes_detail?: AttributeInfo[];
  memory_usage?: number;    // Memory usage in bytes
}
```

### 2. Code Execution

#### Execute Code
```typescript
// Request
interface ExecuteCodeRequest extends Request {
  type: 'execute_code';
  params: {
    code: string;
    mode: 'exec' | 'eval' | 'single';  // Execution mode
    capture_output: boolean;
    silent?: boolean;         // Don't add to history
    store_result?: boolean;   // Store in _ variables
    timeout?: number;         // Execution timeout in ms
  };
}

// Response
interface ExecuteCodeResponse extends Response {
  type: 'execute_code';
  data: {
    execution_count: number;
    outputs: Output[];
    execution_time: number;   // Time in ms
    variables_changed?: string[]; // Names of changed variables
  };
}

interface Output {
  type: 'stream' | 'display_data' | 'execute_result' | 'error';
  name?: 'stdout' | 'stderr';  // For stream outputs
  text?: string;               // For stream/error outputs
  data?: Record<string, unknown>; // MIME type -> data
  metadata?: Record<string, unknown>;
  traceback?: string[];        // For errors
}
```

#### Interrupt Execution
```typescript
// Request
interface InterruptExecutionRequest extends Request {
  type: 'interrupt_execution';
  params: {
    force?: boolean;  // Force interrupt
  };
}
```

### 3. Debugging Support

#### Get Stack Trace
```typescript
// Request
interface GetStackTraceRequest extends Request {
  type: 'get_stack_trace';
  params: {
    include_locals?: boolean;
    include_source?: boolean;
    max_frames?: number;
  };
}

// Response
interface GetStackTraceResponse extends Response {
  type: 'get_stack_trace';
  data: {
    frames: StackFrame[];
    exception?: ExceptionInfo;
    is_active: boolean;  // Whether currently in error state
  };
}

interface StackFrame {
  filename: string;
  line_number: number;
  function_name: string;
  source?: string[];      // Source code lines
  locals?: Record<string, unknown>;
  is_current: boolean;    // Current execution frame
}

interface ExceptionInfo {
  type: string;
  message: string;
  traceback: string[];
}
```

#### Set Breakpoint
```typescript
// Request
interface SetBreakpointRequest extends Request {
  type: 'set_breakpoint';
  params: {
    filename?: string;     // Current file if not specified
    line_number: number;
    condition?: string;    // Conditional breakpoint
    temporary?: boolean;
  };
}
```

### 4. History and State

#### Get Execution History
```typescript
// Request
interface GetHistoryRequest extends Request {
  type: 'get_history';
  params: {
    n_items?: number;      // Number of items (default: 10)
    session_only?: boolean; // Current session only
    include_output?: boolean;
    search?: string;       // Search in history
  };
}

// Response
interface GetHistoryResponse extends Response {
  type: 'get_history';
  data: {
    items: HistoryItem[];
    total_count: number;
  };
}

interface HistoryItem {
  execution_count: number;
  timestamp: number;
  input: string;
  output?: Output[];
  success: boolean;
}
```

#### Get Kernel Info
```typescript
// Request
interface GetKernelInfoRequest extends Request {
  type: 'get_kernel_info';
}

// Response
interface GetKernelInfoResponse extends Response {
  type: 'get_kernel_info';
  data: {
    kernel_id: string;
    language: string;
    language_version: string;
    protocol_version: string;
    status: 'idle' | 'busy' | 'starting';
    execution_count: number;
    start_time: number;
    last_activity: number;
    connections: number;
  };
}
```

## AI Assistant APIs

### 1. AI Requests

#### Process AI Request
```typescript
// Request
interface AIRequest extends Request {
  type: 'ai_request';
  params: {
    message: string;
    context: {
      include_variables?: boolean | string[]; // true, false, or specific vars
      include_history?: number;              // Number of history items
      include_errors?: boolean;
      include_cell_context?: boolean;        // Current cell content
    };
    options?: {
      temperature?: number;
      max_tokens?: number;
      model?: string;
      system_prompt?: string;
    };
  };
}

// Response
interface AIResponse extends Response {
  type: 'ai_response';
  data: {
    message: string;
    suggestions?: CodeSuggestion[];
    explanations?: Explanation[];
    relevant_docs?: Documentation[];
    confidence: number;
    tokens_used: number;
  };
}

interface CodeSuggestion {
  code: string;
  description: string;
  confidence: number;
  auto_execute?: boolean;
}

interface Explanation {
  topic: string;
  content: string;
  code_examples?: string[];
}
```

### 2. AI-Assisted Debugging

#### Analyze Error
```typescript
// Request
interface AnalyzeErrorRequest extends Request {
  type: 'analyze_error';
  params: {
    error: ExceptionInfo;
    context: {
      code?: string;
      variables?: string[];
      recent_history?: number;
    };
  };
}

// Response
interface AnalyzeErrorResponse extends Response {
  type: 'analyze_error';
  data: {
    analysis: string;
    possible_causes: string[];
    suggestions: DebugSuggestion[];
    relevant_docs?: Documentation[];
  };
}

interface DebugSuggestion {
  description: string;
  code?: string;
  check_command?: string;  // Command to verify the issue
  priority: 'high' | 'medium' | 'low';
}
```

## Widget State Management

### State Synchronization
```typescript
// Kernel → Widget state updates
interface KernelStateUpdate {
  type: 'kernel_state_update';
  state: {
    status: 'idle' | 'busy' | 'error';
    execution_count: number;
    variables_summary: {
      total: number;
      by_type: Record<string, number>;
    };
    last_error?: ExceptionInfo;
    current_cell?: number;
  };
}

// Widget configuration
interface WidgetConfig {
  auto_refresh_variables: boolean;
  auto_capture_errors: boolean;
  execution_timeout: number;
  ai_enabled: boolean;
  ai_auto_suggest: boolean;
  debug_mode: boolean;
}
```

## Event Subscriptions

### Subscribe to Events
```typescript
// Request
interface SubscribeRequest extends Request {
  type: 'subscribe';
  params: {
    events: EventType[];
    throttle?: number;  // Throttle updates (ms)
  };
}

type EventType = 
  | 'variable_changed'
  | 'execution_started'
  | 'execution_completed'
  | 'error_occurred'
  | 'kernel_status_changed'
  | 'cell_changed';

// Event notifications
interface EventNotification extends BaseMessage {
  type: 'event';
  event_type: EventType;
  data: unknown;  // Event-specific data
}
```

## Security and Permissions

### Permission Model
```typescript
interface Permissions {
  execute_code: boolean;
  read_variables: boolean;
  modify_variables: boolean;
  access_history: boolean;
  use_ai: boolean;
  debug: boolean;
}

// Request permission
interface RequestPermissionRequest extends Request {
  type: 'request_permission';
  params: {
    permission: keyof Permissions;
    reason: string;
  };
}
```

## Rate Limiting and Quotas

```typescript
interface RateLimits {
  requests_per_minute: number;
  ai_requests_per_hour: number;
  max_execution_time: number;
  max_variable_size: number;
}

interface QuotaInfo {
  used: RateLimits;
  limits: RateLimits;
  reset_time: number;
}
```

## Error Codes

```typescript
enum ErrorCode {
  // General errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  RATE_LIMITED = 'RATE_LIMITED',
  
  // Variable errors
  VARIABLE_NOT_FOUND = 'VARIABLE_NOT_FOUND',
  VARIABLE_TOO_LARGE = 'VARIABLE_TOO_LARGE',
  INSPECTION_FAILED = 'INSPECTION_FAILED',
  
  // Execution errors
  EXECUTION_ERROR = 'EXECUTION_ERROR',
  EXECUTION_TIMEOUT = 'EXECUTION_TIMEOUT',
  SYNTAX_ERROR = 'SYNTAX_ERROR',
  
  // AI errors
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR',
  AI_CONTEXT_TOO_LARGE = 'AI_CONTEXT_TOO_LARGE',
  AI_UNAVAILABLE = 'AI_UNAVAILABLE',
  
  // Kernel errors
  KERNEL_NOT_READY = 'KERNEL_NOT_READY',
  KERNEL_DEAD = 'KERNEL_DEAD',
  KERNEL_BUSY = 'KERNEL_BUSY',
}
```

## Usage Examples

### Python Side Implementation

```python
class KernelAPIHandler:
    """Handles API requests from the widget."""
    
    def handle_request(self, request: dict) -> dict:
        """Route request to appropriate handler."""
        handlers = {
            'get_variables': self.handle_get_variables,
            'inspect_variable': self.handle_inspect_variable,
            'execute_code': self.handle_execute_code,
            'ai_request': self.handle_ai_request,
            # ... more handlers
        }
        
        handler = handlers.get(request['type'])
        if not handler:
            return self.error_response(
                request['id'],
                ErrorCode.INVALID_REQUEST,
                f"Unknown request type: {request['type']}"
            )
            
        try:
            return handler(request)
        except Exception as e:
            return self.error_response(
                request['id'],
                ErrorCode.UNKNOWN_ERROR,
                str(e)
            )
```

### Frontend Usage

```typescript
class KernelAPI {
  private sendRequest<T extends Response>(
    request: Request
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = generateId();
      const fullRequest = { ...request, id, timestamp: Date.now() };
      
      this.pendingRequests.set(id, { resolve, reject });
      this.model.send(fullRequest);
    });
  }
  
  async getVariables(filter?: VariableFilter): Promise<VariableInfo[]> {
    const response = await this.sendRequest<GetVariablesResponse>({
      type: 'get_variables',
      params: { filter }
    });
    
    return response.data.variables;
  }
  
  async executeCode(code: string): Promise<Output[]> {
    const response = await this.sendRequest<ExecuteCodeResponse>({
      type: 'execute_code',
      params: {
        code,
        mode: 'exec',
        capture_output: true
      }
    });
    
    return response.data.outputs;
  }
}
```

## Best Practices

1. **Always validate requests** before processing
2. **Use appropriate timeouts** for long-running operations
3. **Implement proper error handling** with meaningful error codes
4. **Throttle updates** to prevent overwhelming the UI
5. **Sanitize code** before execution
6. **Respect permissions** and user settings
7. **Log all operations** for debugging and audit
8. **Version the API** to support backward compatibility
9. **Use type guards** to ensure type safety
10. **Implement circuit breakers** for external services (AI)
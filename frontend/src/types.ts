/**
 * Type definitions for the kernel interaction API
 */

// Base message types
export interface BaseMessage {
  id: string;
  timestamp: number;
  type: string;
  version: string;
}

export interface Request extends BaseMessage {
  params?: unknown;
}

export interface Response extends BaseMessage {
  request_id: string;
  success: boolean;
  data?: unknown;
  error?: ErrorInfo;
}

export interface ErrorInfo {
  code: string;
  message: string;
  details?: unknown;
}

// Variable management types
export interface VariableInfo {
  name: string;
  type: string;
  type_str: string;
  size: number | null;
  shape?: number[];
  preview: string;
  is_callable: boolean;
  attributes?: string[];
  last_modified?: number;
}

export interface GetVariablesRequest extends Request {
  type: "get_variables";
  params?: {
    filter?: {
      types?: string[];
      pattern?: string;
      exclude_private?: boolean;
      max_preview_size?: number;
    };
    sort?: {
      by: "name" | "type" | "size" | "modified";
      order: "asc" | "desc";
    };
  };
}

export interface GetVariablesResponse extends Response {
  type: "get_variables";
  data: {
    variables: VariableInfo[];
    total_count: number;
    filtered_count: number;
  };
}

// Code execution types
export interface ExecuteCodeRequest extends Request {
  type: "execute_code";
  params: {
    code: string;
    mode?: "exec" | "eval" | "single";
    capture_output?: boolean;
    silent?: boolean;
    store_result?: boolean;
    timeout?: number;
  };
}

export interface ExecuteCodeResponse extends Response {
  type: "execute_code";
  data: {
    execution_count: number;
    outputs: Output[];
    execution_time: number;
    variables_changed?: string[];
  };
}

export interface Output {
  type: "stream" | "display_data" | "execute_result" | "error";
  name?: "stdout" | "stderr";
  text?: string;
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  traceback?: string[];
}

// Variable inspection types
export interface InspectVariableRequest extends Request {
  type: "inspect_variable";
  params: {
    name: string;
    deep?: boolean;
    include_methods?: boolean;
    include_source?: boolean;
    max_depth?: number;
  };
}

export interface InspectVariableResponse extends Response {
  type: "inspect_variable";
  data: {
    name: string;
    info: DetailedVariableInfo;
  };
}

export interface DetailedVariableInfo extends VariableInfo {
  value?: unknown;
  repr: string;
  str: string;
  doc?: string;
  source?: string;
  methods?: MethodInfo[];
  attributes_detail?: AttributeInfo[];
  memory_usage?: number;
}

export interface MethodInfo {
  name: string;
  type: string;
}

export interface AttributeInfo {
  name: string;
  type: string;
  value?: unknown;
}

// Kernel state types
export interface KernelState {
  available: boolean;
  status: "idle" | "busy" | "error" | "not_connected";
  execution_count: number;
  namespace_size: number;
  variables_by_type: Record<string, number>;
}

// Message types
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  metadata?: {
    execution_time?: number;
    tokens_used?: number;
    model?: string;
  };
}

export interface ActionButton {
  text: string;
  color?: string;
  icon?: string;
  tooltip?: string;
}

// Error codes
export enum ErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  INVALID_REQUEST = "INVALID_REQUEST",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  RATE_LIMITED = "RATE_LIMITED",
  VARIABLE_NOT_FOUND = "VARIABLE_NOT_FOUND",
  VARIABLE_TOO_LARGE = "VARIABLE_TOO_LARGE",
  INSPECTION_FAILED = "INSPECTION_FAILED",
  EXECUTION_ERROR = "EXECUTION_ERROR",
  EXECUTION_TIMEOUT = "EXECUTION_TIMEOUT",
  SYNTAX_ERROR = "SYNTAX_ERROR",
  KERNEL_NOT_READY = "KERNEL_NOT_READY",
  KERNEL_DEAD = "KERNEL_DEAD",
  KERNEL_BUSY = "KERNEL_BUSY",
}

// Widget model state
export interface WidgetModel {
  message: string;
  chat_history: ChatMessage[];
  action_buttons: ActionButton[];
  kernel_state: KernelState;
  code_result: ExecuteCodeResponse | null;
  variables_info: VariableInfo[];
  debug_info: any;
}

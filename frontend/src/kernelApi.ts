/**
 * Kernel API service for communicating with the Python backend
 */

// Simple UUID v4 generator to avoid external dependency
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
import type {
  Request,
  Response,
  GetVariablesRequest,
  GetVariablesResponse,
  ExecuteCodeRequest,
  ExecuteCodeResponse,
  InspectVariableResponse,
  VariableInfo,
  Output,
  DetailedVariableInfo,
} from './types';

export class KernelAPI {
  private model: any; // anywidget model
  private pendingRequests: Map<string, {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = new Map();

  constructor(model: any) {
    this.model = model;
    
    // Listen for API responses
    this.model.on('msg:custom', this.handleMessage.bind(this));
  }

  private handleMessage(msg: any) {
    if (msg.type === 'api_response' && msg.response) {
      const response = msg.response as Response;
      const pending = this.pendingRequests.get(response.request_id);
      
      if (pending) {
        this.pendingRequests.delete(response.request_id);
        
        if (response.success) {
          pending.resolve(response);
        } else {
          pending.reject(response.error);
        }
      }
    }
  }

  private sendRequest<T extends Response>(request: Omit<Request, 'id' | 'timestamp' | 'version'>): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const fullRequest: Request = {
        ...request,
        id,
        timestamp: Date.now(),
        version: '1.0.0',
      };

      // Store the promise handlers
      this.pendingRequests.set(id, { resolve, reject });

      // Send the request
      this.model.send({
        type: 'api_request',
        request: fullRequest,
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 30000);
    });
  }

  // Variable management
  async getVariables(params?: GetVariablesRequest['params']): Promise<VariableInfo[]> {
    const response = await this.sendRequest<GetVariablesResponse>({
      type: 'get_variables',
      params,
    });
    
    return response.data.variables;
  }

  async inspectVariable(name: string, deep = false): Promise<DetailedVariableInfo> {
    const response = await this.sendRequest<InspectVariableResponse>({
      type: 'inspect_variable',
      params: { name, deep },
    });
    
    return response.data.info;
  }

  // Code execution
  async executeCode(code: string, options?: Partial<ExecuteCodeRequest['params']>): Promise<Output[]> {
    const response = await this.sendRequest<ExecuteCodeResponse>({
      type: 'execute_code',
      params: {
        code,
        mode: 'exec',
        capture_output: true,
        ...options,
      },
    });
    
    return response.data.outputs;
  }

  // Kernel info
  async getKernelInfo(): Promise<any> {
    const response = await this.sendRequest({
      type: 'get_kernel_info',
    });
    
    return response.data;
  }

  // History
  async getHistory(params?: any): Promise<any> {
    const response = await this.sendRequest({
      type: 'get_history',
      params,
    });
    
    return response.data;
  }

  // Stack trace
  async getStackTrace(params?: any): Promise<any> {
    const response = await this.sendRequest({
      type: 'get_stack_trace',
      params,
    });
    
    return response.data;
  }
}

// Helper function to create API instance
export function createKernelAPI(model: any): KernelAPI {
  return new KernelAPI(model);
}
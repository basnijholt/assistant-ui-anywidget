/**
 * Tests for KernelAPI
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { KernelAPI } from "./kernelApi";

describe("KernelAPI", () => {
  let mockModel: any;
  let api: KernelAPI;
  let messageHandler: (msg: any) => void;

  beforeEach(() => {
    // Create mock model
    mockModel = {
      send: vi.fn(),
      on: vi.fn((event: string, handler: (msg: any) => void) => {
        if (event === "msg:custom") {
          messageHandler = handler;
        }
      }),
    };

    api = new KernelAPI(mockModel);
  });

  describe("constructor", () => {
    it("should set up message listener", () => {
      expect(mockModel.on).toHaveBeenCalledWith("msg:custom", expect.any(Function));
    });
  });

  describe("getVariables", () => {
    it("should send get_variables request and return variables", async () => {
      const mockVariables = [
        { name: "x", type: "int", preview: "42" },
        { name: "y", type: "str", preview: "'hello'" },
      ];

      // Start the request
      const promise = api.getVariables();

      // Verify request was sent
      expect(mockModel.send).toHaveBeenCalledWith({
        type: "api_request",
        request: {
          type: "get_variables",
          params: undefined,
          id: expect.any(String),
          timestamp: expect.any(Number),
          version: "1.0.0",
        },
      });

      // Get the request ID
      const sentRequest = mockModel.send.mock.calls[0][0].request;
      const requestId = sentRequest.id;

      // Simulate response
      messageHandler({
        type: "api_response",
        response: {
          request_id: requestId,
          success: true,
          data: {
            variables: mockVariables,
            total_count: 2,
            filtered_count: 2,
          },
        },
      });

      // Check result
      const result = await promise;
      expect(result).toEqual(mockVariables);
    });

    it("should handle filters", async () => {
      const filters = {
        filter: {
          types: ["DataFrame"],
          exclude_private: true,
        },
        sort: {
          by: "name" as const,
          order: "asc" as const,
        },
      };

      api.getVariables(filters);

      expect(mockModel.send).toHaveBeenCalledWith({
        type: "api_request",
        request: {
          type: "get_variables",
          params: filters,
          id: expect.any(String),
          timestamp: expect.any(Number),
          version: "1.0.0",
        },
      });
    });
  });

  describe("executeCode", () => {
    it("should execute code and return outputs", async () => {
      const code = 'print("Hello")';
      const mockOutputs = [{ type: "stream", name: "stdout", text: "Hello\n" }];

      const promise = api.executeCode(code);

      // Get request ID
      const sentRequest = mockModel.send.mock.calls[0][0].request;
      const requestId = sentRequest.id;

      // Verify request
      expect(sentRequest).toMatchObject({
        type: "execute_code",
        params: {
          code,
          mode: "exec",
          capture_output: true,
        },
      });

      // Send response
      messageHandler({
        type: "api_response",
        response: {
          request_id: requestId,
          success: true,
          data: {
            execution_count: 1,
            outputs: mockOutputs,
            execution_time: 10,
          },
        },
      });

      const result = await promise;
      expect(result).toEqual(mockOutputs);
    });
  });

  describe("inspectVariable", () => {
    it("should inspect variable and return detailed info", async () => {
      const mockInfo = {
        name: "df",
        type: "DataFrame",
        shape: [100, 5],
        preview: "   A  B  C\n0  1  2  3",
      };

      const promise = api.inspectVariable("df", true);

      const sentRequest = mockModel.send.mock.calls[0][0].request;
      expect(sentRequest).toMatchObject({
        type: "inspect_variable",
        params: { name: "df", deep: true },
      });

      // Send response
      messageHandler({
        type: "api_response",
        response: {
          request_id: sentRequest.id,
          success: true,
          data: { name: "df", info: mockInfo },
        },
      });

      const result = await promise;
      expect(result).toEqual(mockInfo);
    });
  });

  describe("error handling", () => {
    it("should reject on error response", async () => {
      const promise = api.getVariables();
      const sentRequest = mockModel.send.mock.calls[0][0].request;

      messageHandler({
        type: "api_response",
        response: {
          request_id: sentRequest.id,
          success: false,
          error: {
            code: "KERNEL_NOT_READY",
            message: "Kernel is not available",
          },
        },
      });

      await expect(promise).rejects.toEqual({
        code: "KERNEL_NOT_READY",
        message: "Kernel is not available",
      });
    });

    it("should timeout after 30 seconds", async () => {
      vi.useFakeTimers();
      const promise = api.getVariables();

      // Fast-forward time
      vi.advanceTimersByTime(30001);

      await expect(promise).rejects.toThrow("Request timeout");
      vi.useRealTimers();
    });
  });
});

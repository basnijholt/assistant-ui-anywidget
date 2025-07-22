import { describe, it, expect } from "vitest";

describe("Basic Test Suite", () => {
  it("should run basic tests", () => {
    expect(2 + 2).toBe(4);
  });

  it("should handle string operations", () => {
    expect("hello world".toUpperCase()).toBe("HELLO WORLD");
  });

  it("should work with arrays", () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });

  it("should work with objects", () => {
    const obj = { name: "test", value: 42 };
    expect(obj).toHaveProperty("name");
    expect(obj.name).toBe("test");
  });
});

describe("Widget Utilities", () => {
  it("should validate message format", () => {
    const isValidMessage = (msg: { role: string; content: string }) => {
      return (
        Boolean(msg.role) &&
        Boolean(msg.content) &&
        typeof msg.role === "string" &&
        typeof msg.content === "string"
      );
    };

    expect(isValidMessage({ role: "user", content: "hello" })).toBe(true);
    expect(isValidMessage({ role: "", content: "hello" })).toBe(false);
    expect(isValidMessage({ role: "user", content: "" })).toBe(false);
  });

  it("should handle button configurations", () => {
    const normalizeButton = (button: string | { text: string; color?: string }) => {
      return typeof button === "string" ? { text: button } : button;
    };

    expect(normalizeButton("Click me")).toEqual({ text: "Click me" });
    expect(normalizeButton({ text: "Submit", color: "blue" })).toEqual({
      text: "Submit",
      color: "blue",
    });
  });
});

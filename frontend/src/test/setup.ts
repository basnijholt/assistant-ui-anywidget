import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock AnyWidget to avoid import errors
vi.mock("@anywidget/react", () => ({
  createRender: vi.fn(() => vi.fn()),
  useModelState: vi.fn(() => [[], vi.fn()]),
  useModel: vi.fn(() => ({
    send: vi.fn(),
    save_changes: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  })),
}));

// Mock react-markdown to avoid complex dependencies
vi.mock("react-markdown", () => ({
  default: vi.fn(({ children }) => children),
}));

// Mock syntax highlighter
vi.mock("react-syntax-highlighter", () => ({
  Prism: vi.fn(({ children }) => children),
}));

vi.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  vscDarkPlus: {},
}));

vi.mock("remark-gfm", () => ({
  default: vi.fn(),
}));

// Mock global objects that might be needed
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve("")),
  },
});

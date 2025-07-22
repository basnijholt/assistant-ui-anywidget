import React from "react";
import ReactDOM from "react-dom/client";

// Mock the anywidget model for standalone usage
class MockModel {
  private listeners: { [key: string]: Array<(data: any) => void> } = {};
  private state: { [key: string]: any } = {
    chat_history: [],
    action_buttons: ["Hello", "Help", "Clear"],
  };

  send(data: { type: string; text: string }) {
    console.log("Sending message:", data);
    if (data.type === "user_message") {
      // Add user message to chat history
      const newMessage = { role: "user", content: data.text };
      this.state.chat_history = [...this.state.chat_history, newMessage];
      this.trigger("change:chat_history");

      // Simulate assistant response after a delay
      setTimeout(() => {
        const responses = [
          "I'm a mock assistant response. In the real widget, this would come from your Python backend.",
          "This is a standalone demo of the chat widget.",
          "You can use this for testing and screenshots with Puppeteer!",
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        const assistantMessage = { role: "assistant", content: response };
        this.state.chat_history = [...this.state.chat_history, assistantMessage];
        this.trigger("change:chat_history");
      }, 1000);
    }
  }

  save_changes() {
    console.log("Saving changes (mock)");
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: (data: any) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
  }

  get(key: string) {
    return this.state[key];
  }

  private trigger(event: string) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(this.state));
    }
  }
}

// Mock hooks for standalone usage
const mockModel = new MockModel();

const useModelState = <T,>(key: string): [T, (value: T) => void] => {
  const [state, setState] = React.useState<T>(mockModel.get(key) as T);

  React.useEffect(() => {
    const handler = () => {
      setState(mockModel.get(key) as T);
    };
    mockModel.on(`change:${key}`, handler);
    return () => {
      mockModel.off(`change:${key}`, handler);
    };
  }, [key]);

  const setValue = (value: T) => {
    // In real anywidget, this would update the model
    console.log(`Setting ${key} to:`, value);
  };

  return [state, setValue];
};

const useModel = () => mockModel;

// Override the anywidget imports
const originalModule = require("./index");
const WidgetComponent = originalModule.default.render({
  model: mockModel,
  el: document.createElement("div"),
});

// Create standalone app with mocked dependencies
function StandaloneApp() {
  // Provide the mocked hooks via React context or monkey-patching
  (window as any).__anywidget_mock__ = {
    useModelState,
    useModel,
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>Assistant UI Widget - Standalone Demo</h1>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <WidgetComponent />
      </div>
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<StandaloneApp />);
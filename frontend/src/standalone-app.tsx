import React from "react";
import ReactDOM from "react-dom/client";
import { StandaloneChatWidget } from "./standalone-widget";

function App() {
  return <StandaloneChatWidget />;
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
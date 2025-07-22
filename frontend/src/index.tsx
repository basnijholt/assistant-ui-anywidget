import React, { useState, useEffect, useRef, useMemo } from "react";
import { createRender, useModelState, useModel } from "@anywidget/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Add CSS animations
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .message-enter {
    animation: fadeIn 0.3s ease-out;
  }

  .code-container {
    position: relative;
  }

  .copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .code-container:hover .copy-button {
    opacity: 1;
  }

  .copy-button:hover {
    background: #f0f0f0;
  }

  .copy-button.copied {
    background: #28a745;
    color: white;
    border-color: #28a745;
  }
`;

type ActionButton = string | { text: string; color?: string; icon?: string };

function ChatWidget() {
  const [input, setInput] = useState("");
  const [chatHistory] = useModelState("chat_history");
  const [actionButtons] = useModelState<ActionButton[]>("action_buttons");
  const model = useModel();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  // Always use synchronized chat history as the source of truth
  const messages = useMemo(() => (Array.isArray(chatHistory) ? chatHistory : []), [chatHistory]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  // Model changes are handled automatically by useModelState

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Send message to Python using the proper model hook
    if (model) {
      model.send({ type: "user_message", text: input });

      // Force a save to ensure sync
      model.save_changes();
    }

    setInput("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Use Ctrl+D (or Cmd+D on Mac) to send message, let Enter behave naturally for new lines
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  const handleActionButton = (buttonText: string) => {
    if (model) {
      model.send({ type: "user_message", text: buttonText });
      model.save_changes();
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            backgroundColor: "#fafafa",
            borderRadius: "12px 12px 0 0",
          }}
        >
          {messages.length === 0 ? (
            <div
              style={{
                color: "#999",
                fontStyle: "italic",
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              Start a conversation...
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}-${msg.content?.slice(0, 20)}`}
                className="message-enter"
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "12px 16px",
                    backgroundColor: msg.role === "user" ? "#007bff" : "#fff",
                    color: msg.role === "user" ? "white" : "#333",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    wordBreak: "break-word",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      opacity: 0.7,
                      marginBottom: "4px",
                      fontWeight: "500",
                    }}
                  >
                    {msg.role === "user" ? "You" : "Assistant"}
                  </div>
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const codeString = String(children).replace(/\n$/, "");
                          const isInline = !className || !match;

                          return !isInline ? (
                            <div className="code-container">
                              <button
                                className={`copy-button ${copiedIndex === i ? "copied" : ""}`}
                                onClick={() => copyToClipboard(codeString, i)}
                              >
                                {copiedIndex === i ? "✓ Copied" : "Copy"}
                              </button>
                              <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                  margin: "8px 0",
                                  borderRadius: "6px",
                                  fontSize: "13px",
                                }}
                              >
                                {codeString}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code
                              className={className}
                              style={{
                                backgroundColor: "rgba(0,0,0,0.05)",
                                padding: "2px 4px",
                                borderRadius: "3px",
                                fontSize: "13px",
                              }}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {actionButtons && Array.isArray(actionButtons) && actionButtons.length > 0 && (
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "#f8f9fa",
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {actionButtons.map((button: ActionButton, index: number) => {
              // Handle both string and object formats
              const buttonConfig = typeof button === "string" ? { text: button } : button;

              return (
                <button
                  key={index}
                  onClick={() => handleActionButton(buttonConfig.text)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: buttonConfig.color || "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                  }}
                >
                  {buttonConfig.icon && (
                    <span style={{ fontSize: "18px" }}>{buttonConfig.icon}</span>
                  )}
                  {buttonConfig.text}
                </button>
              );
            })}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "16px",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
            backgroundColor: "#fff",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => {
              setInput(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Ctrl+D to send)"
            style={{
              flex: 1,
              padding: "10px 14px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px",
              resize: "none",
              minHeight: "40px",
              maxHeight: "120px",
              fontFamily: "inherit",
              lineHeight: "1.5",
              transition: "border-color 0.2s",
              outline: "none",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = "#007bff";
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = "#ddd";
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              minHeight: "40px",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#007bff";
            }}
          >
            Send
            <span style={{ fontSize: "16px" }}>→</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default { render: createRender(ChatWidget) };

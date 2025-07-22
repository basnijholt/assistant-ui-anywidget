import React, { useState, useEffect } from 'react';
import { createRender, useModelState, useModel } from '@anywidget/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ChatWidget() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useModelState('chat_history');
  const model = useModel();
  const [renderKey, setRenderKey] = useState(0);

  // Always use synchronized chat history as the source of truth
  const messages = Array.isArray(chatHistory) ? chatHistory : [];

  // Use proper React hook pattern for model changes
  useEffect(() => {
    if (model) {
      const handleChange = () => {
        setRenderKey(prev => prev + 1);
      };

      model.on('change:chat_history', handleChange);

      return () => {
        model.off('change:chat_history', handleChange);
      };
    }
  }, [model]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Send message to Python using the proper model hook
    if (model) {
      model.send({ type: 'user_message', text: input });

      // Force a save to ensure sync
      model.save_changes();
    }

    setInput('');
  };

  return (
    <div style={{
      width: '100%',
      height: '500px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9'
      }}>
        {messages.length === 0 ? (
          <div style={{ color: '#666', fontStyle: 'italic' }}>
            Start a conversation...
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={`${msg.role}-${i}-${msg.content?.slice(0, 20)}`} style={{
              marginBottom: '12px',
              padding: '8px 12px',
              backgroundColor: msg.role === 'user' ? '#007bff' : '#fff',
              color: msg.role === 'user' ? 'white' : 'black',
              borderRadius: '8px',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}>
              <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
              {msg.role === 'assistant' ? (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{
        padding: '16px',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '8px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default { render: createRender(ChatWidget) };

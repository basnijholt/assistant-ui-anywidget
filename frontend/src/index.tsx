import React, { useState, useEffect } from 'react';
import { createRender, useModelState } from '@anywidget/react';

function ChatWidget() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useModelState('message');

  // Listen for messages from Python
  useEffect(() => {
    // @ts-ignore - model is available in anywidget context
    if (typeof model !== 'undefined') {
      // @ts-ignore
      model.on('msg:custom', (msg: any) => {
        if (msg.type === 'assistant_message') {
          setMessages(prev => [...prev, { role: 'assistant', content: msg.text }]);
        }
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Send message to Python
    // @ts-ignore
    if (typeof model !== 'undefined') {
      // @ts-ignore
      model.send({ type: 'user_message', text: input });
    }
    
    setInput('');
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '400px', 
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
            <div key={i} style={{ 
              marginBottom: '12px',
              padding: '8px 12px',
              backgroundColor: msg.role === 'user' ? '#007bff' : '#fff',
              color: msg.role === 'user' ? 'white' : 'black',
              borderRadius: '8px',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}>
              <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
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
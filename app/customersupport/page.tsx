import React, { useState } from 'react';
import './CustomerSupport.css';

const Page: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'support'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'support', text: 'Thank you for reaching out. How can I assist you?' },
      ]);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="chatArea">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'userMessage' : 'supportMessage'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="inputArea">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="input"
        />
        <button onClick={handleSendMessage} className="button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;

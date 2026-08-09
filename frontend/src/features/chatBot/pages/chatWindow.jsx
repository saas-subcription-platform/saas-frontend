import { useState } from "react";
import "./chatbot.css";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hello 👋 How can I help you?", sender: "bot" }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Show typing
    setIsTyping(true);

    // Simulate bot reply delay
    setTimeout(() => {
      const botReply = getBotReply(input);

      setMessages((prev) => [
        ...prev,
        { text: botReply, sender: "bot" }
      ]);

      setIsTyping(false);
    }, 1500);
  };

  // Simple logic (you can upgrade later)
  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("price") || msg.includes("pricing")) {
      return "Our plans start from ₹499/month. Would you like details?";
    }
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hi there! 😊 How can I assist you today?";
    }
    return "I'm here to help! Can you please clarify your question?";
  };

  return (
    <div className="chat-window">

      {/* HEADER */}
      <div className="chat-header">
        <div>
          AI Assistant
          <br />
          <small style={{ fontSize: "11px", opacity: 0.8 }}>
            Online • Ready to help
          </small>
        </div>
        <button onClick={onClose}>✖</button>
      </div>

      {/* BODY */}
      <div className="chat-body">
        <div className="messages">

          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === "bot" && (
                <div className="avatar">🤖</div>
              )}
              <div className="bubble">{msg.text}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="message bot">
              <div className="avatar">🤖</div>
              <div className="bubble typing-bubble">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  );
}
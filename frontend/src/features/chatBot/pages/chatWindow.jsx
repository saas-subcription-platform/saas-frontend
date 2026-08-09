import { useState, useEffect } from "react";
import "./chatbot.css";
import ReactMarkdown from "react-markdown";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hello 👋 How can I help you?", sender: "bot" },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // ✅ Generate session ID once
  useEffect(() => {
    const id = "session_" + Math.random().toString(36).substring(2, 10);
    setSessionId(id);
  }, []);

  // ✅ Send message to FastAPI
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: userInput,
        }),
      });

      const data = await response.json();
      console.log("API RESPONSE:", data);

      setMessages((prev) => [
        ...prev,
        { text: data.answer || "No reply from server", sender: "bot" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Server error. Please try again.", sender: "bot" },
      ]);
    }

    setIsTyping(false);
  };

  // ✅ End chat (clear backend session)
  const handleClose = async () => {
    try {
      await fetch("http://127.0.0.1:8000/chat/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
    } catch (e) {
      console.log("End chat error");
    }

    onClose();
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
        <button onClick={handleClose}>✖</button>
      </div>

      {/* BODY */}
      <div className="chat-body">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === "bot" && <div className="avatar">🤖</div>}
              <div className="bubble">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="message bot">
              <div className="avatar">AI</div>
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
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

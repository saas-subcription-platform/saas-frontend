import { useState, useEffect } from "react";
import ChatButton from "./chatButton";
import ChatWindow from "./ChatWindow";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    setTimeout(() => {
      setIsThinking(false);
      setShowHint(true);
    }, 3000);
  }, []);

  return (
    <>
      <ChatButton
        onClick={toggleChat}
        isOpen={isOpen}
        isThinking={isThinking}
      />

      {showHint && !isOpen && (
        <div className="chat-hint">Chat with our assistant</div>
      )}

      {isOpen && <ChatWindow onClose={toggleChat} />}
    </>
  );
}
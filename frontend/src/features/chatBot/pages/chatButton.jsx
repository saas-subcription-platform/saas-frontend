import "./chatbot.css";

export default function ChatButton({ onClick, isOpen, isThinking }) {
  return (
    <button className="chat-button" onClick={onClick}>
      {isThinking ? (
        <div className="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        "💬"
      )}
    </button>
  );
}

const MessageBubble = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.mine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md rounded-2xl px-5 py-3 shadow ${
          message.mine
            ? "bg-primary text-white"
            : "bg-white"
        }`}
      >
        {!message.mine && (
          <h4 className="font-semibold mb-1">
            {message.sender}
          </h4>
        )}

        <p>{message.text}</p>

        <p
          className={`text-xs mt-2 ${
            message.mine
              ? "text-white/70"
              : "text-gray-400"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
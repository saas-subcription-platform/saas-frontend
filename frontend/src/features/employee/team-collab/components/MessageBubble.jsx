const MessageBubble = ({
  message,
  currentUser,
  conversation,
  companyUsers = [],
}) => {
  const mine = currentUser?.userId === message.senderId;

  const sender = companyUsers.find(
    (user) => user.userId === message.senderId
  );

  const senderName = sender
    ? `${sender.firstName} ${sender.lastName}`
    : "Unknown User";

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md rounded-2xl px-5 py-3 shadow ${
          mine ? "bg-primary text-white" : "bg-white"
        }`}
      >
        {!mine && (
          <h4 className="font-semibold mb-1">
            {senderName}
          </h4>
        )}

        <p>{message.content}</p>

        <p
          className={`text-xs mt-2 ${
            mine ? "text-white/70" : "text-gray-400"
          }`}
        >
          {new Date(message.sentAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
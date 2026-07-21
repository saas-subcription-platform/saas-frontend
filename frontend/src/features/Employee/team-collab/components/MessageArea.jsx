import MessageBubble from "./MessageBubble";

const MessageArea = ({ conversation }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 px-8 py-8">

      <p className="text-center text-gray-400 mb-8">
        Today
      </p>

      <div className="space-y-8">

        {(conversation.messages || []).map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

      </div>

    </div>
  );
};

export default MessageArea;
import { Smile, Paperclip, SendHorizonal, SendIcon } from "lucide-react";

const MessageInput = ({
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className="h-24 bg-white border-t border-gray-200 px-6 flex items-center gap-4">

      <Smile className="text-gray-500 cursor-pointer" />

      <Paperclip className="text-gray-500 cursor-pointer" />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        placeholder="Type a message..."
        className="flex-1 h-12 rounded-full border border-gray-300 px-5 outline-none focus:border-primary"
      />

      <button
        onClick={sendMessage}
        className="bg-primary text-white rounded-full px-6 py-3 hover:opacity-90 flex items-center gap-2"
      >
        <SendIcon size={18} />
      </button>

    </div>
  );
};

export default MessageInput;
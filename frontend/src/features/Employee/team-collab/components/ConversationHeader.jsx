import {
  MoreVertical,
  Building2,
  Hash,
} from "lucide-react";

const ConversationHeader = ({
  conversation,
  showDetails,
  onToggleDetails,
}) => {
  return (
    <div className="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
          {conversation.type === "company" && <Building2 size={22} />}

          {conversation.type === "team" && <Hash size={22} />}

          {conversation.type === "user" && (
            <span className="font-semibold">
              {conversation.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <h2 className="font-semibold text-xl">
            {conversation.name}
          </h2>

          <p className="text-sm text-gray-500">
            {conversation.type === "company" &&
              "Everyone in the company"}

            {conversation.type === "team" &&
              `${conversation.members?.length || 0} Members`}

            {conversation.type === "user" &&
              "Direct Message"}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center">
        <button
          onClick={onToggleDetails}
          title={showDetails ? "Hide Details" : "Show Details"}
          className={`p-2 rounded-lg transition ${
            showDetails
              ? "bg-primary text-white"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;
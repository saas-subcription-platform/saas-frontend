import {
  Users,
  FileText,
  Pin,
  Info,
} from "lucide-react";

import users from "../constants/users";

const DetailsPanel = ({ conversation }) => {
  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col">

      {/* Header */}

      <div className="py-8 flex flex-col items-center border-b border-gray-200">

        <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
          {conversation.name.charAt(0)}
        </div>

        <h2 className="mt-5 text-2xl font-semibold">
          {conversation.name}
        </h2>

        <p className="text-gray-500">
          {conversation.type === "company"
    ? "Company Channel"
    : conversation.type === "team"
    ? "Private Team"
    : "Direct Message"}
        </p>

      </div>

      <div className="flex-1 overflow-y-auto">

        {/* Members */}

        <section className="px-6 py-5 border-b border-gray-100">

          <div className="flex items-center gap-2 mb-4">

            <Users size={20} />

            <h3 className="font-semibold">
              Members
            </h3>

          </div>

          <div className="space-y-3">

            {
                conversation.members?.map((user) => (
                    <div
                    key={user.id}
                    className="flex justify-between"
                    >
                    <span>{user.name}</span>

                    <span
                        className={
                        user.online
                            ? "text-green-500 text-sm"
                            : "text-gray-400 text-sm"
                        }
                    >
                        {user.online ? "Online" : "Offline"}
                    </span>
                    </div>
            ))
            }

          </div>

        </section>

        {/* Shared Files */}

        <section className="px-6 py-5 border-b border-gray-100">

          <div className="flex items-center gap-2 mb-3">

            <FileText size={20} />

            <h3 className="font-semibold">
              Shared Files
            </h3>

          </div>

          <p className="text-gray-500 text-sm">
            No shared files
          </p>

        </section>

        {/* Pinned */}

        <section className="px-6 py-5 border-b border-gray-100">

          <div className="flex items-center gap-2 mb-3">

            <Pin size={20} />

            <h3 className="font-semibold">
              Pinned Messages
            </h3>

          </div>

          <p className="text-gray-500 text-sm">
            No pinned messages
          </p>

        </section>

        {/* About */}

        <section className="px-6 py-5">

          <div className="flex items-center gap-2 mb-3">

            <Info size={20} />

            <h3 className="font-semibold">
              About
            </h3>

          </div>

          <p className="text-sm text-gray-500 leading-6">
            General discussion channel for all employees in the company.
          </p>

        </section>

      </div>

    </aside>
  );
};

export default DetailsPanel;
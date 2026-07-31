import { Search, Building2, Hash, Plus } from "lucide-react";

import { useState } from "react";
import messages from "../constants/messages";
import CreateTeamModal from "./CreateTeamModel";

const ConversationPanel = ({
  currentUser,
  teams,
  users,
  selectedConversation,
  setSelectedConversation,
  loadTeamMembers,
  onCreateTeam,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <aside className="w-85 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Team Collaboration
        </h1>

        <div className="relative mt-5">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search employees..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-primary focus:bg-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* MY TEAMS */}

        <div className="mt-7 px-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-gray-400">
              My Teams
            </p>

            <button
              onClick={() => setShowCreateModal(true)}
              className="text-3xl text-primary hover:scale-110 transition"
            >
              +
            </button>
          </div>

          <div className="space-y-1">
            {teams.map((team) => (
              <button
                onClick={async () => {
                  try {
                    const members = await loadTeamMembers(team.teamId);

                    setSelectedConversation({
                      id: team.teamId,
                      name: team.name,
                      description: team.description,
                      type: "team",
                      members,
                      messages: [],
                    });
                  } catch (error) {
                    console.error("Failed to load team members:", error);
                  }
                }}
                key={team.teamId}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition"
              >
                <Hash size={17} className="text-primary" />

                <div className="text-left">
                  <p className="font-medium text-slate-800">{team.name}</p>

                  <p className="text-xs text-gray-500">Team</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* DIRECT MESSAGES */}

        <div className="mt-7 px-6 pb-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">
            Direct Messages
          </p>

          <div className="space-y-1">
            {users.map((user) => (
              <button
                onClick={() =>
                  setSelectedConversation({
                    id: user.id,
                    name: user.name,
                    type: "user",
                    members: [user],
                    messages: messages[user.id] || [],
                  })
                }
                key={user.id}
                className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                      {user.name.charAt(0)}
                    </div>

                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        user.online ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </div>

                  <span className="font-medium text-slate-700">
                    {user.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <CreateTeamModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={async (teamData) => {
          await onCreateTeam(teamData);
          setShowCreateModal(false);
        }}
      />
    </aside>
  );
};

export default ConversationPanel;

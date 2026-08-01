import { Search, Hash } from "lucide-react";
import { useMemo, useState } from "react";
import CreateTeamModal from "./CreateTeamModal";

const ConversationPanel = ({
  teams,
  users = [],
  onCreateTeam,
  loadConversation,
  loadTeamConversation,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return [];

    return users.filter((user) => {
      const fullName =
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();

      return (
        fullName.includes(keyword) ||
        (user.role ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [searchTerm, users]);

  const searching = searchTerm.trim().length > 0;

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-primary focus:bg-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {searching ? (
          /* SEARCH RESULTS */
          <div className="px-6 pb-8">
            <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">
              Search Results
            </p>

            {filteredUsers.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">
                No employees found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredUsers.map((user) => {
                  const fullName =
                    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

                  const initial = (
                    user.firstName?.charAt(0) ??
                    user.lastName?.charAt(0) ??
                    "?"
                  ).toUpperCase();

                  return (
                    <button
                      key={user.userId}
                      onClick={() => {
                        loadConversation(user);
                        setSearchTerm("");
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                            {initial}
                          </div>

                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-green-500" />
                        </div>

                        <div className="text-left">
                          <p className="font-medium text-slate-700">
                            {fullName || "Unknown User"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
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
                    key={team.teamId}
                    onClick={() => loadTeamConversation(team)}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition"
                  >
                    <Hash size={17} className="text-primary" />

                    <div className="text-left">
                      <p className="font-medium text-slate-800">
                        {team.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Team
                      </p>
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
                {users.map((user) => {
                  const fullName =
                    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

                  const initial = (
                    user.firstName?.charAt(0) ??
                    user.lastName?.charAt(0) ??
                    "?"
                  ).toUpperCase();

                  return (
                    <button
                      key={user.userId}
                      onClick={() => loadConversation(user)}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                            {initial}
                          </div>

                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-green-500" />
                        </div>

                        <div className="text-left">
                          <p className="font-medium text-slate-700">
                            {fullName || "Unknown User"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
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
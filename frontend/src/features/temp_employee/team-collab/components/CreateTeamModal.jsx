import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { getCompanyUsers } from "../services/teamService";

const CreateTeamModal = ({ open, onClose, onCreate }) => {
  const [teamName, setTeamName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!open) return;

    const loadEmployees = async () => {
      try {
        const users = await getCompanyUsers();
        console.log(users);
        setEmployees(users);
      } catch (error) {
        console.error("Failed to load company users", error);
      }
    };

    loadEmployees();
  }, [open]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
  }, [employees, search]);

  if (!open) return null;

  const toggleMember = (id) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers((prev) => prev.filter((m) => m !== id));
    } else {
      setSelectedMembers((prev) => [...prev, id]);
    }
  };

  const handleCreate = () => {
    onCreate({
      name: teamName.trim(),
      description: null,
      memberIds: selectedMembers,
    });

    setTeamName("");
    setSearch("");
    setSelectedMembers([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="border-b px-5 py-4">
          <h2 className="text-xl font-bold text-slate-800">Create Team</h2>

          <p className="mt-1 text-sm text-gray-500">
            Create a new private team.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Team Name
            </label>

            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Frontend Team"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium text-slate-700">
                Members ({selectedMembers.length})
              </span>
            </div>

            <div className="relative mb-3">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employees..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="h-48 overflow-y-auto rounded-lg border border-gray-200">
              {filteredEmployees.map((employee) => {
                const checked = selectedMembers.includes(employee.userId);

                const fullName = `${employee.firstName} ${employee.lastName}`;

                const initials = fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                return (
                  <button
                    key={employee.userId}
                    type="button"
                    onClick={() => toggleMember(employee.userId)}
                    className={`w-full flex items-center justify-between px-3 py-2 border-b last:border-b-0 transition
                      ${checked ? "bg-primary/10" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="w-4 h-4"
                      />

                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-semibold">
                        {initials}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {employee.firstName} {employee.lastName}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500">
                      {employee.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={!teamName.trim() || selectedMembers.length === 0}
            onClick={handleCreate}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;

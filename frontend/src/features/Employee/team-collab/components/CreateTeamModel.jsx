import { useState } from "react";

const employees = [
  "Rahul Sharma",
  "Priya Nair",
  "Rohan Patil",
  "Amit Shah",
  "You",
];

const CreateTeamModal = ({
  open,
  onClose,
  onCreate,
}) => {
  const [teamName, setTeamName] = useState("");
  const [selected, setSelected] = useState([]);

  if (!open) return null;

  const toggleMember = (name) => {
    if (selected.includes(name))
      setSelected(selected.filter((m) => m !== name));
    else setSelected([...selected, name]);
  };

  const handleCreate = () => {
    onCreate({
      id: Date.now(),
      name: teamName,
      members: selected.length,
    });

    setTeamName("");
    setSelected([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-112.5">

        <h2 className="text-2xl font-bold mb-5">
          Create Team
        </h2>

        <input
          placeholder="Team Name"
          value={teamName}
          onChange={(e) =>
            setTeamName(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-5"
        />

        <h3 className="font-semibold mb-3">
          Select Members
        </h3>

        <div className="space-y-2 max-h-52 overflow-auto">

          {employees.map((emp) => (

            <label
              key={emp}
              className="flex gap-3"
            >
              <input
                type="checkbox"
                checked={selected.includes(emp)}
                onChange={() => toggleMember(emp)}
              />

              {emp}
            </label>

          ))}

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="bg-primary text-white px-5 py-2 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateTeamModal;
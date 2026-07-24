import { toast } from "react-toastify";

const CreateGoalModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(" Goal created successfully!");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create New Goal
          </h2>

          <button
            onClick={onClose}
            className="bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          {/* Goal Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Goal Title
            </label>

            <input
              type="text"
              placeholder="Enter goal title"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Objective */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Objective
            </label>

            <textarea
              rows="3"
              placeholder="Describe your objective"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-2">
                Category
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary"
              >
                <option>Learning</option>
                <option>Project</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Priority
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Deadline
            </label>

            <input
              type="date"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
            >
              Save Goal
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateGoalModal;
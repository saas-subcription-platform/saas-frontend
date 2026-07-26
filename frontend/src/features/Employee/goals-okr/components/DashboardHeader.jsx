import { Plus } from "lucide-react";

const DashboardHeader = ({ onCreateGoal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">

      <div>
      <h1 className="text-3xl font-bold text-dark">
          Goals & OKRs
        </h1>

        <p className="text-dark/70 mt-2">
          Track your goals, objectives and key results.
        </p>
      </div>

      <button
        onClick={onCreateGoal}
        className="flex items-center gap-2 bg-primary hover:opacity-90 text-white px-5 py-3 rounded-xl transition"
      >
        <Plus size={20} />
        Create Goal
      </button>

    </div>
  );
};

export default DashboardHeader;
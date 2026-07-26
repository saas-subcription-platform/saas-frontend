import {
  CalendarDays,
  Target,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const GoalCard = ({ goal, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-6">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-semibold text-dark">
            {goal.title}
          </h2>

          <p className="text-dark/70 text-sm mt-1">
            {goal.category}
          </p>
        </div>

        <div className="bg-primary/10 p-3 rounded-xl">
          <Target className="text-primary" size={22} />
        </div>

      </div>

      {/* Objective */}
      <p className="text-dark/70 mt-5">
        {goal.objective}
      </p>

      {/* Progress */}
      <div className="mt-6">

        <div className="flex justify-between items-center mb-2">

          <span className="text-sm text-dark/70">
            Progress
          </span>

          <span className="text-sm font-semibold text-primary">
            {goal.progress}%
          </span>

        </div>

        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${goal.progress}%` }}
          ></div>

        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">

        <div className="flex items-center gap-2 text-dark/70">
          <CalendarDays size={17} />
          <span>{goal.deadline}</span>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            goal.priority === "High"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {goal.priority}
        </span>

      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mt-5">

        <CheckCircle2
          size={18}
          className="text-green-500"
        />

        <span className="text-sm text-dark/70">
          {goal.status}
        </span>

      </div>

      {/* Button */}
      <button
        onClick={() => onView(goal)}
        className="w-full mt-6 flex justify-center items-center gap-2 bg-primary hover:opacity-90 text-white py-3 rounded-xl transition"
      >
        View Details
        <ChevronRight size={18} />
      </button>

    </div>
  );
};

export default GoalCard;
import { X, CalendarDays, Target, CheckCircle2 } from "lucide-react";

const GoalDetailsDrawer = ({ goal, isOpen, onClose }) => {
  if (!isOpen || !goal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">

      <div className="w-full max-w-md bg-white h-screen shadow-xl p-6 overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">

          <h2 className="text-2xl font-bold text-dark">
            Goal Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="text-gray-600" />
          </button>

        </div>

        {/* Goal */}
        <div className="mt-8">

          <h3 className="text-xl font-semibold text-dark">
            {goal.title}
          </h3>

          <p className="text-dark/70 mt-2">
            {goal.objective}
          </p>

        </div>

        {/* Progress */}
        <div className="mt-8">

          <div className="flex justify-between items-center mb-2">

            <span className="text-dark/70">
              Progress
            </span>

            <span className="font-semibold text-primary">
              {goal.progress}%
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${goal.progress}%` }}
            ></div>

          </div>

        </div>

        {/* Details */}
        <div className="space-y-5 mt-8">

          <div className="flex items-center gap-3">

            <CalendarDays className="text-primary" />

            <div>
              <p className="text-sm text-dark/70">
                Deadline
              </p>

              <p className="font-medium">
                {goal.deadline}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Target className="text-primary" />

            <div>
              <p className="text-sm text-dark/70">
                Priority
              </p>

              <p className="font-medium">
                {goal.priority}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <CheckCircle2 className="text-green-500" />

            <div>
              <p className="text-sm text-dark/70">
                Status
              </p>

              <p className="font-medium">
                {goal.status}
              </p>
            </div>

          </div>

        </div>

        {/* Key Results */}
        <div className="mt-10 border-t pt-6">

          <h3 className="font-semibold text-lg text-dark mb-4">
            Key Results
          </h3>

          <div className="space-y-3">

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">

              <CheckCircle2
                size={18}
                className="text-green-500"
              />

              <span>
                Complete Course
              </span>

            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">

              <CheckCircle2
                size={18}
                className="text-green-500"
              />

              <span>
                Build Mini Project
              </span>

            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">

              <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-400"></div>

              <span className="text-dark/70">
                Deploy Application
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default GoalDetailsDrawer;
import GoalCard from "./GoalCard";
import { GOALS } from "../constants/goals";

const GoalsList = ({ onViewGoal }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        My Goals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GOALS.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onView={onViewGoal}
          />
        ))}
      </div>
    </div>
  );
};

export default GoalsList;
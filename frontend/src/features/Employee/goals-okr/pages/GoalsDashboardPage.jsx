import { useState } from "react";
import EmployeeLayout from "../../../../components/common/layout/EmployeeLayout";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import GoalsList from "../components/GoalsList";
import CreateGoalModal from "../components/CreateGoalModal";
import GoalDetailsDrawer from "../components/GoalDetailsDrawer";

const GoalsDashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  return (
    <EmployeeLayout>
      <div className="space-y-6">

        <DashboardHeader
          onCreateGoal={() => setIsModalOpen(true)}
        />

        <StatsCards />

        <GoalsList
          onViewGoal={setSelectedGoal}
        />

        <CreateGoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <GoalDetailsDrawer
          goal={selectedGoal}
          isOpen={selectedGoal !== null}
          onClose={() => setSelectedGoal(null)}
        />

      </div>
    </EmployeeLayout>
  );
};

export default GoalsDashboardPage;
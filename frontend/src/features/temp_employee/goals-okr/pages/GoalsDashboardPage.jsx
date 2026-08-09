import { useEffect, useState } from "react";
import EmployeeLayout from "../../../../components/common/layout/EmployeeLayout";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import GoalsList from "../components/GoalsList";
import CreateGoalModal from "../components/CreateGoalModal";
import GoalDetailsDrawer from "../components/GoalDetailsDrawer";
import {
  getGoalsByCompany,
  getGoalStatistics,
} from "../services/goalService";
import { getCurrentUser } from "../../services/userService";

const GoalsDashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Statistics
  const [activeGoals, setActiveGoals] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [overdueGoals, setOverdueGoals] = useState(0);
  const [averageProgress, setAverageProgress] = useState(0);

  const fetchGoals = async () => {
    try {
      setLoading(true);

      // Get logged-in user
      const currentUser = await getCurrentUser();

      const companyId = currentUser.companyId;

      // Fetch goals
      const companyGoals = await getGoalsByCompany(companyId);
      setGoals(companyGoals);

      // Fetch statistics
      const statistics = await getGoalStatistics(companyId);

      setActiveGoals(statistics.activeGoals);
      setCompletedGoals(statistics.completedGoals);
      setOverdueGoals(statistics.overdueGoals);
      setAverageProgress(statistics.averageProgress);

    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <EmployeeLayout>
      <div className="space-y-6">

        <DashboardHeader
          onCreateGoal={() => setIsModalOpen(true)}
        />

        <StatsCards
          activeGoals={activeGoals}
          completedGoals={completedGoals}
          overdueGoals={overdueGoals}
          averageProgress={averageProgress}
        />

        {loading ? (
          <p>Loading goals...</p>
        ) : (
          <GoalsList
            goals={goals}
            onViewGoal={setSelectedGoal}
          />
        )}

        <CreateGoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGoalCreated={fetchGoals}
        />

        <GoalDetailsDrawer
          goal={selectedGoal}
          isOpen={selectedGoal !== null}
          onClose={() => setSelectedGoal(null)}
          onGoalUpdated={fetchGoals}
        />

      </div>
    </EmployeeLayout>
  );
};

export default GoalsDashboardPage;
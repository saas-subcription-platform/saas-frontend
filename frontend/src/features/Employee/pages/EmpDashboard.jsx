import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock3, CalendarDays, MessageSquare, Target } from "lucide-react";

import EmployeeLayout from "../../../components/common/layout/EmployeeLayout";
import { getMySubscription } from "../../admin/subscriptions/services/subscriptionService";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await getMySubscription();

        console.log("Employee Subscription:", data);

        setSubscription(data);
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const hasFeature = (featureName) => {
    return subscription?.features?.includes(featureName);
  };

  if (loading) {
    return (
      <EmployeeLayout>
        <p className="text-gray-500">Loading dashboard...</p>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="grid grid-cols-2 gap-6">

        {hasFeature("Timesheet") && (
          <div
            onClick={() => navigate("/employee/timesheet/history")}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
          >
            <Clock3 size={40} className="text-blue-600 mb-4" />

            <h3 className="text-xl font-semibold">
              Timesheets
            </h3>

            <p className="text-gray-500 mt-2">
              Submit and manage your daily work hours.
            </p>
          </div>
        )}

        {hasFeature("Leave Management") && (
          <div
            onClick={() => navigate("/employee/leave-planner")}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
          >
            <CalendarDays size={40} className="text-green-600 mb-4" />

            <h3 className="text-xl font-semibold">
              Leave Planner
            </h3>

            <p className="text-gray-500 mt-2">
              Apply for leave and check leave balance.
            </p>
          </div>
        )}

        {hasFeature("Team Collaboration") && (
          <div
            onClick={() => navigate("/employee/team-collab")}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
          >
            <MessageSquare size={40} className="text-purple-600 mb-4" />

            <h3 className="text-xl font-semibold">
              Team Collaboration
            </h3>

            <p className="text-gray-500 mt-2">
              Chat and collaborate with your team.
            </p>
          </div>
        )}

        {hasFeature("Goals & OKRs") && (
          <div
            onClick={() => navigate("/employee/goals")}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
          >
            <Target size={40} className="text-red-600 mb-4" />

            <h3 className="text-xl font-semibold">
              Goals & OKRs
            </h3>

            <p className="text-gray-500 mt-2">
              Track your goals and key results.
            </p>
          </div>
        )}

      </div>
    </EmployeeLayout>
  );
};

export default DashboardPage;
import EmployeeLayout from "../../components/common/layout/EmployeeLayout";
import { useNavigate } from "react-router-dom";
import { Clock3, CalendarDays, MessageSquare, Target } from "lucide-react";


const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <EmployeeLayout>
      <div className="grid grid-cols-2 gap-6">
        <div onClick={() => navigate("/employee/timesheet/history")} className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition">
          <Clock3 size={40} className="text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold">Timesheets</h3>
          <p className="text-gray-500 mt-2">
            Submit and manage your daily work hours.
          </p>  
        </div>

        <div
          onClick={() => navigate("/employee/leave-planner")}
          className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
          className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
        >
          <CalendarDays size={40} className="text-green-600 mb-4" />
          <h3 className="text-xl font-semibold">Leave Planner</h3>
          <p className="text-gray-500 mt-2">
            Apply for leave and check leave balance.
          </p>
        </div>

        
        <div onClick={() =>navigate("/employee/team-collab")} className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition">
          <MessageSquare size={40} className="text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold">Team Collaboration</h3>
          <p className="text-gray-500 mt-2">
            Chat and collaborate with your team.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition">
          <Target size={40} className="text-red-600 mb-4" />
          <h3 className="text-xl font-semibold">Goals & OKRs</h3>
          <p className="text-gray-500 mt-2">
            Track your goals and key results.
          </p>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default DashboardPage;

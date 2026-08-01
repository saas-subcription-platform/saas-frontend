import { useEffect, useState } from "react";

import EmployeeLayout from "../../../components/common/layout/EmployeeLayout";
import LeaveBalance from "./components/LeaveBalance";
import ApplyLeaveForm from "./components/ApplyLeave";
import LeaveHistory from "./components/LeaveHistory";

import {
  getLeaveBalance,
  getLeaveHistory,
} from "./services/leaveService";

const LeavePlannerPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const fetchLeaveBalance = async () => {
    try {
      const data = await getLeaveBalance();
      setLeaveBalance(data);
    } catch (error) {
      console.error("Failed to fetch leave balance:", error);
    }
  };

  const fetchLeaveHistory = async () => {
    try {
      const data = await getLeaveHistory();
      setLeaveRequests(data);
    } catch (error) {
      console.error("Failed to fetch leave history:", error);
    }
  };

  const refreshData = async () => {
    await fetchLeaveBalance();
    await fetchLeaveHistory();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">
        Leave Planner
      </h1>

      <LeaveBalance leaveBalance={leaveBalance} />

      <button
        onClick={() => setShowHistory(!showHistory)}
        className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition mb-6"
      >
        {showHistory ? "Hide Leave History" : "Show Leave History"}
      </button>

      {showHistory && (
        <LeaveHistory leaveRequests={leaveRequests} />
      )}

      <br />

      <ApplyLeaveForm onLeaveApplied={refreshData} />
    </EmployeeLayout>
  );
};

export default LeavePlannerPage;
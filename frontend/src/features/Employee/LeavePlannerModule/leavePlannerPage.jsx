import EmployeeLayout from "../../../components/common/layout/EmployeeLayout";
import LeaveBalance from "./components/leaveBalance";
import ApplyLeaveForm from "./components/applyLeave";
import LeaveHistory from "./components/leaveHistory";
import { useState } from "react";

const LeavePlannerPage = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([
  {
    id: 1,
    leaveType: "Casual Leave",
    fromDate: "2026-07-22",
    toDate: "2026-07-23",
    reason: "Family Function",
    status: "Pending",
  },
  {
    id: 2,
    leaveType: "Sick Leave",
    fromDate: "2026-07-15",
    toDate: "2026-07-15",
    reason: "Fever",
    status: "Approved",
  },
]);
  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">Leave Planner</h1>
      <LeaveBalance></LeaveBalance>
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition mb-6"
      >
        {showHistory ? "Hide Leave History" : "Show Leave History"}
      </button>
      {showHistory && <LeaveHistory leaveRequests={leaveRequests} />}
      <br />
      <ApplyLeaveForm></ApplyLeaveForm>
    </EmployeeLayout>
  );
};

export default LeavePlannerPage;

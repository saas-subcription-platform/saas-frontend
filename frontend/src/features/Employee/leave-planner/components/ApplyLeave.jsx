import { useState } from "react";
import { toast } from "react-toastify";

const ApplyLeaveForm = () => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leaveType || !fromDate || !toDate || !reason) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (fromDate > toDate) {
      toast.error("From Date cannot be later than To Date.");
      return;
    }

    toast.success(
      `${leaveType} request submitted successfully`,
    );
    setLeaveType("");

    setFromDate("");

    setToDate("");

    setReason("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Apply Leave</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Leave Type</label>

          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">From Date</label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">To Date</label>

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Reason</label>

          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Enter your reason..."
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90"
        >
          Apply Leave
        </button>
      </form>
    </div>
  );
};

export default ApplyLeaveForm;

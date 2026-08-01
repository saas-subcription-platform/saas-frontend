const LeaveHistory = ({ leaveRequests }) => {
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Leave History</h2>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Leave Type</th>
            <th className="border p-3">From</th>
            <th className="border p-3">To</th>
            <th className="border p-3">Reason</th>
            <th className="border p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave.id}>
              <td className="border p-3">{leave.leaveType}</td>
              <td className="border p-3">{leave.fromDate}</td>
              <td className="border p-3">{leave.toDate}</td>
              <td className="border p-3">{leave.reason}</td>
              <td className="border p-3">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveHistory;
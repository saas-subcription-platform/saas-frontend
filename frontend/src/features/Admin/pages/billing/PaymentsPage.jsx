import { Link } from "react-router-dom";
import AdminLayout from "../../../../components/common/layout/AdminLayout";

export default function Payments() {
  const billingHistory = [
    {
      date: "01-Jun-2026",
      amount: "₹12,500",
      status: "Paid",
    },
    {
      date: "01-May-2026",
      amount: "₹12,500",
      status: "Paid",
    },
    {
      date: "01-Apr-2026",
      amount: "₹12,500",
      status: "Paid",
    },
  ];

  return (
    <AdminLayout>
    <div className="min-h-screen bg-[#F4F7F3] p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Payments & Billing
        </h1>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Current Plan</p>
            <h3 className="text-xl font-bold text-[#7A9E7E]">
              Professional
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Employees</p>
            <h3 className="text-xl font-bold">
              50
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Monthly Cost</p>
            <h3 className="text-xl font-bold">
              ₹12,500
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Next Billing</p>
            <h3 className="text-xl font-bold">
              15-Jun-2026
            </h3>
          </div>

        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Payment Status
          </h2>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            Paid
          </span>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Billing History
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">
                  Date
                </th>

                <th className="text-left py-3">
                  Amount
                </th>

                <th className="text-left py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {billingHistory.map((bill, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">
                    {bill.date}
                  </td>

                  <td>
                    {bill.amount}
                  </td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

       

      </div>
    </div>
    </AdminLayout>
  );
}
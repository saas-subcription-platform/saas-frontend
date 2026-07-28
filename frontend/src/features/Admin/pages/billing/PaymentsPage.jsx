import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { getCompanyProfile } from "../../../Auth/Services/companyService";
import { getAllTransactions } from "../../../../paymentManagement/services/transactionApi";

export default function Payments() {

  const [transactions, setTransactions] = useState([]);
  const [company, setCompany] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {

    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    const fetchCompany = async () => {
      try {
        const data = await getCompanyProfile();
        setCompany(data);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      }
    };

    fetchTransactions();
    fetchCompany();

  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatCompanySize = (size) => {
    const sizes = {
      ONE_TO_TEN: "1 - 10",
      ELEVEN_TO_FIFTY: "11 - 50",
      FIFTY_ONE_TO_TWO_HUNDRED: "51 - 200",
      TWO_HUNDRED_ONE_TO_FIVE_HUNDRED: "201 - 500",
      FIVE_HUNDRED_PLUS: "500+",
    };

    return sizes[size] || size || "-";
  };

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
              <p className="text-gray-500">
                Current Plan
              </p>

              <h3 className="text-xl font-bold text-primary">
                Professional
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-500">
                Company Size
              </p>

              <h3 className="text-xl font-bold">
                {formatCompanySize(company?.companySize)}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-500">
                Monthly Cost
              </p>

              <h3 className="text-xl font-bold">
                ₹12,500
              </h3>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-500">
                Next Billing
              </p>

              <h3 className="text-xl font-bold">
                15-Jun-2026
              </h3>
            </div>

          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <h2 className="text-xl font-semibold mb-3">
              Payment Status
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              Paid
            </span>

          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Transaction History
            </h2>

            <table className="w-full">

              <thead>
                <tr className="border-b">

                  <th className="text-left py-3">
                    Payment ID
                  </th>

                  <th className="text-left py-3">
                    Amount
                  </th>

                  <th className="text-left py-3">
                    Payment Method
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>

                  <th className="text-left py-3">
                    Gateway Payment ID
                  </th>

                </tr>
              </thead>

              <tbody>

                {transactions.map((transaction) => (

                  <tr
                    key={transaction.transactionId}
                    className="border-b"
                  >

                    <td className="py-4">
                      {transaction.paymentId}
                    </td>

                    <td>
                      ₹{transaction.amount}
                    </td>

                    <td>
                      {transaction.paymentMethod || "-"}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>

                    </td>

                    <td>
                      {transaction.gatewayPaymentId || "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {transactions.length === 0 && (
              <p className="text-gray-500 text-center py-6">
                No transactions found.
              </p>
            )}

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}
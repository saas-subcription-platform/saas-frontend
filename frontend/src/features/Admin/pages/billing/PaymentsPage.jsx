import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { getCompanyProfile } from "../../../Auth/Services/companyService";
import { getAllTransactions } from "../../../../paymentManagement/services/transactionApi";
import { getMySubscription } from "../../../../subscription/services/subscriptionService";

export default function Payments() {
  const [transactions, setTransactions] = useState([]);
  const [company, setCompany] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();

        console.log("Transactions:", data);

        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    const fetchCompany = async () => {
      try {
        const data = await getCompanyProfile();

        console.log("Company:", data);

        setCompany(data);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      }
    };

    const fetchSubscription = async () => {
      try {
        const data = await getMySubscription();

        console.log("My Subscription:", data);

        setSubscription(data);
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      }
    };

    fetchTransactions();
    fetchCompany();
    fetchSubscription();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "SUCCESS":
      case "ACTIVE":
      case "PAID":
        return "bg-green-100 text-green-700";

      case "FAILED":
      case "CANCELLED":
      case "EXPIRED":
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

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) {
      return "-";
    }

    return `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F4F7F3] p-6">
        <div className="max-w-6xl mx-auto">

          {/* Page Heading */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Payments & Billing
          </h1>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">

            {/* Current Plan */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-500">
                Current Plan
              </p>

              <h3 className="text-xl font-bold text-primary">
                {subscription?.planName || "-"}
              </h3>
            </div>

            {/* Company Size */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-500">
                Company Size
              </p>

              <h3 className="text-xl font-bold">
                {formatCompanySize(company?.companySize)}
              </h3>
            </div>

            {/* Plan Cost */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-500">
                Plan Cost
              </p>

              <h3 className="text-xl font-bold">
                {formatAmount(subscription?.amount)}
              </h3>
            </div>

            {/* Next Billing */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-500">
                Next Billing
              </p>

              <h3 className="text-xl font-bold">
                {formatDate(subscription?.renewalDate)}
              </h3>
            </div>

          </div>

          {/* Subscription Status */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">
              Subscription Status
            </h2>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                subscription?.status
              )}`}
            >
              {subscription?.status || "-"}
            </span>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Transaction History
            </h2>

            <div className="overflow-x-auto">

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

                      {/* Payment ID */}
                      <td className="py-4">
                        {transaction.paymentId || "-"}
                      </td>

                      {/* Amount */}
                      <td>
                        {formatAmount(transaction.amount)}
                      </td>

                      {/* Payment Method */}
                      <td>
                        {transaction.paymentMethod || "-"}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                            transaction.status
                          )}`}
                        >
                          {transaction.status || "-"}
                        </span>
                      </td>

                      {/* Gateway Payment ID */}
                      <td>
                        {transaction.gatewayPaymentId || "-"}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* Empty Transactions */}
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
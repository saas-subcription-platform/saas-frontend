import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { getMySubscription } from "../../../../subscription/services/subscriptionService";

const SubscriptionDetailsPage = () => {
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await getMySubscription();

        if (response) {
          setSubscription(response);
        } else {
          setSubscription(null);
        }
      } catch (err) {
        console.error(err);

        if (err.response?.status === 404 || err.response?.status === 500) {
          setSubscription(null);
        } else {
          setError("Failed to load subscription.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-xl text-gray-500">Loading subscription...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  if (!subscription) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="bg-white border border-border rounded-2xl shadow-sm p-10 w-full max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-dark">
              No Active Subscription
            </h2>

            <p className="mt-5 text-lg text-dark/70">
              Your company has not subscribed to any plan yet.
            </p>

            <p className="mt-2 text-dark/60">
              Subscribe to unlock premium features like Timesheet, Leave
              Management, Team Collaboration and Goals & OKRs.
            </p>

            <button
              onClick={() => navigate("/#pricing")}
              className="mt-8 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl"
            >
              View Subscription Plans
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark">
            Subscription Details
          </h2>

          <p className="mt-4 text-lg text-dark/70">
            View complete subscription information.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-border rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-border pb-6">
            <div>
              <h3 className="text-3xl font-bold text-primary">
                {subscription.planName}
              </h3>

              <p className="text-dark/70 mt-2">
                Subscription ID : #{subscription.subscriptionId}
              </p>
            </div>

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
              {subscription.status}
            </span>
          </div>

          {/* Company + Plan */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="font-semibold text-xl mb-4 text-dark">
                Company Information
              </h4>

              <div className="space-y-3">
                <p>
                  <strong>Company:</strong> {subscription.companyName}
                </p>

                <p>
                  <strong>Customer:</strong> {subscription.adminName}
                </p>

                <p>
                  <strong>Users Allowed:</strong> {subscription.maximumUsers}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-4 text-dark">
                Plan Information
              </h4>

              <div className="space-y-3">
                <p>
                  <strong>Plan:</strong> {subscription.planName}
                </p>

                <p>
                  <strong>Validity:</strong> {subscription.startDate} -{" "}
                  {subscription.endDate}
                </p>

                <p>
                  <strong>Amount:</strong> ₹{subscription.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-background rounded-xl p-5">
              <h5 className="text-dark/70 text-sm">Start Date</h5>

              <p className="text-xl font-bold text-dark mt-2">
                {subscription.startDate}
              </p>
            </div>

            <div className="bg-background rounded-xl p-5">
              <h5 className="text-dark/70 text-sm">End Date</h5>

              <p className="text-xl font-bold text-dark mt-2">
                {subscription.endDate}
              </p>
            </div>

            <div className="bg-background rounded-xl p-5">
              <h5 className="text-dark/70 text-sm">Renewal Date</h5>

              <p className="text-xl font-bold text-dark mt-2">
                {subscription.renewalDate}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-10">
            <h4 className="font-semibold text-xl text-dark mb-5">
              Included Modules
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              {subscription.features?.map((feature) => (
                <div
                  key={feature}
                  className="bg-background rounded-xl p-4 border border-border"
                >
                   {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="mt-10">
            <h4 className="font-semibold text-xl text-dark mb-4">
              Payment Information
            </h4>

            <div className="bg-background rounded-xl p-5 flex justify-between items-center">
              <div>
                <p className="text-dark/70">Subscription Status</p>

                <p className="font-bold text-green-600 text-lg">
                  {subscription.status}
                </p>
              </div>

              <div>
                <p className="text-dark/70">Subscription Amount</p>

                <p className="font-bold text-primary text-lg">
                  ₹{subscription.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => navigate("/admin/renewal")}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl"
            >
              Renew Subscription
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubscriptionDetailsPage;

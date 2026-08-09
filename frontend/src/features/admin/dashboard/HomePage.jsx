import AdminLayout from "../../../components/common/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardDetails } from "../../auth/services/companyService";
import { getMySubscription } from "../subscriptions/services/subscriptionService";
import { getLatestNotification } from "../notification/services/notificationService";

const HomePage = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [latestNotification, setLatestNotification] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  const [dashboard, setDashboard] = useState({
    adminName: "",
    companyName: "",
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardData, subscriptionData, notificationData] =
          await Promise.all([
            getDashboardDetails(),
            getMySubscription(),
            getLatestNotification(),
          ]);
        setDashboard(dashboardData);
        setSubscription(subscriptionData);
        setLatestNotification(notificationData.data);
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      } finally {
        setLoadingSubscription(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      {/* welcome */}
      <div className="space-y-8">
        <div className="bg-primary text-white rounded-2xl p-5 shadow-md">
          <h1 className="text-3xl font-bold">Welcome, {dashboard.adminName}</h1>

          <p className="mt-3 text-lg">{dashboard.companyName}</p>

          <p className="mt-2 opacity-90">
            Manage your company's subscriptions, users and billing from one
            dashboard.
          </p>
        </div>

        {/* account health card */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <h2 className="text-2xl font-bold text-dark mb-5">Account Health</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background rounded-xl p-4">
              Subscription: Active
            </div>

            <div className="bg-background rounded-xl p-4">
              Billing: Up To Date
            </div>

            <div className="bg-background rounded-xl p-4">
              Company Profile: Complete
            </div>

            <div className="bg-background rounded-xl p-4">
              Notifications: Enabled
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-2xl font-bold text-dark mb-5">
              Subscription Overview
            </h2>

            {loadingSubscription ? (
              <p className="text-dark/70">Loading subscription...</p>
            ) : subscription ? (
              <>
                <div className="space-y-3">
                  <p>
                    <strong>Current Plan:</strong> {subscription.planName}
                  </p>

                  <p className="flex items-center gap-2">
                    <strong>Billing Cycle:</strong>

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {subscription.billingCycle}
                    </span>
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{subscription.amount}
                  </p>

                  <p>
                    <strong>Renewal Date:</strong> {subscription.renewalDate}
                  </p>

                  <p>
                    <strong>Status:</strong>

                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        subscription.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </p>

                  <p>
                    <strong>Maximum Users:</strong> {subscription.maximumUsers}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-red-500">
                Subscription details not available.
              </p>
            )}
          </div>

          {/* notification */}
          <div
            onClick={() => navigate("/admin/notifications")}
            className="bg-white rounded-xl border border-border shadow-sm p-6 cursor-pointer hover:shadow-md transition"
          >
            <h2 className="text-2xl font-bold text-dark mb-4">
              Latest Notification
            </h2>

            <div className="bg-background rounded-xl p-5">
              {latestNotification ? (
                <>
                  <p className="font-medium text-dark">
                    {latestNotification.title}
                  </p>

                  <p className="text-dark/70 mt-2">
                    {latestNotification.message}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    {new Date(latestNotification.createdAt).toLocaleString()}
                  </p>

                  <p className="mt-4 text-primary font-medium">
                    View all notifications →
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-dark">
                    No notifications available.
                  </p>

                  <p className="mt-4 text-primary font-medium">
                    View all notifications →
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-dark mb-5">Quick Actions</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div
              onClick={() => navigate("/admin/users")}
              className="bg-white rounded-xl border border-border shadow-sm p-6 cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-semibold text-dark">Add User</h3>

              <p className="text-dark/70 mt-2">Manage company users</p>
            </div>

            <div
              onClick={() => navigate("/admin/company")}
              className="bg-white rounded-xl border border-border shadow-sm p-6 cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-semibold text-dark">Company Profile</h3>

              <p className="text-dark/70 mt-2">Update company information</p>
            </div>

          
            <div
              onClick={() => navigate("/admin/help")}
              className="bg-white rounded-xl border border-border shadow-sm p-6 cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-semibold text-dark">Help & Support</h3>

              <p className="text-dark/70 mt-2">Contact support team</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomePage;

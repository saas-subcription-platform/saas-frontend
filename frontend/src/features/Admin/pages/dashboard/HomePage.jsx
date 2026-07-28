import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardDetails } from "../../../Auth/Services/companyService";

const HomePage = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    adminName: "",
    companyName: "",
  });

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const data = await getDashboardDetails();
      setDashboard(data);
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
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

            <div className="space-y-3">
              <p>
                <strong>Current Plan:</strong> Professional
              </p>

              <p>
                <strong>Price:</strong> ₹2999/month
              </p>

              <p>
                <strong>Renewal Date:</strong> 30-Jun-2026
              </p>

              <p>
                <strong>Status:</strong>

                <span className="ml-2 text-green-600 font-semibold">
                  Active
                </span>
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-dark mb-3">
                Included Features
              </h3>

              <ul className="space-y-2 text-dark/80">
                <li>✓ User Management</li>
                <li>✓ Subscription Tracking</li>
                <li>✓ Billing Management</li>
                <li>✓ Analytics Dashboard</li>
                <li>✓ Priority Support</li>
              </ul>
            </div>
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
              <p className="font-medium text-dark">
                Your Professional Plan expires in 15 days.
              </p>

              <p className="text-dark/70 mt-2">
                Renew your subscription to continue enjoying uninterrupted
                access to all features.
              </p>

              <p className="mt-4 text-primary font-medium">
                View all notifications →
              </p>
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
              onClick={() => navigate("/admin/settings")}
              className="bg-white rounded-xl border border-border shadow-sm p-6 cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-semibold text-dark">Settings</h3>

              <p className="text-dark/70 mt-2">Configure account settings</p>
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

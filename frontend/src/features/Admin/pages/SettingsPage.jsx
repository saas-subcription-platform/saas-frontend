import AdminLayout from "../../../components/common/layout/AdminLayout";

const admin = {
  name: "John Doe",
  email: "john@technova.com",
  mobile: "+91 9876543210",
  role: "Super Admin",
  department: "Administration",
  username: "john_admin",
  lastLogin: "07 June 2026",
  status: "Active",
};

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark">
            Settings
          </h2>

          <p className="mt-4 text-lg text-dark/70">
            Manage your profile, notifications, and account settings.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-border rounded-2xl shadow-sm p-8">

          {/* Profile Section */}
          <div className="flex items-center gap-6 mb-10 border-b border-border pb-8">

            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
              JD
            </div>

            <div>
              <h3 className="text-2xl font-bold text-dark">
                {admin.name}
              </h3>

              <p className="text-dark/70">
                {admin.role}
              </p>
            </div>

          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-dark mb-6">
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium text-dark">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue={admin.name}
                  className="w-full border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-dark">
                  Email Address
                </label>

                <input
                  type="email"
                  defaultValue={admin.email}
                  className="w-full border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-dark">
                  Mobile Number
                </label>

                <input
                  type="text"
                  defaultValue={admin.mobile}
                  className="w-full border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-dark">
                  Department
                </label>

                <input
                  type="text"
                  defaultValue={admin.department}
                  className="w-full border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

            </div>
          </div>

          {/* Account Information */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-dark mb-5">
              Account Information
            </h3>

            <div className="bg-background rounded-xl p-6 space-y-3">

              <p>
                <strong>Username:</strong> {admin.username}
              </p>

              <p>
                <strong>Last Login:</strong> {admin.lastLogin}
              </p>

              <p>
                <strong>Status:</strong>

                <span className="ml-2 text-green-600 font-semibold">
                  {admin.status}
                </span>
              </p>

            </div>
          </div>

          {/* Notification Management */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-dark mb-5">
              Notification Management
            </h3>

            <div className="bg-background rounded-xl p-6 space-y-5">

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-dark">
                    Email Notifications
                  </h4>

                  <p className="text-sm text-dark/70">
                    Receive important updates through email.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-dark">
                    Subscription Renewal Alerts
                  </h4>

                  <p className="text-sm text-dark/70">
                    Notify before subscription expiry.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-dark">
                    Payment Notifications
                  </h4>

                  <p className="text-sm text-dark/70">
                    Get payment success and failure alerts.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-dark">
                    System Updates
                  </h4>

                  <p className="text-sm text-dark/70">
                    Receive new feature announcements.
                  </p>
                </div>

                <input
                  type="checkbox"
                  className="w-5 h-5"
                />
              </div>

            </div>
          </div>

          {/* Security Section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-dark mb-5">
              Security
            </h3>

            <div className="bg-background rounded-xl p-6">
              <p className="text-dark/70 mb-4">
                Update your password regularly to keep your account secure.
              </p>

              <button className="border border-border px-6 py-3 rounded-xl hover:bg-white transition">
                Change Password
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-10">

            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl transition">
              Save Changes
            </button>

            <button className="border border-border px-6 py-3 rounded-xl hover:bg-background transition">
              Cancel
            </button>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
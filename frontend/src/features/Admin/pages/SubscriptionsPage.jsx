import AdminLayout from "../../../components/common/layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const subscription = {
  id: 1,
  company: "TechNova Pvt Ltd",
  customer: "John Doe",
  plan: "Premium Plan",
  validity: "12 Months",
  startDate: "01 Jan 2025",
  endDate: "31 Dec 2025",
  renewalDate: "25 Dec 2025",
  amount: "$999",
  usersAllowed: 50,
  modules: [
    "Customer Management",
    "Subscription Tracking",
    "Billing & Payments",
    "Reports & Analytics",
  ],
  paymentStatus: "Paid",
  status: "Active",
};

const SubscriptionDetailsPage = () => {

  const navigate = useNavigate();

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

          {/* Top Section */}
          <div className="flex justify-between items-center border-b border-border pb-6">
            <div>
              <h3 className="text-3xl font-bold text-primary">
                {subscription.plan}
              </h3>

              <p className="text-dark/70 mt-2">
                Subscription ID : #{subscription.id}
              </p>
            </div>

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
              {subscription.status}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">

            <div>
              <h4 className="font-semibold text-xl mb-4 text-dark">
                Company Information
              </h4>

              <div className="space-y-3">
                <p>
                  <strong>Company:</strong> {subscription.company}
                </p>

                <p>
                  <strong>Customer:</strong> {subscription.customer}
                </p>

                <p>
                  <strong>Users Allowed:</strong>{" "}
                  {subscription.usersAllowed}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-4 text-dark">
                Plan Information
              </h4>

              <div className="space-y-3">
                <p>
                  <strong>Plan:</strong> {subscription.plan}
                </p>

                <p>
                  <strong>Validity:</strong>{" "}
                  {subscription.validity}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  {subscription.amount}
                </p>
              </div>
            </div>

          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-background rounded-xl p-5">
              <h5 className="text-dark/70 text-sm">
                Start Date
              </h5>

              <p className="text-xl font-bold text-dark mt-2">
                {subscription.startDate}
              </p>
            </div>

            <div className="bg-background rounded-xl p-5">
              <h5 className="text-dark/70 text-sm">
                End Date
              </h5>

              <p className="text-xl font-bold text-dark mt-2">
                {subscription.endDate}
              </p>
            </div>

            <div className="bg-background rounded-xl p-5">
              <h5 className="text-dark/70 text-sm">
                Renewal Date
              </h5>

              <p className="text-xl font-bold text-dark mt-2">
                {subscription.renewalDate}
              </p>
            </div>

          </div>

          {/* Modules */}
          <div className="mt-10">
            <h4 className="font-semibold text-xl text-dark mb-5">
              Included Modules
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              {subscription.modules.map((module) => (
                <div
                  key={module}
                  className="bg-background rounded-xl p-4 border border-border"
                >
                  {module}
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
                <p className="text-dark/70">
                  Payment Status
                </p>

                <p className="font-bold text-green-600 text-lg">
                  {subscription.paymentStatus}
                </p>
              </div>

              <div>
                <p className="text-dark/70">
                  Subscription Amount
                </p>

                <p className="font-bold text-primary text-lg">
                  {subscription.amount}
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

            <button className="border border-border px-6 py-3 rounded-xl hover:bg-background">
              Download Invoice
            </button>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default SubscriptionDetailsPage;
import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RenewalPage = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const currentPlan = "Professional";

  const plans = [
    {
      name: "Starter",
      price: "₹999",
      features: ["Organization Management", "User Management"],
    },
    {
      name: "Professional",
      price: "₹2999",
      features: ["Everything in Starter", "Subscription Tracking"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Multi-Tenant Support", "API Integration"],
    },
  ];

  const handleConfirmRenewal = () => {
    toast.success("Subscription renewed successfully!");
  };

  const handleCancel = () => {
    toast.error("Renewal cancelled");
  };

  const handleProceedPay = (plan) => {
    toast.info(`Proceeding with ${plan.name} plan`);
  };

  return (
    <AdminLayout>
      <div>
        <ToastContainer position="top-right" autoClose={2000} />

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark">
            Subscription Renewal
          </h2>

          <p className="text-dark/70 mt-3">
            Review renewal details before extending the subscription.
          </p>
        </div>

        <div className="bg-white border border-border rounded-2xl shadow-sm p-8">

          {/* Current + Renewal */}
          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Current Subscription
              </h3>

              <div className="space-y-3">
                <p><strong>Company:</strong> TechNova Pvt Ltd</p>
                <p><strong>Plan:</strong> Premium Plan</p>
                <p><strong>Current Validity:</strong> 12 Months</p>
                <p><strong>Expiry Date:</strong> 31 Dec 2025</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Renewal Details
              </h3>

            
              <div className="space-y-3">
                <p><strong>Renewal Period:</strong> 12 Months</p>
                <p><strong>New Expiry Date:</strong> 31 Dec 2026</p>
                <p><strong>Renewal Amount:</strong> $999</p>
                <p><strong>GST:</strong> $180</p>
              </div>
            </div>

          </div>

          {/* Payment */}
          <div className="mt-10 bg-background rounded-xl p-6">
            <h3 className="text-xl font-semibold text-dark mb-4">
              Payment Summary
            </h3>

            <div className="space-y-2">
              <p>Subscription Fee: $999</p>
              <p>GST: $180</p>
              <hr />
              <p className="font-bold text-xl text-primary">
                Total: $1179
              </p>
            </div>
          </div>

          {/* Available Plans */}
          <div className="mt-8">
            <button
              onClick={() => setShowPlans(!showPlans)}
              className="bg-dark text-white px-6 py-3 rounded-xl"
            >
              Available Plans
            </button>
          </div>

          {showPlans && (
            <div className="mt-8 grid md:grid-cols-3 gap-6">

              {plans.map((plan) => (
                <div
                  key={plan.name}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  onMouseLeave={() => setHoveredPlan(null)}

                  className={`border rounded-xl p-5 transition-all duration-300
                    ${
                      plan.name === currentPlan
                        ? "border-green-600 bg-green-50"
                        : "border-border"
                    }
                    ${
                      hoveredPlan === plan.name
                        ? "scale-105 shadow-xl bg-blue-50"
                        : ""
                    }
                  `}
                >
                  <h3 className="text-xl font-bold flex justify-between">
                    {plan.name}

                    {plan.name === currentPlan && (
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                        Current Plan
                      </span>
                    )}
                  </h3>

                  <p className="text-dark/70 mt-2">{plan.price}</p>

                  <ul className="mt-3 space-y-1 text-sm">
                    {plan.features.map((f) => (
                      <li key={f}>✔ {f}</li>
                    ))}
                  </ul>

                  {/* Proceed button on hover */}
                  {hoveredPlan === plan.name && (
                    <button
                      onClick={() => handleProceedPay(plan)}
                      className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
                    >
                      Proceed to Pay
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleConfirmRenewal}
              className="bg-primary text-white px-6 py-3 rounded-xl"
            >
              Confirm Renewal
            </button>

            <button
              onClick={handleCancel}
              className="border border-border px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default RenewalPage;
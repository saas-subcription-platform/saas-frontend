import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAllSubscriptionPlans } from "../services/subscriptionPlanService";
import { getMySubscription } from "../services/subscriptionService";

const RenewalPage = () => {
  const navigate = useNavigate();
  const [showPlans, setShowPlans] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [loading, setLoading] = useState(true);

  const subscriptionFee = selectedPricing?.price || 0;
  const gst = Number(subscriptionFee) * 0.18;
  const total = Number(subscriptionFee) + gst;

  useEffect(() => {
    const loadData = async () => {
      try {
        const subscriptionResponse = await getMySubscription();
        const plansResponse = await getAllSubscriptionPlans();

        const subscriptionData = subscriptionResponse;
        const plansData = plansResponse;

        setSubscription(subscriptionData);
        setPlans(plansData);

        const currentPlan = plansData.find(
          (plan) => plan.planName === subscriptionData.planName,
        );

        if (currentPlan) {
          setSelectedPlan(currentPlan);

          const currentPricing = currentPlan.pricingOptions.find(
            (pricing) =>
              pricing.active &&
              pricing.billingCycle === subscriptionData.billingCycle,
          );

          setSelectedPricing(currentPricing);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load renewal details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleConfirmRenewal = () => {
    toast.success("Subscription renewed successfully!");
  };

  const handleCancel = () => {
    toast.error("Renewal cancelled");
  };

  const handleProceedPay = (plan) => {
    const pricing =
      plan.pricingOptions.find(
        (p) => p.active && p.billingCycle === subscription.billingCycle,
      ) ?? plan.pricingOptions.find((p) => p.active);

    console.log("Proceed clicked");
    console.log("Subscription =", subscription);
    console.log("Billing Cycle =", subscription.billingCycle);
    console.log("Selected Pricing =", pricing);

    navigate("/payment", {
      state: {
        subscription,
        plan,
        pricing,
      },
    });
  };

  return (
    <AdminLayout>
      <div>
        <ToastContainer position="top-right" autoClose={2000} />

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark">Subscription Renewal</h2>

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
                <p>
                  <strong>Company:</strong> {subscription?.companyName}
                </p>
                <p>
                  <strong>Plan:</strong> {subscription?.planName}
                </p>
                <p>
                  <strong>Current Validity:</strong>
                  {subscription?.startDate} - {subscription?.endDate}
                </p>
                <p>
                  <strong>Expiry Date:</strong> {subscription?.endDate}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Renewal Details
              </h3>

              <div className="space-y-3">
                <p>
                  <strong>Renewal Period:</strong> 12 Months
                </p>
                <p>
                  <strong>New Expiry Date:</strong> {subscription?.renewalDate}
                </p>
                <p>
                  <strong>Renewal Amount:</strong> ₹{subscriptionFee}
                </p>

                <p>
                  <strong>GST:</strong> ₹{gst.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-10 bg-background rounded-xl p-6">
            <h3 className="text-xl font-semibold text-dark mb-4">
              Payment Summary
            </h3>

            <p>Subscription Fee: ₹{subscriptionFee}</p>
            <p>GST (18%): ₹{gst.toFixed(2)}</p>
            <hr />
            <p className="font-bold text-xl text-primary">
              Total: ₹{total.toFixed(2)}
            </p>
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
              {plans.map((plan) => {
                const pricing = plan.pricingOptions.find(
                  (p) =>
                    p.active && p.billingCycle === subscription.billingCycle,
                );

                return (
                  <div
                    key={plan.id}
                    onMouseEnter={() => setHoveredPlan(plan.planName)}
                    onMouseLeave={() => setHoveredPlan(null)}
                    className={`border rounded-xl p-5 transition-all duration-300
      ${
        selectedPlan?.id === plan.id
          ? "border-green-600 bg-green-50"
          : "border-border"
      }
      ${hoveredPlan === plan.planName ? "scale-105 shadow-xl bg-blue-50" : ""}`}
                  >
                    <h3 className="text-xl font-bold flex justify-between">
                      {plan.planName}

                      {selectedPlan?.id === plan.id && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                          Current Plan
                        </span>
                      )}
                    </h3>

                    <p className="text-dark/70 mt-2">
                      ₹{pricing?.price} / {pricing?.billingCycle}
                    </p>

                    <p className="text-sm mt-2">
                      Max Users : {plan.maximumUsers}
                    </p>

                    <ul className="mt-3 space-y-1 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature.id}>✔ {feature.featureName}</li>
                      ))}
                    </ul>

                    {hoveredPlan === plan.planName && (
                      <button
                        onClick={() => handleProceedPay(plan)}
                        className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
                      >
                        Proceed to Pay
                      </button>
                    )}
                  </div>
                );
              })}
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

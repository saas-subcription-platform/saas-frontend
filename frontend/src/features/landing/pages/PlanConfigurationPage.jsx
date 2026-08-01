import { useNavigate, useSearchParams } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import { getSubscriptionPlanById } from "../../admin/subscriptions/services/subscriptionPlanService";
import { ArrowLeft } from "lucide-react";

const PlanConfigurationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const planId = searchParams.get("plan");

  const [targetPlan, setTargetPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isYearly, setIsYearly] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const loadPlan = async () => {
      try {
        setLoading(true);

        const data = await getSubscriptionPlanById(planId);

        setTargetPlan(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load subscription plan.");
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      loadPlan();
    }
  }, [planId]);

  const monthlyPricing = useMemo(() => {
    return targetPlan?.pricingOptions?.find(
      (pricing) => pricing.billingCycle === "MONTHLY",
    );
  }, [targetPlan]);

  const yearlyPricing = useMemo(() => {
    return targetPlan?.pricingOptions?.find(
      (pricing) => pricing.billingCycle === "YEARLY",
    );
  }, [targetPlan]);

  const selectedPrice = isYearly
    ? (yearlyPricing?.price ?? 0)
    : (monthlyPricing?.price ?? 0);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading subscription plan...</h2>
      </div>
    );
  }

  if (error || !targetPlan) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold text-red-500">
          {error || "Subscription plan not found."}
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-dark p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-border rounded-lg shadow-sm hover:bg-white/80 transition"
          >
            <ArrowLeft size={20} className="text-dark" />
          </button>

          <h1 className="text-3xl md:text-4xl font-black text-center flex-1 tracking-wide text-primary uppercase">
            {targetPlan.planName} Plan
          </h1>

          <div className="w-10"></div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Section */}
          <div className="lg:col-span-7 space-y-8">
            {/* Company Plan Card */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">
                {targetPlan.planName} Plan
              </h2>

              <p className="text-dark/70">
                Includes access for up to {targetPlan.maximumUsers} users in
                your organization.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold mb-6">Included Features</h3>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {targetPlan.features?.map((feature) => (
                  <li
                    key={feature.featureName}
                    className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl shadow-sm"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full text-primary shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="font-medium">{feature.featureName}</p>
                      <p className="text-sm text-dark/60">
                        {feature.featureDescription}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-5 bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8">
            {/* Billing Toggle */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <span
                className={`text-sm font-bold ${
                  isYearly ? "text-dark" : "text-dark/40"
                }`}
              >
                Yearly
              </span>

              <button
                onClick={() => setIsYearly(!isYearly)}
                className="w-12 h-6 bg-dark rounded-full relative p-1"
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    !isYearly ? "translate-x-6" : ""
                  }`}
                />
              </button>

              <span
                className={`text-sm font-bold ${
                  !isYearly ? "text-dark" : "text-dark/40"
                }`}
              >
                Monthly
              </span>
            </div>

            {/* Plan Summary */}
            <div className="space-y-4 border-b border-border pb-6">
              <div>
                <h3 className="text-lg font-bold">
                  {targetPlan.planName} Plan
                </h3>

                <p className="text-sm text-dark/60 mt-1">
                  Includes up to {targetPlan.maximumUsers} users
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span>Subscription Price</span>
                <span>₹{selectedPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-md">
                  {isYearly ? "Total / Year" : "Total / Month"}
                </span>

                <span className="text-3xl font-black text-dark">
                  ₹{selectedPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {isYearly && (
                <p className="text-right text-xs text-dark/70 font-medium mt-2">
                  Billed annually
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-8">
                <button
                  onClick={() => {
                    const params = new URLSearchParams({
                      plan: targetPlan.id,
                      billing: isYearly ? "YEARLY" : "MONTHLY",
                    });

                    const redirectTo = `/payment?${params.toString()}`;

                    const token = localStorage.getItem("token");

                    console.log("Token =", token);
                    console.log("typeof =", typeof token);
                    console.log("token === null", token === null);
                    console.log("Boolean(token) =", Boolean(token));

                    if (token) {
                      console.log("Inside IF");
                      navigate(redirectTo);
                    } else {
                      console.log("Inside ELSE");
                      navigate("/login", {
                        state: { redirectTo },
                      });
                    }
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold tracking-wide transition shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanConfigurationPage;

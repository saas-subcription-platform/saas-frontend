import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

import { getCompanyProfile } from "../../Auth/Services/companyService";
import { getSubscriptionPlanById } from "../../../subscription/services/subscriptionPlanService";
import { createSubscription } from "../../../subscription/services/subscriptionService";
import { processRazorpayPayment } from "../../../paymentManagement/services/razorpayService";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const planId = searchParams.get("plan");

  const billing = searchParams.get("billing");

  const isYearly = billing === "YEARLY";

  console.log("planId =", planId);
  console.log("billing =", billing);

  // State to toggle active payment options
  const [paymentGateway, setPaymentGateway] = useState("upi");
  const [company, setCompany] = useState(null);
  const [plan, setPlan] = useState(null);

  const billingCycleLabelText = isYearly ? "per year" : "per month";
  useEffect(() => {
    const loadCompany = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const data = await getCompanyProfile();

        console.log("Company:", data);

        setCompany(data);
        console.log("Company API Response:", data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCompany();
  }, []);

  useEffect(() => {
    const loadPlan = async () => {
      if (!planId) return;

      try {
        const data = await getSubscriptionPlanById(planId);

        console.log("Selected Plan:", data);

        setPlan(data);
        console.log("Loaded Plan:", data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPlan();
  }, [planId]);

  const selectedPricing = useMemo(() => {
    return plan?.pricingOptions?.find((item) => item.billingCycle === billing);
  }, [plan, billing]);

  const subtotal = selectedPricing?.price ?? 0;

  const sgst = subtotal * 0.09;

  const cgst = subtotal * 0.09;

  const total = subtotal + sgst + cgst;

  console.log({
    plan,
    selectedPricing,
    subtotal,
    sgst,
    cgst,
    total,
  });

  const handleConfirmPayment = async () => {
    try {
      if (!plan || !selectedPricing || !company) {
        toast.error("Checkout details are not loaded.");
        return;
      }

      const request = {
        companyId: company.company_id,
        planId: plan.id,
        pricingId: selectedPricing.id,
      };

      console.log("Subscription Request:", request);

      // 1. Create subscription
      const response = await createSubscription(request);

      console.log("Subscription Created:", response);

      const subscription = response.data;
      const subscriptionId = subscription.subscriptionId;

      console.log("Subscription ID:", subscriptionId);

      // 2. Open Razorpay
      await processRazorpayPayment({
        subscriptionId,
        amount: total,
        paymentGateway,

        // 3. Runs only after successful payment verification
        onSuccess: () => {
          toast.success("Payment successful!");
          navigate("/payment-success");
        },
      });

    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Failed to process payment");
    }
  };
  return (
  <div className="bg-background min-h-screen text-dark p-4 md:p-8 font-sans">
    <div className="max-w-7xl mx-auto">

      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-border pb-6 mb-8 text-sm font-medium">
        <div className="flex items-center gap-2 text-dark/60">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 hover:text-primary transition mr-2"
          >
            <ChevronLeft size={16} /> Back
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-8">

          {/* Company Details */}
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-dark tracking-wide border-b border-border pb-3">
              Details
            </h2>

            <div className="space-y-4">

              {/* Name */}
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                  Your name *
                </label>

                <input
                  type="text"
                  value={company?.name || ""}
                  readOnly
                  className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                    Email *
                  </label>

                  <input
                    type="email"
                    value={company?.email || ""}
                    readOnly
                    className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                    Phone *
                  </label>

                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-border bg-background rounded-l-lg text-xs font-bold text-dark/60">
                      +91
                    </span>

                    <input
                      type="tel"
                      value={company?.phone || ""}
                      readOnly
                      className="w-full px-4 py-2.5 border border-border bg-white rounded-r-lg focus:outline-none focus:border-primary text-sm font-medium"
                    />
                  </div>
                </div>

              </div>

              {/* Company + GST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                    Company Name
                  </label>

                  <input
                    type="text"
                    value={company?.companyName || ""}
                    readOnly
                    className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                    VAT / GSTIN
                  </label>

                  <input
                    type="text"
                    value={company?.gstNumber || ""}
                    readOnly
                    className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>

              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                  Street and Number *
                </label>

                <input
                  type="text"
                  value={company?.address || ""}
                  readOnly
                  className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              {/* City + ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                    City *
                  </label>

                  <input
                    type="text"
                    value={company?.city || ""}
                    readOnly
                    className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">
                    Zip Code *
                  </label>

                  <input
                    type="text"
                    value={company?.zipCode || ""}
                    readOnly
                    className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8 space-y-6">

          {/* Subscription */}
          <div className="flex gap-4 items-start">

            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              {plan?.maximumUsers}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-dark truncate">
                {plan?.planName}
              </h4>

              <p className="text-xs text-dark/60 font-medium capitalize">
                {billing}
              </p>
            </div>

            <span className="font-bold text-sm text-dark tracking-tight">
              ₹
              {subtotal.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>

          </div>

          {/* Billing Summary */}
          <div className="space-y-2 text-sm font-medium border-b border-border pb-4 text-dark/80">

            <div className="flex justify-between">
              <span className="text-dark/60">Subtotal</span>
              <span>
                ₹
                {subtotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span>SGST (9%)</span>
              <span>
                ₹
                {sgst.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span>CGST (9%)</span>
              <span>
                ₹
                {cgst.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

          </div>

          {/* Total */}
          <div className="flex justify-between items-baseline font-black text-dark border-b border-border pb-4">
            <span className="text-base">Total</span>

            <span className="text-2xl tracking-tight text-dark">
              ₹
              {total.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-2">

            <button
              onClick={handleConfirmPayment}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold tracking-wide transition shadow-md flex items-center justify-center gap-2"
            >
              Confirm & Pay <span className="text-lg">→</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-dark/60 hover:text-dark transition"
            >
              Cancel and return
            </button>

          </div>

        </div>
        {/* END RIGHT COLUMN */}

      </div>
      {/* END MAIN GRID */}

    </div>
  </div>
);
};
export default CheckoutPage;
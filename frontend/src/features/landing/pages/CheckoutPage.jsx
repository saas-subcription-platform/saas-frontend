
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, ChevronLeft } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract dynamic values passed via URL queries from the config page
  const planTitle = searchParams.get("title") || "Standard Plan";
  const basePricePerUser = parseFloat(searchParams.get("basePrice") || "0");
  const discountPerUser = parseFloat(searchParams.get("discount") || "0");
  const userCount = parseInt(searchParams.get("users") || "1", 10);
  const billingCycle = searchParams.get("billing") || "yearly";
  const isYearly = billingCycle === "yearly";

  // State to toggle active payment options
  const [paymentGateway, setPaymentGateway] = useState("upi");

  // Ledger Subtotal & Indian Compliance Taxation (9% SGST + 9% CGST)
  const billingPeriodMultiplier = isYearly ? 12 : 1;
  const rawSubtotalAmount = basePricePerUser * userCount * billingPeriodMultiplier;
  const rawDiscountReduction = discountPerUser * userCount * billingPeriodMultiplier;
  const netTaxableSubtotal = rawSubtotalAmount - rawDiscountReduction;

  const sgstTaxLevy = netTaxableSubtotal * 0.09;
  const cgstTaxLevy = netTaxableSubtotal * 0.09;
  const grandTotalAmount = netTaxableSubtotal + sgstTaxLevy + cgstTaxLevy;

  const billingCycleLabelText = isYearly ? "per year" : "per month";

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
          <div className="flex items-center gap-3">
            <span className="text-xs text-dark/70 font-semibold">Already have an account?</span>
            <button onClick={() => navigate("/login")} className="bg-dark text-white px-5 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-dark/90 transition">
              Sign in
            </button>
          </div>
        </div>

        {/* Master Column Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block Side Panel: User Form Fields & Payment Tabs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-dark tracking-wide border-b border-border pb-3">Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">Your name *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">Email *</label>
                    <input type="email" className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">Phone *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-border bg-background rounded-l-lg text-xs font-bold text-dark/60">+91</span>
                      <input type="tel" className="w-full px-4 py-2.5 border border-border bg-white rounded-r-lg focus:outline-none focus:border-primary text-sm font-medium" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">Company Name</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">VAT / GSTIN</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">Street and Number *</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">City *</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase text-dark/70">Zip Code *</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-border bg-white rounded-lg focus:outline-none focus:border-primary text-sm font-medium" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Integration Panel Layer */}
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-dark tracking-wide">Select Payment Method</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setPaymentGateway("upi")}
                  className={`flex items-center justify-center gap-3 p-4 border rounded-xl font-bold transition text-sm ${paymentGateway === "upi" ? "border-primary bg-secondary/10 text-primary" : "border-border hover:bg-background text-dark"}`}
                >
                  <Smartphone size={18} /> UPI (GPay/PhonePe)
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentGateway("card")}
                  className={`flex items-center justify-center gap-3 p-4 border rounded-xl font-bold transition text-sm ${paymentGateway === "card" ? "border-primary bg-secondary/10 text-primary" : "border-border hover:bg-background text-dark"}`}
                >
                  <CreditCard size={18} /> Credit / Debit Card
                </button>
              </div>

              {/* Dynamic Option Input Toggles depending on active selection context */}
              <div className="p-4 bg-background rounded-xl border border-border text-sm">
                {paymentGateway === "upi" ? (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase text-dark/70">Enter UPI ID VPA *</label>
                    <input type="text" placeholder="username@upi" className="w-full md:w-80 px-4 py-2 border border-border bg-white rounded-lg focus:outline-none focus:border-primary font-medium" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 uppercase text-dark/70">Card Number *</label>
                      <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full px-4 py-2 border border-border bg-white rounded-lg focus:outline-none focus:border-primary font-medium" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1 uppercase text-dark/70">Expiry Date *</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-border bg-white rounded-lg focus:outline-none focus:border-primary font-medium" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1 uppercase text-dark/70">CVV *</label>
                        <input type="password" placeholder="***" maxLength="3" className="w-full px-4 py-2 border border-border bg-white rounded-lg focus:outline-none focus:border-primary font-medium" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column Section: Itemized Checkout Receipt Summary */}
          <div className="lg:col-span-5 bg-white border border-border rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            
                       {/* Subscription Summary Item Row */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                {userCount}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-dark truncate">{planTitle}</h4>
                <p className="text-xs text-dark/60 font-medium capitalize">{billingCycleLabelText}</p>
              </div>
              <span className="font-bold text-sm text-dark tracking-tight">
                {rawSubtotalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Rs
              </span>
            </div>

            {/* Conditional Promo Reduction Display Line */}
            {rawDiscountReduction > 0 && (
              <div className="flex gap-4 items-start border-b border-border pb-4">
                <div className="w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  %
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-primary truncate">{planTitle} Discount</h4>
                  <p className="text-xs text-primary/80 font-medium capitalize">{billingCycleLabelText}</p>
                </div>
                <span className="font-bold text-sm text-primary tracking-tight">
                  -{rawDiscountReduction.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Rs
                </span>
              </div>
            )}

            {/* Calculations Breakdown Tax Table Ledger */}
            <div className="space-y-2 text-sm font-medium border-b border-border pb-4 text-dark/80">
              <div className="flex justify-between">
                <span className="text-dark/60">Subtotal</span>
                <span>{netTaxableSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Rs</span>
              </div>
              <div className="flex justify-between text-xs text-dark/70">
                <span>SGST (9%)</span>
                <span>{sgstTaxLevy.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Rs</span>
              </div>
              <div className="flex justify-between text-xs text-dark/70">
                <span>CGST (9%)</span>
                <span>{cgstTaxLevy.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Rs</span>
              </div>
            </div>

            {/* Grand Total Value Indicator */}
            <div className="flex justify-between items-baseline font-black text-dark border-b border-border pb-4">
              <span className="text-base">Total</span>
              <span className="text-2xl tracking-tight text-dark">
                {grandTotalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Rs
              </span>
            </div>

            {/* Promo Code Coupon Fields */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Discount code..." 
                className="w-full px-4 py-2 text-sm border border-border bg-white rounded-xl focus:outline-none focus:border-primary font-medium text-dark placeholder-dark/40" 
              />
              <button className="bg-background hover:bg-border/30 border border-border px-5 py-2 rounded-xl text-sm font-bold transition text-dark">
                Apply
              </button>
            </div>

            {/* Conditions Info / Action Panel Buttons */}
            <div className="space-y-4 pt-2">
              <div className="bg-background p-4 rounded-xl border border-border text-xs text-dark/70 leading-relaxed font-medium">
                <h5 className="font-bold text-dark mb-1 uppercase tracking-wide">Sales Conditions</h5>
                FINAL SALES - Please note that all sales of subscriptions and related enterprise configurations are final and non-refundable.
              </div>

              {/* Form Submission Actions */}
              <button onClick={() => navigate("/payment-success")} className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold tracking-wide transition shadow-md flex items-center justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

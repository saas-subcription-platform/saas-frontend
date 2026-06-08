import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Home, LayoutDashboard } from "lucide-react";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen text-dark flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white border border-border rounded-2xl p-8 shadow-lg text-center space-y-6">
        
        {/* Animated Checkmark Canvas Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center text-primary animate-bounce">
            <CheckCircle size={48} strokeWidth={2.5} />
          </div>
        </div>

        {/* Header Notification Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-dark tracking-wide">
            Payment Successful!
          </h1>
          <p className="text-sm text-dark/70 font-medium px-4">
            Thank you for your purchase. Your enterprise subscription workspace configuration has been successfully provisioned.
          </p>
        </div>

        {/* Structural Order Details Dummy Breakdown */}
        <div className="bg-background p-4 rounded-xl border border-border text-xs font-semibold text-dark/70 space-y-2 text-left">
          <div className="flex justify-between">
            <span>Order Reference:</span>
            <span className="text-dark font-bold">#SUB-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-primary font-bold uppercase tracking-wider">Activated</span>
          </div>
        </div>

        {/* Actionable Re-routing Workspace Paths */}
        <div className="pt-4 grid grid-cols-1 gap-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold tracking-wide transition shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <LayoutDashboard size={16} /> Go to Dashboard
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full bg-background hover:bg-border/30 border border-border text-dark py-3 rounded-xl font-bold tracking-wide transition text-sm flex items-center justify-center gap-2"
          >
            <Home size={16} /> Return Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccessPage;

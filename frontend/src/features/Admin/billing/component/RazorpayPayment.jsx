import { useNavigate } from "react-router-dom";
import { createPaymentOrder, verifyPayment,} from "../services/paymentApi";

const RazorpayPayment = ({ subscriptionId, amount }) => {

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {

      // Create Razorpay order through backend
      const order = await createPaymentOrder({
        subscriptionId,
        amount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: Math.round(amount * 100),

        currency: order.currency,

        name: "SaaS Subscription Platform",

        description: "Subscription Payment",

        order_id: order.gatewayOrderId,

        handler: async (response) => {
          try {

            // Verify payment through backend
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            // Backend creates transaction + invoice
            navigate("/payment-success");

          } catch (error) {
            console.error("Payment verification failed:", error);
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error("Failed to create payment order:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold tracking-wide transition shadow-md"
    >
      Confirm & Pay
    </button>
  );
};

export default RazorpayPayment;
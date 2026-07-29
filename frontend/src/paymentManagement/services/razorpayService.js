import {
  createPaymentOrder,
  verifyPayment,
  markPaymentFailed,
} from "./paymentApi";

export const processRazorpayPayment = async ({
  subscriptionId,
  amount,
  paymentGateway,
  onSuccess,
}) => {
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

    config: {
      display: {
        blocks: {
          paymentMethods: {
            name: "Payment Options",
            instruments: [
              {
                method: "upi",
              },
              {
                method: "card",
              },
            ],
          },
        },

        sequence: ["block.paymentMethods"],

        preferences: {
          show_default_blocks: false,
        },
      },
    },

    handler: async (response) => {
      await verifyPayment({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      });

      if (onSuccess) {
        onSuccess(response);
      }
    },
  };

  const razorpay = new window.Razorpay(options);

  razorpay.on("payment.failed", async (response) => {
    try {
      await markPaymentFailed({
        razorpayOrderId:
          response.error.metadata?.order_id ||
          order.gatewayOrderId,

        razorpayPaymentId:
          response.error.metadata?.payment_id || null,

        failureReason:
          response.error.description || "Payment failed",
      });
    } catch (error) {
      console.error(
        "Failed to record failed payment:",
        error
      );
    }
  });

  razorpay.open();
};
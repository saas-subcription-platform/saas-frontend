import {
  createPaymentOrder,
  verifyPayment,
  markPaymentFailed,
} from "./paymentApi";

export const processRazorpayPayment = async ({
  amount,
  paymentGateway,
  onSuccess,
  onFailure,
}) => {
  // Step 1: Create Razorpay Order
  const order = await createPaymentOrder({
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
      try {
        // Step 2: Verify Payment
        await verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });

        // Step 3: Continue with subscription creation/renewal
        if (onSuccess) {
          await onSuccess({
            paymentResponse: response,
            paymentId: order.paymentId,
          });
        }
      } catch (error) {
        console.error("Payment verification failed:", error);

        if (onFailure) {
          onFailure(error);
        }
      }
    },

    modal: {
      ondismiss: () => {
        if (onFailure) {
          onFailure();
        }
      },
    },
  };

  const razorpay = new window.Razorpay(options);

  razorpay.on("payment.failed", async (response) => {
    try {
      await markPaymentFailed({
        razorpayOrderId:
          response.error.metadata?.order_id || order.gatewayOrderId,

        razorpayPaymentId:
          response.error.metadata?.payment_id ||
          response.error.metadata?.order_id ||
          order.gatewayOrderId,

        failureReason: response.error.description || "Payment failed",
      });

      if (onFailure) {
        onFailure(response);
      }
    } catch (error) {
      console.error("Failed to record failed payment:", error);
    }
  });

  razorpay.open();
};
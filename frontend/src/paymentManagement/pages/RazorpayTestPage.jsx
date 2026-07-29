import RazorpayPayment from "../component/RazorpayPayment";

const RazorpayTestPage = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <div className="bg-white p-8 rounded-2xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-2">
          Razorpay Test
        </h1>

        <p className="text-gray-500 mb-6">
          Temporary page for testing payment integration.
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Subscription ID
          </p>

          <p className="font-semibold">
            1
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="text-xl font-bold">
            ₹100
          </p>
        </div>

        <RazorpayPayment
          subscriptionId={1}
          amount={100}
        />

      </div>

    </div>
  );
};

export default RazorpayTestPage;
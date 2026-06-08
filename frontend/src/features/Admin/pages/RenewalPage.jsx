import AdminLayout from "../../../components/common/layout/AdminLayout";

const RenewalPage = () => {
  return (
    <AdminLayout>
      <div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark">
            Subscription Renewal
          </h2>

          <p className="text-dark/70 mt-3">
            Review renewal details before extending the subscription.
          </p>
        </div>

        {/* Renewal Card */}
        <div className="bg-white border border-border rounded-2xl shadow-sm p-8">

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

          {/* Amount Summary */}
          <div className="mt-10 bg-background rounded-xl p-6">
            <h3 className="text-xl font-semibold text-dark mb-4">
              Payment Summary
            </h3>

            <div className="space-y-2">
              <p>Subscription Fee : $999</p>
              <p>GST : $180</p>

              <hr />

              <p className="font-bold text-xl text-primary">
                Total : $1179
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl">
              Confirm Renewal
            </button>

            <button className="border border-border px-6 py-3 rounded-xl">
              Cancel
            </button>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default RenewalPage;
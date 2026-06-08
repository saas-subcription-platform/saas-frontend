import AdminLayout from "../../../components/common/layout/AdminLayout";

const HelpPage = () => {
    return (
        <AdminLayout>

            <div className="space-y-6">

                <div className="text-center">
                    <h1 className="text-4xl font-bold text-dark">
                        Help & Support
                    </h1>

                    <p className="text-dark/70 mt-3">
                        Need assistance? Our support team is here to help.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8 space-y-6">

                    <div className="border border-border rounded-xl p-5">
                        <h2 className="text-xl font-semibold text-dark mb-2">
                            Email Support
                        </h2>

                        <p className="text-dark/70">
                            support@saasplatform.com
                        </p>
                    </div>

                    <div className="border border-border rounded-xl p-5">
                        <h2 className="text-xl font-semibold text-dark mb-2">
                            Call Support
                        </h2>

                        <p className="text-dark/70">
                            +91 9898989898
                        </p>
                    </div>

                    <div className="border border-border rounded-xl p-5">
                        <h2 className="text-xl font-semibold text-dark mb-2">
                            Support Hours
                        </h2>

                        <p className="text-dark/70">
                            Monday - Friday
                        </p>

                        <p className="text-dark/70">
                            9:00 AM - 6:00 PM
                        </p>
                    </div>

                    <div className="border border-border rounded-xl p-5">
                        <h2 className="text-xl font-semibold text-dark mb-2">
                            Live Chat
                        </h2>

                        <p className="text-dark/70 mb-4">
                            Chat with our support team for quick assistance.
                        </p>

                        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl">
                            Start Chat
                        </button>
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default HelpPage;
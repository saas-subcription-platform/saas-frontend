import AdminLayout from "../../../components/common/layout/AdminLayout";

const CompanyProfile = () => {
    const company = {
        name: "Tech Solutions Pvt Ltd",
        email: "contact@tech.com",
        phone: "9876543210",
        website: "www.tech.com",
        gstNumber: "27ABCDE1234F1Z5",
        industry: "Software Services",
        address: "Hinjewadi Phase 2, Pune, Maharashtra"
    };  

    return(
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-dark">
                        Company Profile
                    </h1>
                    <button className="bg-primary text-white px-3 py-2 rounded-lg w-40">
                        Edit Profile
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-500">
                                Company Name
                            </p>
                            <p className="text-lg font-semibold text-dark">
                                {company.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Company Email
                            </p>
                            <p className="text-lg font-semibold text-dark">
                                {company.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Company Phone
                            </p>
                            <p className="text-lg font-semibold text-dark">
                                {company.phone}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Company Website
                            </p>
                            <p className="text-lg font-semibold text-dark">
                                {company.website}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Company GSTN
                            </p>
                            <p className="text-lg font-semibold text-dark">
                                {company.gstNumber}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Company Industry
                            </p>
                            <p className="text-lg font-semibold text-dark">
                                {company.industry}
                            </p>
                        </div>

                        <div className="col-span-2">
                            <p className="text-gray-500"
                            >Address
                            </p>
                            <p className="text-lg font-semibold text-dark">
                                {company.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default CompanyProfile;
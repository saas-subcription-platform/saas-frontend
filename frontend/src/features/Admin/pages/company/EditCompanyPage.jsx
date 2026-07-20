import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const EditCompanyPage = () => {

    const company = {
        name: "Tech Solutions Pvt Ltd",
        email: "contact@tech.com",
        phone: "9876543210",
        website: "www.tech.com",
        gstNumber: "27ABCDE1234F1Z5",
        industry: "Software Services",
        address: "Hinjewadi Phase 2, Pune, Maharashtra"
    };

    const navigate = useNavigate();

    const [name, setName] = useState(company.name);
    const [email, setEmail] = useState(company.email);
    const [phone, setPhone] = useState(company.phone);
    const [website, setWebsite] = useState(company.website);
    const [gstNumber, setGstNumber] = useState(company.gstNumber);
    const [industry, setIndustry] = useState(company.industry);
    const [address, setAddress] = useState(company.address);

    const handleEdit = () => {
        toast.success("Company profile edited successfully");
        navigate("/admin/company");
    }

    return (
        <AdminLayout>
            <div className="space-y-6">


                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-dark">
                        Edit Company Profile
                    </h1>

                    <button className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate("/admin/company")}>
                        Back
                    </button>
                </div>


                <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
                    <input value={company.gstNumber}
                        disabled
                        className="w-full border p-3 rounded" />

                    <input value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-3 rounded" />

                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-3 rounded" />

                    <input value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-3 rounded" />

                    <input value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full border p-3 rounded" />

                    <input value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        className="w-full border p-3 rounded" />

                    <input value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full border p-3 rounded" />

                    <input value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-3 rounded" />


                    <button className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={handleEdit}>
                        Save Changes
                    </button>

                </div>
            </div>
        </AdminLayout>
    )

}

export default EditCompanyPage;
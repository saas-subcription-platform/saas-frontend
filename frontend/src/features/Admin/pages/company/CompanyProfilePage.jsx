import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../../Auth/Services/companyService";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const data = await getCompanyProfile();
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [navigate]);

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-lg">Loading...</p>
      </AdminLayout>
    );
  }

  if (!company) {
    return (
      <AdminLayout>
        <p className="text-red-500">Failed to load company profile.</p>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-dark">Company Profile</h1>
          <button
            className="bg-primary text-white px-3 py-2 rounded-lg w-40"
            onClick={() => navigate("/admin/company/edit")}
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500">Company Name</p>
              <p className="text-lg font-semibold text-dark">
                {company.companyName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Company Phone</p>
              <p className="text-lg font-semibold text-dark">
                {company.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Company GSTN</p>
              <p className="text-lg font-semibold text-dark">
                {company.gstNumber || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Pin code</p>
              <p className="text-lg font-semibold text-dark">
                {company.zipCode || "-"}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-500">Address</p>
              <p className="text-lg font-semibold text-dark">
                {[
                  company.address,
                  company.city,
                  company.state,
                ]
                  .filter(Boolean)
                  .join(", ") || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Country</p>
              <p className="text-lg font-semibold text-dark">
                {company.country || "-"}
              </p>
            </div>


          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CompanyProfile;

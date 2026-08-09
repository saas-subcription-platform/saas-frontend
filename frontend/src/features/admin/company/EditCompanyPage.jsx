import AdminLayout from "../../../components/common/layout/AdminLayout";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getCompanyProfile,
  updateCompanyProfile,
} from "../../auth/services/companyService";

const EditCompanyPage = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [company, setCompany] = useState({
    phone: "",
    gstNumber: "",
    companySize: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyProfile();
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await updateCompanyProfile(company);
      toast.success("Company profile updated successfully");
      navigate("/admin/company");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update company profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-lg">Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-dark">Edit Company Profile</h1>

          <button
            className="bg-primary text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/admin/company")}
          >
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Phone
            </label>
            <input
              type="text"
              name="phone"
              value={company.phone || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Size
            </label>
            <select
              name="companySize"
              value={company.companySize || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Company Size</option>
              <option value="ONE_TO_TEN">1 - 10 Employees</option>
              <option value="ELEVEN_TO_FIFTY">11 - 50 Employees</option>
              <option value="FIFTY_ONE_TO_TWO_HUNDRED">
                51 - 200 Employees
              </option>
              <option value="TWO_HUNDRED_ONE_TO_FIVE_HUNDRED">
                201 - 500 Employees
              </option>
              <option value="FIVE_HUNDRED_PLUS">500+ Employees</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={company.address || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={company.city || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={company.state || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={company.country || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={company.zipCode || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditCompanyPage;

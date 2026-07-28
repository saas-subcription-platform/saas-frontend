import AdminLayout from "../../../../../components/common/layout/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "../services/userService";
import { getCompanyProfile } from "../../../../Auth/Services/companyService";

const AddUserPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  const [role, setRole] = useState("EMPLOYEE");
  const [status, setStatus] = useState("ACTIVE");

  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch companyId on component mount
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyData = await getCompanyProfile();

        console.log("=== FETCHED COMPANY DATA ===", companyData);

        // Check common ID field names or extract from nested user object
        // 1. Updated line below to extract company_id correctly:
        const companyId =
          companyData?.company_id || companyData?.companyId || companyData?.id;

        console.log("Extracted Company ID:", companyId);
        if (!companyId) {
          toast.error("Company details not loaded yet. Please try again.");
          return;
        }
        setCompanyId(companyId);
      } catch (error) {
        console.error("Failed to fetch company profile:", error);
        toast.error("Could not load company details");
      }
    };

    fetchCompanyData();
  }, []);

  const handleAddUser = async () => {
    // Basic validation check for companyId
    if (!companyId) {
      toast.error("Company details not loaded yet. Please try again.");
      return;
    }

    try {
      setLoading(true);

      // Build payload using your state variables directly
      const payload = {
        firstName,
        lastName,
        email,
        password,
        phone,
        department,
        role,
        status,
        companyId: Number(companyId),
      };

      console.log("========== USER DATA SENT ==========");
      console.log(payload);
      console.log("====================================");

      await addUser(payload);

      toast.success("Employee Added Successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error("Add User Error:", error);

      if (error.response) {
        console.log("Status :", error.response.status);
        console.log("Response :", error.response.data);
      }

      toast.error("Failed to Add Employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-dark">Add Employee</h1>

          <button
            className="bg-primary text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/admin/users")}
          >
            Back
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="HR">HR</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-border p-3 rounded-lg"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleAddUser}
              disabled={loading}
              className="bg-primary text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUserPage;

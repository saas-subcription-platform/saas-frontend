import AdminLayout from "../../../components/common/layout/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("Employee");
    const [status, setStatus] = useState("Active");

    const handleAddUser = () => {

        alert("User Added Successfully");

        navigate("/admin/users");
    };

    return (
        <AdminLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-dark">
                        Add User
                    </h1>

                    <button className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate("/admin/users")}>
                        Back
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <label className="block mb-2 font-medium">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border border-border p-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border border-border p-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-border p-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-border p-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Department
                            </label>

                            <input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full border border-border p-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Role
                            </label>

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full border border-border p-3 rounded-lg"
                            >
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>Employee</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border border-border p-3 rounded-lg"
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleAddUser}
                            className="bg-primary text-white px-6 py-3 rounded-lg"
                        >
                            Add User
                        </button>
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default AddUserPage;

import AdminLayout from "../../../../../components/common/layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "../services/userService";

const EditUserPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadUser = async () => {

        try {

            const response = await getUserById(id);

            const user = response.data;

            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);

        } catch (error) {

            console.error(error);
            toast.error("Failed to load employee");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const handleSave = async () => {

        try {

            setSaving(true);

            const userData = {

                firstName,
                lastName,
                email,
                phone

            };

            await updateUser(id, userData);

            toast.success("Employee Updated Successfully");

            navigate("/admin/users");

        } catch (error) {

            console.error(error);

            toast.error("Failed to Update Employee");

        } finally {

            setSaving(false);

        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <h2 className="text-2xl p-8">Loading...</h2>
            </AdminLayout>
        );
    }

    return (

        <AdminLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-4xl font-bold text-dark">
                        Edit Employee
                    </h1>

                    <button
                        className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate("/admin/users")}
                    >
                        Back
                    </button>

                </div>

                <div className="bg-white p-8 rounded-xl shadow-md space-y-4">

                    <div>
                        <label className="block mb-2 font-medium">
                            Employee ID
                        </label>

                        <input
                            value={id}
                            disabled
                            className="w-full border p-3 rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            First Name
                        </label>

                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Last Name
                        </label>

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Phone
                        </label>

                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    <button
                        className="bg-primary text-white px-6 py-3 rounded-lg"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </div>

        </AdminLayout>

    );
};

export default EditUserPage;
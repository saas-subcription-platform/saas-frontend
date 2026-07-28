import AdminLayout from "../../../../../components/common/layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";

const UserDetailsPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {

            const response = await getUserById(id);

            console.log("User Details:", response.data);

            setUser(response.data);

        } catch (error) {

            console.error("Error fetching user:", error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <h2 className="text-2xl p-8">Loading...</h2>
            </AdminLayout>
        );
    }

    if (!user) {
        return (
            <AdminLayout>
                <h2 className="text-2xl p-8">Employee not found</h2>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="bg-white rounded-xl shadow-md p-8">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-4xl font-bold text-dark">
                        Employee Details
                    </h1>

                    <button
                        className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate("/admin/users")}
                    >
                        Back
                    </button>

                </div>

                <div className="space-y-4">

                    <p>
                        <strong>Employee ID:</strong> {user.userId}
                    </p>

                    <p>
                        <strong>First Name:</strong> {user.firstName}
                    </p>

                    <p>
                        <strong>Last Name:</strong> {user.lastName}
                    </p>

                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <p>
                        <strong>Phone:</strong> {user.phone}
                    </p>

                    <p>
                        <strong>Department:</strong> {user.department}
                    </p>

                    <p>
                        <strong>Role:</strong> {user.role}
                    </p>

                    <p>
                        <strong>Status:</strong> {user.status}
                    </p>

                    <p>
                        <strong>Company ID:</strong> {user.companyId}
                    </p>

                    <p>
                        <strong>Company Name:</strong> {user.companyName}
                    </p>

                </div>

            </div>

        </AdminLayout>
    );
};

export default UserDetailsPage;
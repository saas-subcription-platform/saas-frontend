import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../services/userService";
import { toast } from "react-toastify";


const UsersPage = () => {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const loadUsers = async () => {
        try {
            const response = await getAllUsers();

            console.log("Users Response:", response.data);

            setUsers(response.data);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

   
    const handleDelete = async (id) => {
    try {
        console.log("Deleting user:", id);

        await deleteUser(id);

        toast.success("Employee Deleted Successfully");

        loadUsers(); // refresh table
    } catch (error) {
        console.error("Delete Error:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        }

        toast.error("Failed to Delete Employee");
    }
};


     

    return (
        <AdminLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-dark">
                        Employee Management
                    </h1>

                    <button
                        className="bg-primary text-white px-3 py-2 rounded-lg"
                        onClick={() => navigate("/admin/users/add")}
                    >
                        Add Employee
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-background">
                            <tr>
                                <th className="text-left p-4">Employee ID</th>
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Department</th>
                                <th className="text-left p-4">Role</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.length > 0 ? (

                                users.map((user) => (

                                    <tr
                                        key={user.userId}
                                        className="border-t border-border"
                                    >

                                        <td className="p-4">
                                            {user.userId}
                                        </td>

                                        <td className="p-4">
                                            {user.firstName} {user.lastName}
                                        </td>

                                        <td className="p-4">
                                            {user.email}
                                        </td>

                                        <td className="p-4">
                                            {user.department}
                                        </td>

                                        <td className="p-4">
                                            {user.role}
                                        </td>

                                        <td className="p-4">
                                            {user.status}
                                        </td>

                                        <td className="p-4 space-x-2">

                                            <button
                                                className="bg-primary text-white px-3 py-2 rounded-lg w-17"
                                                onClick={() =>
                                                    navigate(`/admin/users/${user.userId}`)
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="bg-primary text-white px-3 py-2 rounded-lg w-17"
                                                onClick={() =>
                                                    navigate(`/admin/users/edit/${user.userId}`)
                                                }
                                            >
                                                Edit
                                            </button>

                                           <button
                                               className="bg-primary text-white px-3 py-2 rounded-lg w-20"
                                                onClick={() => handleDelete(user.userId)}
>
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>
    );
};

export default UsersPage;
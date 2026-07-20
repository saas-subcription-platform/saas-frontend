import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { useState } from "react";


const UsersPage = () => {
    const [users, setUsers] = useState([
        {
            id: "EMP001",
            firstName: "Rahul",
            lastName: "Sharma",
            email: "rahul@company.com",
            phone: "9876543210",
            department: "Sales",
            role: "Manager",
            status: "Active",
            joinDate: "01-Jan-2026"
        },
        {
            id: "EMP002",
            firstName: "Priya",
            lastName: "Patil",
            email: "priya@company.com",
            phone: "9988776655",
            department: "HR",
            role: "Employee",
            status: "Active",
            joinDate: "10-Jan-2026"
        },
        {
            id: "EMP003",
            firstName: "Amit",
            lastName: "Verma",
            email: "amit@company.com",
            phone: "9123456789",
            department: "IT",
            role: "Admin",
            status: "Active",
            joinDate: "15-Jan-2026"
        },
        {
            id: "EMP004",
            firstName: "Sneha",
            lastName: "Kulkarni",
            email: "sneha@company.com",
            phone: "9876123456",
            department: "Marketing",
            role: "Manager",
            status: "Inactive",
            joinDate: "20-Jan-2026"
        },
        {
            id: "EMP005",
            firstName: "Rohan",
            lastName: "Deshmukh",
            email: "rohan@company.com",
            phone: "9988123456",
            department: "Finance",
            role: "Employee",
            status: "Active",
            joinDate: "25-Jan-2026"
        }
    ]);

    const navigate = useNavigate();

    return (
        <AdminLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-dark">
                        User Management
                    </h1>

                    <button className="bg-primary text-white px-3 py-2 rounded-lg w-25"
                            onClick={() => navigate("/admin/users/add")}>
                        Add User
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-background">
                            <tr>
                                <th className="text-left p-4">Employee ID</th>
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Role</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-t border-border">
                                    <td className="p-4">{user.id}</td>
                                    <td className="p-4">{user.firstName} {user.lastName}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">{user.status}</td>

                                    <td className="p-4 space-x-2">
                                        <button className="bg-primary text-white px-3 py-2 rounded-lg w-17"
                                            onClick={() => navigate(`/admin/users/${user.id}`)}>
                                            View
                                        </button>

                                        <button className="bg-primary text-white px-3 py-2 rounded-lg w-17"
                                            onClick={() => navigate(`/admin/users/edit/${user.id}`)}>
                                            Edit
                                        </button>

                                        <button className="bg-primary text-white px-3 py-2 rounded-lg w-17">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>
        </AdminLayout>
    )
};

export default UsersPage;


import AdminLayout from "../../../components/common/layout/AdminLayout";
import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
    const users = [
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
    ];

    const { id } = useParams();

    const user = users.find(
        (u) => u.id === id
    );

    if (!user) {
        return (
            <AdminLayout>
                <h1>User not found</h1>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="bg-white rounded-xl shadow-md p-8">
                <h1 className="text-4xl font-bold mb-6">User Details</h1>

                <div className="space-y-4">
                    <p>
                        <strong>Employee ID:</strong> {user.id}
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
                        <strong>Join Date:</strong> {user.joinDate}
                    </p>
                </div>
            </div>
        </AdminLayout>
    )
}


export default UserDetailsPage;
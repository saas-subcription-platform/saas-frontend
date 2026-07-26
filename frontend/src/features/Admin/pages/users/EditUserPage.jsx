import AdminLayout from "../../../../components/common/layout/AdminLayout";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const EditUserPage = () => {
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
            role: "Software Developer",
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
            role: "Accountant",
            status: "Active",
            joinDate: "25-Jan-2026"
        }
    ];

    const { id } = useParams();

    const user = users.find(
        (u) => u.id == id
    )

    const navigate = useNavigate();

    if (!user) {
        return (
            <AdminLayout>
                Employee not found
            </AdminLayout>
        )
    }

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [department, setDepartment] = useState(user.department);
    const [role, setRole] = useState(user.role);
    const [status, setStatus] = useState(user.status);

    const handlesave = () => {
        toast.success("Employee Edited Successfully");
        navigate("/admin/users")
    }

    return (
        <AdminLayout>
            <div className="space-y-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-dark">
                        Edit Employee
                    </h1>

                    <button className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate("/admin/users")}>
                        Back
                    </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
                    <input value={user.id} 
                    disabled
                    className="w-full border p-3 rounded"/>

                    <input value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border p-3 rounded"/>

                    <input value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border p-3 rounded"/>

                    <input value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded"/>

                    <input value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border p-3 rounded"/>

                    <button className="bg-primary text-white px-4 py-2 rounded-lg"
                            onClick={handlesave}>
                            Save Changes
                    </button>
                </div>
            </div>
        </AdminLayout>
    )

}
export default EditUserPage;
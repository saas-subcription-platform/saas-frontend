import AdminLayout from "../../../components/common/layout/AdminLayout";

const NotificationsPage = () =>{
    const notifications = [
        {
            id: 1,
            title: "Your Professional Plan expires in 7 days",
            time: "Today, 10:30 AM"
        },
        {
            id: 2,
            title: "Rahul Sharma added as Manager",
            time: "Yesterday, 4:15 PM"
        },
        {
            id: 3,
            title: "Payment of ₹999 received successfully",
            time: "12 Jun 2026"
        },
        {
            id: 4,
            title: "Invoice INV-001 generated",
            time: "11 Jun 2026"
        },
        {
            id: 5,
            title: "Company profile updated successfully",
            time: "10 Jun 2026"
        }
    ]

    return(
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-dark">Notifications</h1>

                    <div className="flex gap-4">
                        <button className="bg-primary text-white px-3 py-2 rounded-lg w-40">
                            Mark All Read
                        </button>

                        <button className="bg-primary text-white px-3 py-2 rounded-lg w-40">
                            Clear All
                        </button>
                    </div>
                </div>
                <div>
                        {notifications.map((notification) => (
                            <div key={notification.id} 
                            className="bg-white rounded-xl shadow-md p-5 border-l-4 border-primary">
                                    <h3 className="fond-semibold text-lg text-dark">
                                        {notification.title}
                                    </h3>
                                    <p className="text-gray-500 mt-2">
                                        {notification.time}
                                    </p>
                            </div>
                        ))}  
                    </div>
            </div>
        </AdminLayout>
    )
}

export default NotificationsPage;
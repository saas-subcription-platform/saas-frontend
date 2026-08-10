import { useState, useEffect } from "react";
import AdminLayout from "../../../components/common/layout/AdminLayout";
import { toast } from "react-toastify";
import {
  getNotifications,
  markNotificationRead,
  markAllRead,
  clearAllNotifications,
  approveLeave,
} from "./services/notificationService";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications from backend
  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.log("Failed to load notifications", error);
    } finally {
      setLoading(false);
    }
  };

  // Load notifications when page opens
  useEffect(() => {
    loadNotifications();
  }, []);

  // Mark single notification as read
  const handleNotificationRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId);
      loadNotifications();
    } catch (error) {
      console.log("Failed to mark notification read", error);
    }
  };

  // Mark all notifications as read

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();

      // Optimistically update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, status: "READ" })));

      // Reload from backend to ensure sync
      loadNotifications();
    } catch (error) {
      console.log("Failed to mark all notifications read", error);
    }
  };

  // Clear all notifications
  const handleClearAll = async () => {
    try {
      await clearAllNotifications();
      setNotifications([]);
    } catch (error) {
      console.log("Failed to clear notifications", error);
    }
  };

  // handler for leave requests
  const handleApproveLeave = async (leaveRequestId) => {
    try {
      await approveLeave(leaveRequestId);

      toast.success("Leave approved successfully.");

      await loadNotifications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve leave.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-dark">Notifications</h1>
          <div className="flex gap-4">
            <button
              onClick={handleMarkAllRead}
              className="bg-primary text-white px-3 py-2 rounded-lg w-35"
            >
              Mark All Read
            </button>
            <button
              onClick={handleClearAll}
              className="bg-primary text-white px-3 py-2 rounded-lg w-35"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div>
          {loading ? (
            <p className="text-gray-500">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-500">No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.notificationId}
                onClick={() =>
                  handleNotificationRead(notification.notificationId)
                }
                className={`rounded-lg shadow-md p-4 mb-5 border-l-4 border-primary cursor-pointer transition-all
    ${
      notification.status === "UNREAD"
        ? "bg-white font-semibold"
        : "bg-gray-200 text-gray-500"
    }`}
              >
                <h3 className="text-lg">{notification.title}</h3>
                <p className="text-gray-600 mt-2">{notification.message}</p>
                <p className="text-gray-500 mt-2 text-sm">
                  {notification.referenceId ? (
                    <p className="text-gray-500 mt-2 text-sm">
                      Leave Dates: {notification.fromDate} -{" "}
                      {notification.toDate}
                    </p>
                  ) : (
                    <p className="text-gray-500 mt-2 text-sm">
                      {notification.createdAt}
                    </p>
                  )}
                </p>
                <span className="text-sm text-primary">
                  {notification.status === "UNREAD" ? "UNREAD" : "READ"}
                </span>
                {notification.referenceId && (
                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApproveLeave(notification.referenceId);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NotificationsPage;

import api from "../../../../../api/api";

// Get all notifications of logged-in admin's company
export const getNotifications = async () => {
    return await api.get("/admin/notifications");
};

// Mark single notification as read
export const markNotificationRead = async (notificationId) => {
    return await api.patch(
        `/admin/notifications/read/${notificationId}`
    );
};

// Mark all notifications as read
export const markAllRead = async () => {
    return await api.patch(
        "/admin/notifications/read-all"
    );
};

// Clear all notifications
export const clearAllNotifications = async () => {
    return await api.delete(
        "/admin/notifications/clear"
    );

    
    

};
// Get latest notification for dashboard
export const getLatestNotification = async () => {
    return await api.get("/admin/notifications/latest");
};
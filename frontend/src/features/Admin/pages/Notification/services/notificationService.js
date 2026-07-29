import api from "../../../../../api/api";


// Get logged-in user's notifications
export const getNotifications = async () => {
    return await api.get("/notifications");
};


// Mark single notification as read
export const markNotificationRead = async (notificationId) => {
    return await api.patch(
        `/notifications/${notificationId}/read`
    );
};


// Mark all notifications as read
export const markAllRead = async () => {
    return await api.patch(
        "/notifications/read-all"
    );
};


// Clear logged-in user's notifications
export const clearAllNotifications = async () => {
    return await api.delete(
        "/notifications/clear"
    );
};
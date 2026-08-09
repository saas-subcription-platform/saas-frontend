import api from "../../../../api/api";

// Get all users
export const getAllUsers = async () => {
    return await api.get("/admin/users");
};

// Get user by ID
export const getUserById = async (id) => {
    return await api.get(`/admin/users/${id}`);
};

// Add new user
export const addUser = async (userData) => {
    return await api.post("/admin/users/add", userData);
};

// Update user
export const updateUser = async (id, userData) => {
    return await api.put(`/admin/users/profile/${id}`, userData);
};

// Delete user
export const deleteUser = async (id) => {
    return await api.delete(`/admin/users/delete/${id}`);
};
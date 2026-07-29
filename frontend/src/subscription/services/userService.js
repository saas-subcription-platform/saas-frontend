import api from "../../api/api"

export const getCurrentUser = async () => {
  const response = await api.get("/admin/users/me");
  return response.data;
};
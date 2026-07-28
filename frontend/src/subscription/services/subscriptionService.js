import api from "../../api/api";

export const createSubscription = async (data) => {
  const response = await api.post("/api/subscriptions", data);
  return response.data;
};
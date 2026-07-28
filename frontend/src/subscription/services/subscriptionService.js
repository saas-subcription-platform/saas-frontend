import api from "../../api/api";

export const createSubscription = async (data) => {
  const response = await api.post("/api/subscriptions", data);
  return response.data;
};

export const getMySubscription = async () => {
  const response = await api.get("/api/subscriptions/my");
  return response.data.data;
};
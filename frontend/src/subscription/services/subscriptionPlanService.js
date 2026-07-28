import api from "../../api/api";

export const getAllSubscriptionPlans = async () => {
  const response = await api.get("/api/subscription-plans");
  return response.data;
};

export const getSubscriptionPlanById = async (id) => {
  const response = await api.get(`/api/subscription-plans/${id}`);
  return response.data;
};
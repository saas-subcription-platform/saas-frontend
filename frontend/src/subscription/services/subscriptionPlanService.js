import api from "../../api/axios";

export const getAllSubscriptionPlans = async () => {
  const response = await api.get("/subscription-plans");
  return response.data;
};
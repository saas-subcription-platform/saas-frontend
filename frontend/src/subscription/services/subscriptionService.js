import api from "../../api/api";

export const createSubscription = async (data) => {
  const response = await api.post("/api/subscriptions", data);
  return response.data;
};

export const getMySubscription = async () => {
  const response = await api.get("/api/subscriptions/my");
  return response.data.data;
};

export const renewSubscription = (subscriptionId) =>
  api.post(`/api/subscriptions/${subscriptionId}/renew`);

export const changeSubscriptionPlan = async (
  subscriptionId,
  data
) => {
  const response = await api.put(
    `/api/subscriptions/${subscriptionId}/change-plan`,
    data
  );

  return response.data;
};
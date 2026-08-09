import api from "../../../../api/api";

export const createPaymentOrder = async (paymentData) => {
  const response = await api.post(
    "/payments/create-order",
    paymentData
  );

  return response.data;
};

export const verifyPayment = async (verificationData) => {
  const response = await api.post(
    "/payments/verify",
    verificationData
  );

  return response.data;
};

export const markPaymentFailed = async (data) => {
  const response = await api.post(
    "/payments/failed",
    data
  );

  return response.data;
};
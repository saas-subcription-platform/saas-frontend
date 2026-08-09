import api from "../../../../api/api";

export const applyLeave = async (leaveData) => {
  const response = await api.post(
    "/employee/leaves/apply",
    leaveData
  );

  return response.data;
};

export const getLeaveHistory = async () => {
  const response = await api.get(
    "/employee/leaves/history"
  );

  return response.data;
};

export const getLeaveBalance = async () => {
  const response = await api.get(
    "/employee/leaves/balance"
  );

  return response.data;
};
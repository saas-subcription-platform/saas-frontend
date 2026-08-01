import api from "../../../../api/api";


const GOAL_BASE_URL = "https://localhost:7252";


// Get all goals
export const getAllGoals = async () => {

  const response = await api.get("/api/Goal", {
    baseURL: GOAL_BASE_URL,
  });

  return response.data;

};



// Get goal by id
export const getGoalById = async (id) => {

  const response = await api.get(`/api/Goal/${id}`, {
    baseURL: GOAL_BASE_URL,
  });

  return response.data;

};



// Get goals by company id
export const getGoalsByCompany = async (companyId) => {

  const response = await api.get(
    `/api/Goal/company/${companyId}`,
    {
      baseURL: GOAL_BASE_URL,
    }
  );

  return response.data;

};

export const getGoalStatistics = async (companyId) => {
  const response = await api.get(`/api/Goal/company/${companyId}/stats`, {
    baseURL: GOAL_BASE_URL,
  });

  return response.data;
};

// Create new goal
export const createGoal = async (goalData) => {

  const response = await api.post(
    "/api/Goal",
    goalData,
    {
      baseURL: GOAL_BASE_URL,
    }
  );

  return response.data;

};



// Update goal
export const updateGoal = async (id, goalData) => {

  const response = await api.put(
    `/api/Goal/${id}`,
    goalData,
    {
      baseURL: GOAL_BASE_URL,
    }
  );

  return response.data;

};



// Delete goal
export const deleteGoal = async (id) => {

  const response = await api.delete(
    `/api/Goal/${id}`,
    {
      baseURL: GOAL_BASE_URL,
    }
  );

  return response.data;

};
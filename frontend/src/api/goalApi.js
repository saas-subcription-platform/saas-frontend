import axios from "axios";

const goalApi = axios.create({
  baseURL: import.meta.env.VITE_GOAL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

goalApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default goalApi;


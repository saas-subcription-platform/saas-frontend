import axios from "axios";

const goalApi = axios.create({
  baseURL: "http://localhost:5072",
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


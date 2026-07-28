import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9090"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const publicEndpoints = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/validate-reset-token",
  ];

  const isPublic = publicEndpoints.some(endpoint =>
    config.url?.includes(endpoint)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {

        if (error.response && error.response.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }

);

export default api;
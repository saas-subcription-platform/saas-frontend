import axios from "axios";

const teamApi = axios.create({
    baseURL: import.meta.env.VITE_TEAM_API,
    headers: {
        "Content-Type": "application/json",
    },
});

teamApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

teamApi.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }

);

export default teamApi;
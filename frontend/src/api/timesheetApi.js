import axios from "axios";

const timesheetApi = axios.create({
    baseURL: "http://localhost:5114/api",
});

timesheetApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default timesheetApi;
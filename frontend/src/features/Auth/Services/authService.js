import api from "../../../api/api"

export const register = async (registerData) => {

    const response = await api.post("/register", registerData);

    return response.data;
};

export const login = async (loginData) => {

    const response = await api.post("/login", loginData);

    return response.data;
};

export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
};
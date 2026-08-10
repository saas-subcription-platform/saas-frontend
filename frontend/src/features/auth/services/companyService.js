import api from "../../../api/api";

export const getCompanyProfile = async () => {
    const response = await api.get("/admin/company");
    return response.data;
};

export const updateCompanyProfile = async (companyData) => {
    const response = await api.put("/admin/company/edit", companyData);
    return response.data;
};

export const getDashboardDetails = async () => {
    const response = await api.get("/admin/welcome");
    return response.data;
};
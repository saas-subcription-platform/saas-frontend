import api from "../../../../api/api";

export const getAllInvoices = async () => {
    const response = await api.get("/invoices");
    return response.data;
};

export const getInvoiceById = async (id) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
};

export const downloadInvoice = async (id) => {
    const response = await api.get(
        `/invoices/${id}/download`,
        {
            responseType: "blob"
        }
    );

    return response.data;
};
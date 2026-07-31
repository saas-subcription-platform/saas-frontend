import teamApi from "../../../../api/teamApi";

export const getOrCreateConversation = async (userId) => {
    const response = await teamApi.get(`/conversations/direct/${userId}`);
    return response.data;
};

export const getMessages = async (conversationId) => {
    const response = await teamApi.get(`/messages/${conversationId}`);
    return response.data;
};

export const sendMessage = async (messageData) => {
    const response = await teamApi.post("/messages", messageData);
    return response.data;
};
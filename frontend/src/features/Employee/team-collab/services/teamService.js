import teamApi from "../../../../api/teamApi";

export const createGeneralTeam = async () => {

    const response = await teamApi.post("/teams/general");

    return response.data;
};

export const getCompanyUsers = async () => {

    const response = await teamApi.get("/teams/company-users");

    return response.data;
};

export const getTeams = async () => {
    const response = await teamApi.get("/teams");

    return response.data;
};

export const getTeamMembers = async (teamId) => {
  const response = await teamApi.get(`/teams/${teamId}/members`);

  return response.data;
};

export const createTeam = async (teamData) => {
  const response = await teamApi.post("/teams", teamData);
  return response.data;
};
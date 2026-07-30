import timesheetApi from "../../../../api/timesheetApi";

export const getMyTimesheets = async () => {
    const response = await timesheetApi.get("/timesheets");
    return response.data;
};
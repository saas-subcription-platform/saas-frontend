import timesheetApi from "../../../../api/timesheetApi";

// Get all timesheets for logged-in employee
export const getMyTimesheets = async (employeeId) => {
    const response = await timesheetApi.get(
        `/timesheets?employeeId=${employeeId}`
    );
    return response.data;
};

// Get single timesheet
export const getTimesheetById = async (id, employeeId) => {
    const response = await timesheetApi.get(
        `/timesheets/${id}?employeeId=${employeeId}`
    );
    return response.data;
};

// Create timesheet
export const createTimesheet = async (employeeId, timesheet) => {
    const response = await timesheetApi.post(
        `/timesheets?employeeId=${employeeId}`,
        timesheet
    );
    return response.data;
};

// Update draft timesheet
export const updateTimesheet = async (id, employeeId, timesheet) => {
    const response = await timesheetApi.put(
        `/timesheets/${id}?employeeId=${employeeId}`,
        timesheet
    );
    return response.data;
};
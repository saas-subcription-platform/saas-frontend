import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTimesheets } from "../services/timesheetService";

import TimesheetTable from "../components/TimesheetTable";
import TimesheetHeader from "../components/TimesheetHeader";
import { getCurrentUser } from "../../../../../employeeManagement/services/userService";


const MyTimesheetsPage = () => {

    const navigate = useNavigate();

    const [timesheets, setTimesheets] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Fetch timesheets from backend
    useEffect(() => {

        const fetchTimesheets = async () => {

            try {

                const user = await getCurrentUser();

                const data = await getMyTimesheets(user.userId);

                setTimesheets(data);

            } catch (error) {

                console.error("Failed to fetch timesheets:", error);

            }

        };

        fetchTimesheets();

    }, []);

    const filteredTimesheets =
        statusFilter === "ALL"
            ? timesheets
            : timesheets.filter(
                (timesheet) => timesheet.status === statusFilter
            );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Timesheet Module Header */}
            <TimesheetHeader />

            {/* Page Content */}
            <div
                className="space-y-6"
                style={{
                    marginLeft: "40px",
                    marginRight: "40px",
                    marginTop: "30px"
                }}
            >

                {/* Page Header */}
                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-3xl font-bold text-dark">
                            My Timesheets
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track and manage your weekly work hours.
                        </p>
                    </div>

                    <button
                        className="bg-primary text-white px-4 py-2 rounded-lg"
                        onClick={() =>
                            navigate("/employee/timesheet/create")
                        }
                    >
                        Add Timesheet
                    </button>

                </div>

                {/* Status Filter */}
                <div className="bg-white rounded-xl shadow-md p-4">

                    <div className="flex items-center gap-4">

                        <label className="font-medium">
                            Status
                        </label>

                        <select
                            className="border border-border rounded-lg px-4 py-2"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option value="ALL">All</option>
                            <option value="Draft">Draft</option>
                            <option value="Submitted">Submitted</option>
                        </select>

                    </div>

                </div>

                {/* Timesheet Table */}
                <TimesheetTable
                    timesheets={filteredTimesheets}
                />

            </div>

        </div>
    );
};

export default MyTimesheetsPage;
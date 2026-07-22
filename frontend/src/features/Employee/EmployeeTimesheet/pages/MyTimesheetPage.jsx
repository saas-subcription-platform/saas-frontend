import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TimesheetTable from "../components/TimesheetTable";
import { timesheets as initialTimesheets } from "../constants/timesheets";
import TimesheetHeader from "../components/TimesheetHeader";

const MyTimesheetsPage = () => {

    const navigate = useNavigate();

    const [timesheets, setTimesheets] = useState(initialTimesheets);
    const [statusFilter, setStatusFilter] = useState("ALL");

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
                            <option value="ALL">
                                All
                            </option>

                            <option value="DRAFT">
                                Draft
                            </option>

                            <option value="SUBMITTED">
                                Submitted
                            </option>

                            <option value="APPROVED">
                                Approved
                            </option>

                            <option value="REJECTED">
                                Rejected
                            </option>
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
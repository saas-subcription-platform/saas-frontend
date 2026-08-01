import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TimesheetHeader from "../components/TimesheetHeader";
import StatusBadge from "../components/StatusBadge";

import { getTimesheetById } from "../services/timesheetService";
import { getCurrentUser } from "../../services/userService";

const ViewTimesheetPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [timesheet, setTimesheet] = useState(null);

    useEffect(() => {

        const fetchTimesheet = async () => {

            try {

                const user = await getCurrentUser();
                const data = await getTimesheetById(id, user.userId);

                setTimesheet(data);

            } catch (error) {

                console.error("Failed to fetch timesheet:", error);

            }

        };

        fetchTimesheet();

    }, [id]);

    if (!timesheet) {

        return (

            <div className="min-h-screen bg-gray-50">

                <TimesheetHeader />

                <div
                    style={{
                        marginLeft: "40px",
                        marginRight: "40px",
                        marginTop: "30px"
                    }}
                >

                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <h2 className="text-xl font-semibold">
                            Timesheet not found
                        </h2>

                        <button
                            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
                            onClick={() =>
                                navigate("/employee/timesheet/history")
                            }
                        >
                            Back to Timesheets
                        </button>

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-50">

            <TimesheetHeader />

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
                            Timesheet Details
                        </h1>

                        <p className="text-gray-500 mt-1">
                            View your work details.
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button
                            className="border border-gray-300 bg-white px-4 py-2 rounded-lg"
                            onClick={() =>
                                navigate("/employee/timesheet/history")
                            }
                        >
                            Back
                        </button>

                        {timesheet.status === "Draft" && (
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-lg"
                                onClick={() =>
                                    navigate(`/employee/timesheet/edit/${timesheet.id}`)
                                }
                            >
                                Edit Draft
                            </button>
                        )}

                    </div>

                </div>

                {/* Summary */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

                    <div className="grid grid-cols-4 gap-6">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Week
                            </p>

                            <p className="font-semibold mt-1">
                                {new Date(timesheet.weekStartDate).toLocaleDateString("en-GB")} -{" "}
                                {new Date(timesheet.weekEndDate).toLocaleDateString("en-GB")}
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Hours
                            </p>

                            <p className="font-semibold mt-1">
                                {timesheet.totalHours} hrs
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                Status
                            </p>

                            <div className="mt-2">
                                <StatusBadge status={timesheet.status} />
                            </div>

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                Submitted On
                            </p>

                            <p className="font-semibold mt-1">
                                {timesheet.submittedOn
                                    ? new Date(timesheet.submittedOn).toLocaleDateString("en-GB")
                                    : "Not Submitted"}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Work Entries */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                    <div className="px-5 py-4">

                        <h2 className="text-xl font-semibold text-dark">
                            Work Entries
                        </h2>

                    </div>

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="text-left px-5 py-3">
                                    Day
                                </th>

                                <th className="text-left px-5 py-3">
                                    Project
                                </th>

                                <th className="text-left px-5 py-3">
                                    Task
                                </th>

                                <th className="text-left px-5 py-3">
                                    Hours
                                </th>

                                <th className="text-left px-5 py-3">
                                    Description
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {timesheet.entries?.map((entry, index) => (

                                <tr
                                    key={index}
                                    className="border-t border-gray-200"
                                >

                                    <td className="px-5 py-4">
                                        {entry.day}
                                    </td>

                                    <td className="px-5 py-4">
                                        {entry.projectName}
                                    </td>

                                    <td className="px-5 py-4">
                                        {entry.task}
                                    </td>

                                    <td className="px-5 py-4">
                                        {entry.hours} hrs
                                    </td>

                                    <td className="px-5 py-4">
                                        {entry.description}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {!timesheet.entries?.length && (

                        <div className="p-6 text-gray-500 text-center">
                            No work entries available.
                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};

export default ViewTimesheetPage;
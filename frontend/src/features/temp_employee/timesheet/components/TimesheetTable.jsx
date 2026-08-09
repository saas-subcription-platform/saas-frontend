import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StatusBadge from "./StatusBadge";

import { submitTimesheet } from "../services/timesheetService";
import { getCurrentUser } from "../../services/userService";

const TimesheetTable = ({ timesheets, onTimesheetSubmitted }) => {

    const navigate = useNavigate();

    console.log("STATUS:", timesheets[0]?.status);

    const [submittingId, setSubmittingId] = useState(null);

    const handleDirectSubmit = async (timesheetId) => {

        try {

            setSubmittingId(timesheetId);

            const user = await getCurrentUser();

            await submitTimesheet(timesheetId, user.userId);

            toast.success("Timesheet submitted successfully.");

            if (onTimesheetSubmitted) {
                onTimesheetSubmitted();
            }

        } catch (error) {

            console.error("Failed to submit timesheet.", error);

            toast.error("Failed to submit timesheet.");

        } finally {

            setSubmittingId(null);

        }

    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <table className="w-full table-fixed">

                <thead className="bg-background">
                    <tr>
                        <th className="text-left p-4">Week</th>
                        <th className="text-left p-4">Total Hours</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Submitted On</th>
                        <th className="text-left p-4">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {timesheets.map((timesheet) => (

                        <tr
                            key={timesheet.id}
                            className="border-t border-border"
                        >

                            <td className="p-4">
                                {new Date(timesheet.weekStartDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}{" "}
                                -{" "}
                                {new Date(timesheet.weekEndDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </td>

                            <td className="p-4">
                                {timesheet.totalHours} hrs
                            </td>

                            <td className="p-4">
                                <StatusBadge status={timesheet.status} />
                            </td>

                            <td className="p-4">
                                {timesheet.submittedOn || "Not Submitted"}
                            </td>

                            <td className="p-4">

                                {timesheet.status === "Draft" ? (

                                    <div className="flex gap-2">

                                        <button
                                            className="bg-primary text-white px-3 py-2 rounded-lg w-20"
                                            onClick={() =>
                                                navigate(
                                                    `/employee/timesheet/edit/${timesheet.id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="border border-border px-3 py-2 rounded-lg w-20 disabled:opacity-50"
                                            disabled={submittingId === timesheet.id}
                                            onClick={() =>
                                                handleDirectSubmit(timesheet.id)
                                            }
                                        >
                                            {submittingId === timesheet.id ? "..." : "Save"}
                                        </button>

                                    </div>

                                ) : (
                                    <button
                                        className="bg-primary text-white px-3 py-2 rounded-lg w-20"
                                        onClick={() =>
                                            navigate(
                                                `/employee/timesheet/view/${timesheet.id}`
                                            )
                                        }
                                    >
                                        View
                                    </button>
                                )}

                            </td>

                        </tr>

                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default TimesheetTable;
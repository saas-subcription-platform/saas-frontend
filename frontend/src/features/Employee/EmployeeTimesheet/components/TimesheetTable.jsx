import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const TimesheetTable = ({ timesheets }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <table className="w-full">

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
                                {timesheet.week}
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

                                {timesheet.status === "DRAFT" ? (
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
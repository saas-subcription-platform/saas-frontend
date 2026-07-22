import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projects } from "../constants/projects";
import TimesheetHeader from "../components/TimesheetHeader";
import { timesheets } from "../constants/timesheets";

const CreateTimesheetPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    //finding the timesheet beign edited
    const existingTimesheet = isEditMode
        ? timesheets.find((timesheet) => timesheet.id === Number(id))
        : null;

    const [weekStartDate, setWeekStartDate] = useState("");

    const [entries, setEntries] = useState
        (existingTimesheet?.entries || [
            { day: "Monday", projectId: "", task: "", hours: "", description: "" },
            { day: "Tuesday", projectId: "", task: "", hours: "", description: "" },
            { day: "Wednesday", projectId: "", task: "", hours: "", description: "" },
            { day: "Thursday", projectId: "", task: "", hours: "", description: "" },
            { day: "Friday", projectId: "", task: "", hours: "", description: "" }
        ]);

    const handleEntryChange = (index, field, value) => {

        const updatedEntries = [...entries];

        updatedEntries[index] = {
            ...updatedEntries[index],
            [field]: value
        };

        setEntries(updatedEntries);
    };

    const totalHours = entries.reduce(
        (total, entry) => total + Number(entry.hours || 0),
        0
    );

    const handleSaveDraft = () => {

        const timesheetData = {
            weekStartDate,
            status: "DRAFT",
            entries
        };

        console.log("Draft Timesheet:", timesheetData);

        navigate("/employee/timesheet/history");
    };

    const handleSubmit = () => {

        const timesheetData = {
            weekStartDate,
            status: "SUBMITTED",
            entries
        };

        console.log("Submitted Timesheet:", timesheetData);

        navigate("/employee/timesheet/history");
    };

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

                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-3xl font-bold text-dark">
                            {isEditMode ? "Edit Timesheet" : "Create Timesheet"}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Enter your work details for the week.
                        </p>
                    </div>

                    <button
                        className="border border-border px-4 py-2 rounded-lg"
                        onClick={() =>
                            navigate("/employee/timesheet/history")
                        }
                    >
                        Back
                    </button>

                </div>


                <div className="bg-white rounded-xl shadow-md p-6">

                    <label className="block font-medium mb-2">
                        Week Starting
                    </label>

                    <input
                        type="date"
                        value={weekStartDate}
                        onChange={(e) =>
                            setWeekStartDate(e.target.value)
                        }
                        className="border border-border rounded-lg px-4 py-2"
                    />

                </div>


                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-background">
                            <tr>
                                <th className="text-left p-4">Day</th>
                                <th className="text-left p-4">Project</th>
                                <th className="text-left p-4">Task</th>
                                <th className="text-left p-4">Hours</th>
                                <th className="text-left p-4">Description</th>
                            </tr>
                        </thead>

                        <tbody>

                            {entries.map((entry, index) => (

                                <tr
                                    key={entry.day}
                                    className="border-t border-border"
                                >

                                    <td className="p-4 font-medium">
                                        {entry.day}
                                    </td>

                                    <td className="p-4">

                                        <select
                                            value={entry.projectId}
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "projectId",
                                                    e.target.value
                                                )
                                            }
                                            className="border border-border rounded-lg px-3 py-2 w-full"
                                        >
                                            <option value="">
                                                Select Project
                                            </option>

                                            {projects.map((project) => (
                                                <option
                                                    key={project.id}
                                                    value={project.id}
                                                >
                                                    {project.name}
                                                </option>
                                            ))}

                                        </select>

                                    </td>

                                    <td className="p-4">

                                        <input
                                            type="text"
                                            value={entry.task}
                                            placeholder="Task"
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "task",
                                                    e.target.value
                                                )
                                            }
                                            className="border border-border rounded-lg px-3 py-2 w-full"
                                        />

                                    </td>

                                    <td className="p-4">

                                        <input
                                            type="number"
                                            min="0"
                                            max="24"
                                            value={entry.hours}
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "hours",
                                                    e.target.value
                                                )
                                            }
                                            className="border border-border rounded-lg px-3 py-2 w-20"
                                        />

                                    </td>

                                    <td className="p-4">

                                        <input
                                            type="text"
                                            value={entry.description}
                                            placeholder="Work description"
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="border border-border rounded-lg px-3 py-2 w-full"
                                        />

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

                    <div>
                        <p className="text-gray-500">
                            Total Hours
                        </p>

                        <p className="text-2xl font-bold text-dark">
                            {totalHours} hrs
                        </p>
                    </div>


                    <div className="flex gap-3">

                        <button
                            className="border border-primary text-primary px-4 py-2 rounded-lg"
                            onClick={handleSaveDraft}
                        >
                            Save Draft
                        </button>

                        <button
                            className="bg-primary text-white px-4 py-2 rounded-lg"
                            onClick={handleSubmit}
                        >
                            Submit Timesheet
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreateTimesheetPage;
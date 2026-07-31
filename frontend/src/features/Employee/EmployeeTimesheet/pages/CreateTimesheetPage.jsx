import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { projects } from "../constants/projects";
import TimesheetHeader from "../components/TimesheetHeader";

import { toast } from "react-toastify";

import {
    createTimesheet,
    getTimesheetById,
    updateTimesheet
} from "../services/timesheetService";

import { getCurrentUser } from "../../../../../employeeManagement/services/userService";

const CreateTimesheetPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [employeeId, setEmployeeId] = useState(null);

    const defaultEntries = [
        {
            day: "Monday",
            projectName: "",
            task: "",
            hours: "",
            description: ""
        },
        {
            day: "Tuesday",
            projectName: "",
            task: "",
            hours: "",
            description: ""
        },
        {
            day: "Wednesday",
            projectName: "",
            task: "",
            hours: "",
            description: ""
        },
        {
            day: "Thursday",
            projectName: "",
            task: "",
            hours: "",
            description: ""
        },
        {
            day: "Friday",
            projectName: "",
            task: "",
            hours: "",
            description: ""
        }
    ];

    const [weekStartDate, setWeekStartDate] = useState("");

    const [entries, setEntries] = useState(defaultEntries);

    useEffect(() => {

        const loadData = async () => {

            try {

                const user = await getCurrentUser();

                console.log("Current User:", user);

                setEmployeeId(user.userId);


                if (isEditMode) {

                    const timesheet = await getTimesheetById(
                        id,
                        user.userId
                    );

                    setWeekStartDate(timesheet.weekStartDate);

                    const updatedEntries = defaultEntries.map(
                        (defaultEntry) => {

                            const existingEntry =
                                timesheet.entries?.find(
                                    (entry) =>
                                        entry.day ===
                                        defaultEntry.day
                                );

                            return existingEntry || defaultEntry;

                        }
                    );

                    setEntries(updatedEntries);

                }

            } catch (error) {

                console.error(
                    "Failed to load timesheet.",
                    error
                );

            }

        };

        loadData();

    }, [id, isEditMode]);

    const handleEntryChange = (
        index,
        field,
        value
    ) => {

        const updatedEntries = [...entries];

        updatedEntries[index] = {
            ...updatedEntries[index],
            [field]: value
        };

        setEntries(updatedEntries);

    };

    const totalHours = entries.reduce(
        (total, entry) =>
            total + Number(entry.hours || 0),
        0
    );

    const getWeekEndDate = (startDate) => {

        const endDate = new Date(startDate);

        endDate.setDate(endDate.getDate() + 6);

        return endDate.toISOString().split("T")[0];

    };

    const buildRequest = () => ({

        weekStartDate,

        weekEndDate: getWeekEndDate(weekStartDate),

        entries: entries
            .filter(
                (entry) =>
                    entry.projectName.trim() !== "" &&
                    entry.task.trim() !== ""
            )
            .map((entry) => ({
                day: entry.day,
                projectName: entry.projectName,
                task: entry.task,
                hours: Number(entry.hours) || 0,
                description: entry.description
            }))

    });

    const handleSaveDraft = async () => {

        try {

            const request = buildRequest();

            if (isEditMode) {

                await updateTimesheet(
                    id,
                    employeeId,
                    request
                );

            } else {

                await createTimesheet(
                    employeeId,
                    request
                );

            }

            navigate("/employee/timesheet/history");

        } catch (error) {

            console.error(
                "Failed to save draft.",
                error
            );

        }

    };

    const handleSubmit = async () => {

        try {

            const request = buildRequest();

            if (isEditMode) {

                await updateTimesheet(
                    id,
                    employeeId,
                    request
                );

            } else {

                await createTimesheet(
                    employeeId,
                    request
                );

            }

            navigate("/employee/timesheet/history");

        } catch (error) {

            console.error(
                "Failed to submit timesheet.",
                error
            );

        }

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
                        onChange={(e) => {
                            const selectedDate = new Date(e.target.value);

                            if (selectedDate.getDay() !== 1) {
                                toast.warning("Please select a Monday as the week starting date.");
                                return;
                            }

                            setWeekStartDate(e.target.value);
                        }}
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
                                >                                    <td className="p-4">
                                        {entry.day}
                                    </td>

                                    <td className="p-4">
                                        <select
                                            value={entry.projectName}
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "projectName",
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
                                                    key={project}
                                                    value={project}
                                                >
                                                    {project}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="p-4">
                                        <input
                                            type="text"
                                            value={entry.task}
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
                                            step="0.5"
                                            value={entry.hours}
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "hours",
                                                    e.target.value
                                                )
                                            }
                                            className="border border-border rounded-lg px-3 py-2 w-24"
                                        />
                                    </td>

                                    <td className="p-4">
                                        <input
                                            type="text"
                                            value={entry.description}
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

                    <h2 className="text-xl font-semibold">
                        Total Hours: {totalHours}
                    </h2>

                    <div className="flex gap-4">

                        <button
                            onClick={handleSaveDraft}
                            className="px-6 py-2 border border-border rounded-lg hover:bg-gray-100"
                        >
                            Save Draft
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
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

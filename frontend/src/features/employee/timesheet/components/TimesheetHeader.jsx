import { useNavigate } from "react-router-dom";
import { Clock3, ArrowLeft } from "lucide-react";

const TimesheetHeader = () => {

    const navigate = useNavigate();

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">

            <div className="px-8 py-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <Clock3
                        size={30}
                        className="text-blue-600"
                    />

                    <h1 className="text-2xl font-bold text-gray-800">
                        Timesheets
                    </h1>

                </div>

                <button
                    onClick={() => navigate("/employee/home")}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                    Back to Employee Dashboard
                </button>

            </div>

        </header>
    );
};

export default TimesheetHeader;
import { Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTopBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="h-20 bg-white border-b border-border shadow-sm px-8 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-dark">
                Employee Dashboard
            </h2>

            <div className="flex items-center gap-5">

                

                <div
                    className="relative cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                >

                    <div className="flex items-center gap-2">

                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                            JD
                        </div>

                        <span>John Doe</span>

                    </div>

                    {showMenu && (

                        <div className="absolute right-0 mt-2 w-44 bg-white border border-border rounded-lg shadow-lg">

                            <p
                                className="w-full text-left px-4 py-3 "
                            >
                                johndoe@gmail.com
                            </p>

                            <button
                                className="w-full text-left px-4 py-3 hover:bg-background"
                                onClick={() => navigate("/login")}
                            >
                                Logout
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
};

export default EmployeeTopBar;
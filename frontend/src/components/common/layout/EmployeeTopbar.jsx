import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/Auth/services/authService";
import { getCurrentUser } from "../../../../employeeManagement/services/userService";

const EmployeeTopBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "";

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "";

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
              {initials}
            </div>

            <span>
              {fullName}
            </span>

          </div>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-border rounded-lg shadow-lg z-50">

              <p className="w-full text-left px-4 py-3">
                {user?.email}
              </p>

              <button
                className="w-full text-left px-4 py-3 hover:bg-background"
                onClick={handleLogout}
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
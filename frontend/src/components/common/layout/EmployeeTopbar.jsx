import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/services/authService";
import { useCurrentUser } from "../context/CurrentUserContext";

const EmployeeTopBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const fullName = currentUser
  ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
  : "";

  const initials = currentUser
  ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
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
            <div className="absolute right-0 mt-2 w-70 bg-white border border-border rounded-lg shadow-lg z-50">

              <p className="w-full text-left px-4 py-3">
                {currentUser?.email}
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
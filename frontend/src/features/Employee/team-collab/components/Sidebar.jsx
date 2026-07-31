import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users, LayoutDashboard, LogOut } from "lucide-react";

import { logout } from "../../../Auth/Services/authService";

const Sidebar = ({ currentUser }) => {
  const navigate = useNavigate();

  console.log("Sidebar Current User:", currentUser);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
    : "";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-20 bg-slate-800 text-white flex flex-col justify-between items-center py-6">
      {/* Top */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow">
          TC
        </div>
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu((prev) => !prev)}
          className="w-12 h-12 rounded-full bg-slate-700 border border-slate-500 hover:bg-slate-600 flex items-center justify-center font-semibold text-white transition"
        >
          {initials}
        </button>

        {showProfileMenu && (
          <div className="absolute bottom-0 left-16 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            {/* User Info */}
            <div className="px-4 py-4 border-b">
              <p className="font-semibold text-slate-800">
                {currentUser?.firstName} {currentUser?.lastName}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {currentUser?.email}
              </p>
            </div>

            {/* Dashboard */}
            <button
              onClick={() => navigate("/employee/home")}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition text-slate-700"
            >
              <LayoutDashboard size={18} />
              Employee Dashboard
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getCurrentUser } from "../../features/employee/services/userService";

function Navbar() {
  const navigate = useNavigate();
  const [showModules, setShowModules] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowModules(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, [token]);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            SP
          </div>
          <h1 className="text-2xl font-bold text-dark">SaaS Platform</h1>
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setShowModules(true)}
            onClick={() => setShowModules(false)}
          >
            <button className="flex items-center gap-1 text-dark hover:text-primary">
              Modules
              <ChevronDown size={16} />
            </button>

            {showModules && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-xl shadow-lg py-2 z-50">
                <a
                  href="#feature"
                  className="block px-5 py-3 hover:bg-green-50"
                >
                  Timesheet Management
                </a>

                <a
                  href="#feature"
                  className="block px-5 py-3 hover:bg-green-50"
                >
                  Leave Management
                </a>

                <a
                  href="#feature"
                  className="block px-5 py-3 hover:bg-green-50"
                >
                  Goals & Performance
                </a>

                <a
                  href="#feature"
                  className="block px-5 py-3 hover:bg-green-50"
                >
                  Team Collaboration
                </a>
              </div>
            )}
          </div>
          <a href="#price" className="text-dark hover:text-primary">
            Pricing
          </a>
          <a href="#about" className="text-dark hover:text-primary">
            About Us
          </a>
          <a href="#contact" className="text-dark hover:text-primary">
            Contact Us
          </a>
        </div>
        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg border border-border text-dark hover:bg-gray-50"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover"
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </div>

                <div className="text-left">
                  <p className="font-semibold text-dark">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-border rounded-xl shadow-lg">
                  <button
                    className="w-full text-left px-5 py-3 hover:bg-gray-50"
                    onClick={() => {
                      if (user?.role === "ADMIN") {
                        navigate("/admin/home");
                      } else {
                        navigate("/employee/home");
                      }

                      setShowProfileMenu(false);
                    }}
                  >
                    Dashboard
                  </button>

                  <button
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      localStorage.clear();

                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import { toast } from "react-toastify";
import { login } from "../services/authService";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || null;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 > Date.now()) {
        if (role === "ADMIN") {
          navigate("/admin/home", { replace: true });
        } else if (role === "EMPLOYEE") {
          navigate("/employee/home", { replace: true });
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      console.log("Login Response:", response);
      console.log("Token:", response.token);
      console.log("Role:", response.role);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);

      toast.success("Login successful!");

      console.log("Location State:", location.state);
      console.log("Redirect To:", redirectTo);

      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else if (response.role === "ADMIN") {
        navigate("/admin/home", { replace: true });
      } else if (response.role === "EMPLOYEE") {
        navigate("/employee/home", { replace: true });
      }
    } catch (error) {
      setPassword("");

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid email or password";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          {/* <h2 className="text-4xl font-bold text-gray-800">Login</h2> */}

          <p className="text-gray-500 mt-2">
            Sign in to continue managing subscriptions
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Login</h3>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-[#7A9E7E] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          {/* <Link
            to="/admin/home"
            className="w-full bg-[#7A9E7E] hover:bg-[#6C8C70] text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-2 transition"
          >
            Sign In
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/employee/home"
            className="w-full bg-[#7A9E7E] hover:bg-[#6C8C70] text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-2 transition"
          >
            Sign In (Employee)
            <ArrowRight size={18} />
          </Link> */}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#7A9E7E] hover:bg-[#6C8C70] text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </button>

          {/* Register */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#7A9E7E] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-[#7A9E7E]">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

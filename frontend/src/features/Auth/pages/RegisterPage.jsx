import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleRegister = async () => {
    if (
      !companyName ||
      !firstName ||
      !lastName ||
      !email ||
      !companySize ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const registerData = {
      companyName,
      firstName,
      lastName,
      email,
      companySize,
      password,
    };

    try {
      await register(registerData);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">Create Account</h2>

          <p className="text-gray-500 mt-2">
            Start managing subscriptions today
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>

            <input
              type="text"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
            />
          </div>

          {/* admin first name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin's First Name
            </label>

            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
            />
          </div>

          {/* Admin Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin's Last Name
            </label>

            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
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

          {/* Company Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>

            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
            >
              <option value="">Select Company Size</option>

              <option value="ONE_TO_TEN">1-10 Employees</option>

              <option value="ELEVEN_TO_FIFTY">11-50 Employees</option>

              <option value="FIFTY_ONE_TO_TWO_HUNDRED">51-200 Employees</option>

              <option value="TWO_HUNDRED_ONE_TO_FIVE_HUNDRED">
                201-500 Employees
              </option>

              <option value="FIVE_HUNDRED_PLUS">500+ Employees</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-[#7A9E7E] hover:bg-[#6C8C70] text-white py-3 rounded-lg mt-2 flex items-center justify-center gap-2"
          >
            Create Account
            <ArrowRight size={18} />
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#7A9E7E] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-[#7A9E7E]">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

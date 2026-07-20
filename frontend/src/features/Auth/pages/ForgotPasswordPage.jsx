import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    navigate("/email-sent");
  };

  return (
    <div className="min-h-screen bg-[#F4F7F3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#7A9E7E] rounded-xl flex items-center justify-center text-white font-bold text-lg">
            SM
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            SubsManager
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Forgot Password
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Enter your email address and we'll send a password reset link.
          </p>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-4 text-gray-400"
              />

              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#7A9E7E] hover:bg-[#6C8C70] text-white py-3 rounded-lg mt-6"
          >
            Send Reset Link
          </button>

          {/* Back */}
          <div className="text-center mt-5">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-[#7A9E7E] hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
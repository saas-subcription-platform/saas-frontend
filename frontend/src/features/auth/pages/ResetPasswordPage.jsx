import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        toast.error("Invalid password reset link.");
        setCheckingToken(false);
        navigate("/forgot-password");
        return;
      }

      try {
        await api.get(`/validate-reset-token?token=${token}`);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Invalid or expired reset link.",
        );

        navigate("/forgot-password");
      } finally {
        setCheckingToken(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/reset-password", {
        token,
        newPassword,
      });

      toast.success("Password reset successfully.");
      navigate("/password-reset-success");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Checking reset link...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#F4F7F3] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Reset Password
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter your new password.
        </p>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">New Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />

            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#7A9E7E] hover:bg-[#6C8C70] disabled:opacity-50 text-white py-3 rounded-lg mt-6"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

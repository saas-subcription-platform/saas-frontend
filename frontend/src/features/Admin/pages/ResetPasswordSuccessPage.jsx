import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7F3] flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

        <CheckCircle
          size={70}
          className="mx-auto text-green-600 mb-4"
        />

        <h2 className="text-3xl font-bold text-gray-800">
          Password Updated
        </h2>

        <p className="text-gray-500 mt-3">
          Your password has been reset successfully.
        </p>

        <button
          onClick={() => navigate("/admin/login")}
          className="w-full mt-6 bg-[#7A9E7E] hover:bg-[#6C8C70] text-white py-3 rounded-lg"
        >
          Back To Login
        </button>

      </div>

    </div>
  );
}
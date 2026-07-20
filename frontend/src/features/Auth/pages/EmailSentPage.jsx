import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function EmailSent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7F3] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

        <CheckCircle
          size={70}
          className="mx-auto text-green-600 mb-4"
        />

        <h2 className="text-3xl font-bold text-gray-800">
          Email Sent
        </h2>

        <p className="text-gray-500 mt-3">
          A password reset link has been sent to your email address.
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Please check your inbox and spam folder.
        </p>

        {/* Demo Button */}
        <button
          onClick={() => navigate("/reset-password")}
          className="w-full mt-6 bg-[#7A9E7E] hover:bg-[#6C8C70] text-white py-3 rounded-lg"
        >
          Continue (Demo)
        </button>

        <div className="mt-5">
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
  );
}
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // User does not have permission
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized
  return <Outlet />;
}
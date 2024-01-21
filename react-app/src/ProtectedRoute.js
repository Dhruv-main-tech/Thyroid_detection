import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAllowed }) {
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

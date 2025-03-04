import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  console.log("🔒 Checking token:", token); // Debugging

  if (!token || token === "undefined" || token === "null") {
    console.warn("🚨 Missing or Invalid Token:", token);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

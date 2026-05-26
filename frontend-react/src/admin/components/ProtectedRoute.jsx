import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminUser = localStorage.getItem("adminUser");

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Verify admin user object is valid
  try {
    const user = JSON.parse(adminUser);
    // Check for role='admin' or is_admin flag (for backwards compatibility)
    if (user.role !== "admin" && !user.is_admin) {
      // If user is not admin, redirect to login
      localStorage.removeItem("adminUser");
      return <Navigate to="/admin/login" replace />;
    }
  } catch (err) {
    console.error("Error parsing admin user:", err);
    localStorage.removeItem("adminUser");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

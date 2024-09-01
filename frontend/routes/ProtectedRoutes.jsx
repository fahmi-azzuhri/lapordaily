import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    return role === "ADMIN" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/user/input" replace />
    );
  }

  return children;
};

export default ProtectedRoute;

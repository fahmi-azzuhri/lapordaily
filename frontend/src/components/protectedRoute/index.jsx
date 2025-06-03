import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRole }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRole && role !== allowedRole) {
    const redirectPath = {
      USER: "/user/dashboard",
      ADMIN: "/admin/dashboard",
      SUPERADMIN: "/superadmin/dashboard",
    }[role];

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

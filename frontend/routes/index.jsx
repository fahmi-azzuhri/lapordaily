import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../src/components/auth/Login";
import Input from "../src/components/user/Input";
import ViewDashboard from "../src/views/admin/ViewDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/dashboard" element={<ViewDashboard />} replace />
      <Route path="/user/input" element={<Input />} replace />
    </Routes>
  );
}

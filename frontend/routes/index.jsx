import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../src/views/dashboard/Home";
import Login from "../src/components/auth/Login";
import Input from "../src/components/user/Input";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Home />} replace />
      <Route path="/user/input" element={<Input />} replace />
    </Routes>
  );
}

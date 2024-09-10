import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../src/components/auth/Login";
import Input from "../src/components/user/Input";
import ViewDashboard from "../src/views/admin/ViewDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import MyAccount from "../src/components/user/account/MyAccount";
import MyReport from "../src/components/user/report/MyReport";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roleRequired="ADMIN">
            <ViewDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dataAnggota"
        element={
          <ProtectedRoute roleRequired={"ADMIN"}>
            <ViewDashboard />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/user/input"
        element={
          <ProtectedRoute roleRequired={"USER"}>
            <Input />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/user/account"
        element={
          <ProtectedRoute roleRequired={"USER"}>
            <MyAccount />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  LogOut,
  NotebookPen,
  UserRound,
  Search,
  Menu,
} from "lucide-react";
import AdminLayout from "../../../layout/adminLayout";
import ListPhl from "./listPhl";
import Report from "./report";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [totalReport, setTotalReport] = useState(0);
  const [user, setTotalUser] = useState(0);

  useEffect(() => {
    const fetchTotalReports = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/reports/admin/total",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setTotalReport(res.data.total);
      } catch (error) {
        console.error("Gagal mengambil total laporan:", error);
      }
    };
    const fetchTotalUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/count", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setTotalUser(res.data.totalUser);
      } catch (error) {
        console.error("Gagal mengambil total user:", error);
      }
    };

    fetchTotalReports();
    fetchTotalUsers();
  }, []);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "List PHL" },
    { icon: Users, label: "Report" },
    { icon: LogOut, label: "Sign Out" },
  ];

  return (
    <AdminLayout>
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 text-gray-600 lg:hidden" />
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search here"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
          </div>
          {/* <div className="w-10 h-10 bg-gray-300 rounded-full"></div> */}
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Report</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalReport}
                </p>
              </div>
              <NotebookPen className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-blue-500 p-6 rounded-xl shadow-sm text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total PHL</p>
                <p className="text-2xl font-bold"> {user} </p>
              </div>
              <UserRound className="w-8 h-8 text-blue-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Report withLayout={false} mode="summary" />
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/admin/report")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Lihat Semua Laporan →
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 space-y-4">
                <ListPhl withLayout={false} mode="summary" />
                <div className="flex justify-end">
                  <button
                    onClick={() => navigate("/admin/listphl")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Lihat Semua PHL →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}

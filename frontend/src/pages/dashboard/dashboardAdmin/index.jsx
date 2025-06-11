import React from "react";
import {
  Home,
  Users,
  LogOut,
  Eye,
  ShoppingCart,
  MessageCircle,
  DollarSign,
  Search,
  Menu,
} from "lucide-react";
import AdminLayout from "../../../layout/adminLayout";
import Report from "./report";
import { useNavigate } from "react-router-dom";

export default function DashboardAdmin() {
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "List PHL" },
    { icon: Users, label: "Report" },
    { icon: LogOut, label: "Sign Out" },
  ];

  const recentCustomers = [
    { name: "David", avatar: "bg-orange-400", initials: "D" },
    { name: "Muhammad", avatar: "bg-gray-400", initials: "M" },
    { name: "Amelia", avatar: "bg-pink-400", initials: "A" },
    { name: "Olivia", avatar: "bg-green-400", initials: "O" },
    { name: "Amit", avatar: "bg-blue-400", initials: "A" },
    { name: "Ashley", avatar: "bg-purple-400", initials: "A" },
    { name: "John", avatar: "bg-red-400", initials: "J" },
    { name: "Anna", avatar: "bg-indigo-400", initials: "A" },
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
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Daily Views</p>
                <p className="text-2xl font-bold text-gray-900">1,504</p>
              </div>
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-blue-500 p-6 rounded-xl shadow-sm text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Sales</p>
                <p className="text-2xl font-bold">80</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Comments</p>
                <p className="text-2xl font-bold text-gray-900">284</p>
              </div>
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Earning</p>
                <p className="text-2xl font-bold text-gray-900">$7,842</p>
              </div>
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Report withLayout={false} mode="summary" />
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/admin/report")}
                className="text-blue-600 hover:underline"
              >
                Lihat Semua Laporan →
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Customers
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {recentCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${customer.avatar} rounded-full flex items-center justify-center text-white font-medium`}
                    >
                      {customer.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}

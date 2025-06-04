import React from "react";
import { Home, Users, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "List PHL", path: "/admin/listphl" },
  { icon: Users, label: "Report", path: "/admin/report" },
  { icon: LogOut, label: "Sign Out", action: "logout" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
          </div>
          <span className="font-semibold text-lg">Lapor Daily</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              {item.action === "logout" ? (
                <button
                  onClick={() => {
                    Cookies.remove("username");
                    Cookies.remove("token");
                    Cookies.remove("role");
                    navigate("/");
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-blue-100 hover:bg-blue-700 hover:text-white cursor-pointer"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

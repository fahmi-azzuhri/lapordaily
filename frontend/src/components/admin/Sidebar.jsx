import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("laporan");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
    setActiveTab("logout");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "laporan") {
      navigate("/"); // Navigasi ke halaman dashboard
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <ul>
        <li
          className={`mb-4 px-4 py-2 rounded-md cursor-pointer ${
            activeTab === "laporan"
              ? "bg-white text-gray-900"
              : "hover:bg-white hover:text-gray-900"
          }`}
          onClick={() => handleTabClick("laporan")}
        >
          Laporan
        </li>
        <li
          className={`mb-4 px-4 py-2 rounded-md cursor-pointer ${
            activeTab === "logout"
              ? "bg-white text-gray-900"
              : "hover:bg-white hover:text-gray-900"
          }`}
          onClick={handleLogout}
        >
          Keluar
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

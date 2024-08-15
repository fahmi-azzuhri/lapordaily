import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
function Sidebar() {
  const [activeTab, setActiveTab] = useState("laporan");
  const navigate = useNavigate();

  const handleLogout = () => {
    ["token", "username", "role"].forEach((cookie) => Cookies.remove(cookie));
    toast.success("Logout Berhasil", {
      style: {
        padding: "9px",
        borderRadius: "10px",
      },
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
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
      <Toaster position="top-right" reverseOrder={false} />
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

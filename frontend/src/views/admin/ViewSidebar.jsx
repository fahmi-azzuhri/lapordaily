import React from "react";

function ViewSidebar({ Toaster, handleTabClick, activeTab }) {
  return (
    <div className="w-full md:w-64 lg:h-screen md:h-64 bg-gray-800 text-white p-5">
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
            activeTab === "dataAnggota"
              ? "bg-white text-gray-900"
              : "hover:bg-white hover:text-gray-900"
          }`}
          onClick={() => handleTabClick("dataAnggota")}
        >
          Data Anggota
        </li>
        <li
          className={`mb-4 px-4 py-2 rounded-md cursor-pointer ${
            activeTab === "logout"
              ? "bg-white text-gray-900"
              : "hover:bg-white hover:text-gray-900"
          }`}
          onClick={() => handleTabClick("logout")}
        >
          Keluar
        </li>
      </ul>
    </div>
  );
}

export default ViewSidebar;

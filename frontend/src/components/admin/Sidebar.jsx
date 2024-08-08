import React, { useState } from "react";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("laporan");

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <ul>
        <li
          className={`mb-4 ${
            activeTab === "laporan" ? "text-white" : "text-gray-300"
          }`}
        >
          <a
            href="#"
            className={`hover:text-white ${
              activeTab === "laporan" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("laporan")}
          >
            Laporan
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

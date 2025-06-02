import React, { useState } from "react";
import Sidebar from "../../pages/admin/Sidebar";
import Dashboard from "../../pages/admin/Dashboard";
import DataAnggota from "../../pages/admin/DataAnggota";

function ViewDashboard() {
  const [activeTab, setActiveTab] = useState("laporan");

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-grow">
        {activeTab === "laporan" && <Dashboard />}
        {activeTab === "dataAnggota" && <DataAnggota />}
        {activeTab === "logout"}
      </div>
    </div>
  );
}

export default ViewDashboard;

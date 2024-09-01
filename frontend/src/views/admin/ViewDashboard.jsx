import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Dashboard from "../../components/admin/Dashboard";
import DataAnggota from "../../components/admin/DataAnggota";

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

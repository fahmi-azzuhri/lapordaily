import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Dashboard from "../../components/admin/Dashboard";

function ViewDashboard() {
  const [activeTab, setActiveTab] = useState("laporan");

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-grow">
        {activeTab === "laporan" && <Dashboard />}
      </div>
    </div>
  );
}

export default ViewDashboard;

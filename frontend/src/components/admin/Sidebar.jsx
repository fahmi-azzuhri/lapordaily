import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import ViewSidebar from "../../views/admin/ViewSidebar";

function Sidebar({ setActiveTab, activeTab }) {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "laporan") {
      navigate("/admin/dashboard");
    } else if (tab === "dataAnggota") {
      navigate("/admin/dataAnggota");
    } else if (tab === "logout") {
      ["token", "username", "role"].forEach((cookie) => Cookies.remove(cookie));
      toast.success("Logout Berhasil", {
        style: {
          padding: "9px",
          borderRadius: "10px",
        },
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
      setActiveTab("logout");
    }
  };

  return (
    <ViewSidebar
      Toaster={Toaster}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
    />
  );
}

export default Sidebar;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useNavLogic = () => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAccount = () => navigate("/user/account");

  const handleLogout = () => {
    ["token", "username", "role"].forEach((cookie) => Cookies.remove(cookie));
    toast.success("Logout Berhasil", {
      style: {
        padding: "9px",
        borderRadius: "10px",
      },
    });
    navigate("/", { replace: true });
  };

  return {
    openNav,
    setOpenNav,
    handleAccount,
    handleLogout,
  };
};

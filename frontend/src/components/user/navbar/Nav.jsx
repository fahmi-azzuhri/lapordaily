import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
function Nav({ toast }) {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => navigate("/user/input");
  const handleAccount = () => navigate("/user/account");
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
  };
  const navList = (
    <ul className="mt-2 flex flex-col text-white gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 text-md">
        <button
          onClick={handleAccount}
          className="text-white hover:font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Profil
        </button>
      </li>
      <li className="p-1 text-md">
        <button className="text-white hover:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Laporan Saya
        </button>
      </li>
      <li className="p-1 font-normal">
        <button
          className="text-white hover:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogout}
        >
          Keluar
        </button>
      </li>
    </ul>
  );
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-gray-900 rounded-lg">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-between text-white">
        <a
          onClick={handleClick}
          className="mr-4 cursor-pointer py-1.5 font-medium text-2xl"
        >
          Lapor Daily
        </a>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-white lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      <Collapse open={openNav} className="lg:hidden">
        {openNav && <div className="block lg:hidden">{navList}</div>}
      </Collapse>
    </Navbar>
  );
}

export default Nav;

import React, { useState, useEffect } from "react";
import Nav from "../navbar/Nav";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ViewMyAccount from "../../../views/user/account/ViewMyAccount";
function MyAccount() {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      setName(username);
    } else {
      navigate("/login");
    }
  });

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:3000/user/update-password",
        {
          nama: name,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Password berhasil diubah", {
        style: {
          padding: "9px",
          borderRadius: "10px",
        },
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Password gagal diubah", {
        style: {
          padding: "9px",
          borderRadius: "10px",
        },
      });
    }
  };

  return (
    <>
      <Nav />
      <Toaster position="top-right" />
      <ViewMyAccount
        name={name}
        setName={setName}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        changePassword={changePassword}
      />
    </>
  );
}

export default MyAccount;

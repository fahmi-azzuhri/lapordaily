import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewInput from "../../views/user/ViewInput";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
const Input = () => {
  const [name, setName] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsiList, setDeskripsiList] = useState([""]);
  const [jenisPekerjaan, setJenisPekerjaan] = useState("");
  const [hasil, setHasil] = useState("");
  const [satuan, setSatuan] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      setName(username);
    } else {
      navigate("/login");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/laporan",
        {
          tanggal,
          nama: name,
          deskripsi: deskripsiList,
          jenisPekerjaan,
          hasil,
          satuan,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Laporan berhasil dibuat", {
        style: {
          padding: "9px",
          borderRadius: "10px",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Laporan gagal dibuat", {
        style: {
          padding: "9px",
          borderRadius: "10px",
        },
      });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const addDeskripsi = () => {
    setDeskripsiList([...deskripsiList, ""]);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ViewInput
        name={name}
        setName={setName}
        tanggal={tanggal}
        setTanggal={setTanggal}
        deskripsiList={deskripsiList}
        setDeskripsiList={setDeskripsiList}
        jenisPekerjaan={jenisPekerjaan}
        setJenisPekerjaan={setJenisPekerjaan}
        handleSubmit={handleSubmit}
        addDeskripsi={addDeskripsi}
        setHasil={setHasil}
        satuan={satuan}
        setSatuan={setSatuan}
        today={today}
        hasil={hasil}
      />
    </>
  );
};

export default Input;

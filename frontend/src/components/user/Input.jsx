import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewInput from "../../views/user/ViewInput";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
      const response = await axios.post("http://localhost:3000/api/laporan", {
        tanggal,
        nama: name,
        deskripsi: deskripsiList,
        jenisPekerjaan,
        hasil,
        satuan,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const addDeskripsi = () => {
    setDeskripsiList([...deskripsiList, ""]);
  };

  return (
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
  );
};

export default Input;

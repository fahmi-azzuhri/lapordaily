import axios from "axios";
import React, { useState } from "react";
import ViewInput from "../../views/user/ViewInput";

const Input = () => {
  const [name, setName] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsiList, setDeskripsiList] = useState([""]);
  const [jenisPekerjaan, setJenisPekerjaan] = useState("");
  const [hasil, setHasil] = useState("");
  const [satuan, setSatuan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/laporan", {
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

  const jenisPekerjaanOptions = [
    "IR-1",
    "Scrap Tromol",
    "Kebersihan Hall",
    "Mesin LV",
    "Mesin MV",
    "Mesin HV",
    "Cat Tromol",
    "Quading",
    "Fk",
  ];

  const satuanOptions = ["kg", "palet", "box"];

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
      jenisPekerjaanOptions={jenisPekerjaanOptions}
      satuanOptions={satuanOptions}
      setHasil={setHasil}
      satuan={satuan}
      setSatuan={setSatuan}
      today={today}
    />
  );
};

export default Input;

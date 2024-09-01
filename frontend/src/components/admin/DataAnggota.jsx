import React, { useState, useEffect } from "react";
import axios from "axios";
function DataAnggota() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>Data Anggota</h1>
    </div>
  );
}

export default DataAnggota;

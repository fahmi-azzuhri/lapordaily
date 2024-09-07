import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ViewDataAnggota from "../../views/admin/ViewDataAnggota";

function DataAnggota() {
  const [data, setData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickAdd = () => {
    setPopUp(true);
  };
  const handleClosePopup = () => {
    setPopUp(false);
  };
  return (
    <ViewDataAnggota
      handleClickAdd={handleClickAdd}
      handleClosePopup={handleClosePopup}
      data={data}
      popUp={popUp}
    />
  );
}

export default DataAnggota;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PopupAdd from "./PopupAdd";

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
      console.log(response.data);
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
    <div className="p-4">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-xl font-bold mb-4">Data Anggota PHL Scrap PP</h1>
        <button
          onClick={handleClickAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambahkan Anggota
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="w-full bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">FULL NAME</th>
              <th className="py-2 px-4 text-left">USER ROLE</th>
              <th className="py-2 px-4 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4 flex items-center">{user.username}</td>
                <td className="py-2 px-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <span>Showing 1 to 5 of {data.length} Entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded">Prev</button>
            <button className="px-3 py-1 bg-gray-200 rounded">Next</button>
          </div>
        </div>
      </div>
      {popUp && <PopupAdd onClose={handleClosePopup} />}
    </div>
  );
}

export default DataAnggota;

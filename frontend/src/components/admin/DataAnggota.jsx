import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function DataAnggota() {
  const [data, setData] = useState([]);

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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Anggota PHL Scrap PP</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">FULL NAME</th>
              <th className="py-2 px-4 text-left">USER ROLE</th>
              <th className="py-2 px-4 text-left">CREATED AT</th>
              <th className="py-2 px-4 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4 flex items-center">{user.username}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.createdAt}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      user.status === "Active"
                        ? "bg-green-500"
                        : user.status === "Suspended"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
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
    </div>
  );
}

export default DataAnggota;

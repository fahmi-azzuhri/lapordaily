import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/laporan");
      setData(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex-grow p-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-700 text-white ">
            <th className="border px-4 py-2">Tanggal</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Jenis Pekerjaan</th>
            <th className="border px-4 py-2">Deskripsi</th>
            <th className="border px-4 py-2">Hasil</th>
            <th className="border px-4 py-2">Satuan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.tanggal}</td>
              <td className="border px-4 py-2">{item.nama}</td>
              <td className="border px-4 py-2">{item.jenisPekerjaan}</td>
              <td className="border px-4 py-2">{item.deskripsi}</td>
              <td className="border px-4 py-2">{item.hasil}</td>
              <td className="border px-4 py-2">{item.satuan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

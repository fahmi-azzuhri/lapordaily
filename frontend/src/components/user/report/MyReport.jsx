import React, { useState } from "react";
import Nav from "../navbar/Nav";
function MyReport() {
  const [data, setData] = useState([]);
  const [report, setReport] = useState([]);

  const myReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/laporan/{id}",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };
  return (
    <>
      <Nav />
      <div className="p-4">
        <div className="flex flex-row justify-between mb-5">
          <h1 className="text-xl font-bold mb-4">Detail Laporan</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="w-full bg-blue-500 text-white">
                <th className="border px-4 py-2">Tanggal</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Jenis Pekerjaan</th>
                <th className="border px-4 py-2">Deskripsi</th>
                <th className="border px-4 py-2">Hasil</th>
                <th className="border px-4 py-2">Satuan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            {/* <span>Showing 1 to 5 of {data.length} Entries</span> */}
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-200 rounded">Prev</button>
              <button className="px-3 py-1 bg-gray-200 rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyReport;

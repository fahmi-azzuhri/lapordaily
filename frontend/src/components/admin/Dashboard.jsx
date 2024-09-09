import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/laporan", {
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    [item.nama, item.jenisPekerjaan, item.deskripsi].some((field) => {
      return field.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="entries" className="mr-2">
            Show
          </label>
          <select
            id="entries"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        <div>
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border px-4 py-2">Tanggal</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Jenis Pekerjaan</th>
            <th className="border px-4 py-2">Deskripsi</th>
            <th className="border px-4 py-2">Hasil</th>
            <th className="border px-4 py-2">Satuan</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                {item.tanggal.split("T")[0].split("-").reverse().join("/")}
              </td>
              <td className="border px-4 py-2">{item.nama}</td>
              <td className="border px-4 py-2">{item.jenisPekerjaan}</td>
              <td className="border px-4 py-2">{item.deskripsi}</td>
              <td className="border px-4 py-2">{item.hasil}</td>
              <td className="border px-4 py-2">{item.satuan}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirstEntry + 1} to{" "}
          {Math.min(indexOfLastEntry, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

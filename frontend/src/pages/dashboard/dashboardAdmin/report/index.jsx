import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../layout/adminLayout";
import axios from "axios";
import Cookies from "js-cookie";

// pages/admin/dashboard/report.js
export default function Report({ withLayout = true, mode = "full" }) {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = mode === "summary" ? 5 : 25;

  const handleExport = async () => {
    // export logic seperti sebelumnya
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/reports/admin/all",
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        setReports(response.data.data);
        setFilteredReports(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = reports.filter((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");
      const itemYear = itemDate.getFullYear().toString();

      const matchBulan = bulan ? itemMonth === bulan : true;
      const matchTahun = tahun ? itemYear === tahun : true;

      const matchSearch =
        item.user.username.toLowerCase().includes(lowerSearch) ||
        item.workType.toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch);

      return matchBulan && matchTahun && matchSearch;
    });

    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [search, bulan, tahun, reports]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const changePage = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "next" && prev < totalPages) return prev + 1;
      if (direction === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const content = (
    <div className="w-full bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Rekap Hasil Pekerjaan PHL
        </h2>

        {mode === "full" && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Cari username, kategori, deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 border p-2 rounded"
            />
            <div className="flex flex-wrap items-center gap-2 ml-auto">
              <select
                className="border p-2 rounded"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
              >
                <option value="">Pilih Bulan</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Tahun"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="border p-2 rounded"
              />

              <button
                onClick={handleExport}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Export ke Excel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Hasil</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {new Date(report.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{report.user.username}</td>
                <td className="px-6 py-4">{report.workType}</td>
                <td className="px-6 py-4">{report.description}</td>
                <td className="px-6 py-4">
                  {report.result} {report.unit}
                </td>
              </tr>
            ))}
            {currentReports.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Belum ada laporan
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {mode === "full" && (
          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-sm text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => changePage("prev")}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <button
                onClick={() => changePage("next")}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return withLayout ? <AdminLayout>{content}</AdminLayout> : content;
}

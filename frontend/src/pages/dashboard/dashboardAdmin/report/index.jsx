import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../layout/adminLayout";
import axios from "axios";
import Cookies from "js-cookie";

function Report() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/reports/admin/all",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`, // sesuaikan jika token disimpan berbeda
            },
          }
        );
        setReports(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Rekap Hasil Pekerjaan Seluruh User
            </h2>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Kategori
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Hasil
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {report.user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {report.workType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {report.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.result} {report.unit}
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Belum ada laporan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Report;

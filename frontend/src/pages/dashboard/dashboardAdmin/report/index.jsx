import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../layout/adminLayout";
import axios from "axios";
import Cookies from "js-cookie";

function Report() {
  const [groupedReports, setGroupedReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/reports/admin/all",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        const reports = response.data.data;

        // Group by user + date
        const grouped = {};
        for (let report of reports) {
          const key = `${report.user.username}_${report.date}`;
          if (!grouped[key]) {
            grouped[key] = {
              date: report.date,
              username: report.user.username,
              kategori: [],
              deskripsi: [],
              hasil: [],
            };
          }
          grouped[key].kategori.push(report.workType);
          grouped[key].deskripsi.push(report.description);
          grouped[key].hasil.push(`${report.result} ${report.unit}`);
        }

        setGroupedReports(Object.values(grouped));
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
              Rekap Hasil Pekerjaan PHL
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
              {groupedReports.length > 0 ? (
                groupedReports.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {item.kategori.join(" | ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {item.deskripsi.join(" | ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.hasil.join(" | ")}
                    </td>
                  </tr>
                ))
              ) : (
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

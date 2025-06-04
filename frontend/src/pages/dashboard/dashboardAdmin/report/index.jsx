import React from "react";
import AdminLayout from "../../../../layout/adminLayout";

function Report() {
  return (
    <AdminLayout>
      <div className="w-full bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Rekap Hasil Pekerjaan
            </h2>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Nama
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Pekerjaan
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
              {/* Sample row */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  9/21/2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  John Doe
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  $120
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  Credit Card
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              {/* Tambahkan data lainnya di sini */}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Report;

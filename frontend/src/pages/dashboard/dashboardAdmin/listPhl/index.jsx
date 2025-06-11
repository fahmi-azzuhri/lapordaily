import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../layout/adminLayout";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListPhl({ withLayout = true, mode = "full" }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Pekerja berhasil ditambahkan");
        setShowModal(false);
        setUsername("");
        setPassword("");
        getAllUsers();
      } else {
        alert(data.message || "Terjadi kesalahan");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      alert("User berhasil dihapus");
      getAllUsers();
    } catch (error) {
      alert("Gagal menghapus user");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const content = (
    <div className="w-full bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">List PHL</h2>
          {mode === "full" && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Tambah Pekerja PHL
            </button>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Nama
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              {mode === "full" && (
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(mode === "summary" ? users.slice(0, 3) : users).map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {user.role}
                  </span>
                </td>
                {mode === "full" && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-sm text-white px-4 py-2 rounded cursor-pointer"
                      onClick={() => deleteUser(user.id)}
                    >
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {mode === "summary" && users.length > 3 && (
          <div className="p-4 text-right">
            <button
              onClick={() => navigate("/admin/listphl")}
              className="text-blue-600 text-sm hover:underline"
            >
              Lihat Semua &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Modal Tambah PHL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Tambah Pekerja PHL</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return withLayout ? <AdminLayout>{content}</AdminLayout> : content;
}

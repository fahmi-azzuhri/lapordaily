import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
function PopupAdd({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const addPerson = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/add-user",
        {
          username,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Username sudah ada", {
          style: {
            padding: "9px",
            borderRadius: "10px",
          },
        });
      } else {
        toast.error("Terjadi kesalahan saat menambahkan user", {
          style: {
            padding: "9px",
            borderRadius: "10px",
          },
        });
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-bold mb-4">Tambah Anggota Baru</h2>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Pilih Role</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={addPerson}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
export default PopupAdd;

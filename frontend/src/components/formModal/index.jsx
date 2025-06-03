import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default function FormModal({ onClose }) {
  const [form, setForm] = useState({
    date: "",
    name: "",
    workType: "",
    description: "",
    result: 0,
    unit: "kg",
  });

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post("http://localhost:3000/reports", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Laporan berhasil dikirim");
      onClose(); // tutup modal setelah submit
    } catch (err) {
      alert("Gagal mengirim laporan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Form Laporan Pekerjaan</h2>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Jenis Pekerjaan"
          value={form.workType}
          onChange={(e) => setForm({ ...form, workType: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Hasil"
          value={form.result}
          onChange={(e) => setForm({ ...form, result: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <select
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          className="border p-2 w-full mb-4"
        >
          <option value="kg">kg</option>
          <option value="pallet">pallet</option>
          <option value="box">box</option>
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Kirim
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

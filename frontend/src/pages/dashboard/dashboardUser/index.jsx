import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DashboardUser() {
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    tanggal: "",
    pekerjaan: [
      {
        kategori: "",
        deskripsi: "",
        hasil: "",
      },
    ],
  });

  useEffect(() => {
    const cookieUsername = Cookies.get("username");
    if (cookieUsername) {
      setUsername(cookieUsername);
    }
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPekerjaan = [...formData.pekerjaan];
    updatedPekerjaan[index][name] = value;

    setFormData({
      ...formData,
      pekerjaan: updatedPekerjaan,
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      tanggal: e.target.value,
    });
  };

  const addPekerjaan = () => {
    setFormData((prev) => ({
      ...prev,
      pekerjaan: [
        ...prev.pekerjaan,
        { kategori: "", deskripsi: "", hasil: "" },
      ],
    }));
  };

  const removePekerjaan = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      pekerjaan: prev.pekerjaan.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      nama: username,
    });
    // Kirim ke backend di sini
  };

  const kategoriOptions = [
    "CU LV 1",
    "CU LV 2",
    "AL MV",
    "CU MV",
    "HV Hidrolik",
    "Sortir Kabel",
    "Scrap Tromol Oren",
    "Spulan Xlpe",
    "Spulan Pvc",
    "Cat Tromol",
    "Cat Garis Kuning",
    "FK",
    "Kalibrasi",
    "Kebersihan Hall",
  ];

  const hasilOptions = ["Kg", "Palet", "Box", "Lainnya"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Halo, {username.toUpperCase()}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleDateChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Nama</label>
            <input
              type="text"
              value={username.toUpperCase()}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {formData.pekerjaan.map((pekerjaan, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg bg-gray-50 space-y-3 relative"
            >
              <h2 className="font-semibold">Pekerjaan {index + 1}</h2>

              {formData.pekerjaan.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePekerjaan(index)}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
                >
                  Hapus
                </button>
              )}

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Kategori Pekerjaan
                </label>
                <select
                  name="kategori"
                  value={pekerjaan.kategori}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  {kategoriOptions.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Deskripsi Pekerjaan
                </label>
                <textarea
                  name="deskripsi"
                  value={pekerjaan.deskripsi}
                  onChange={(e) => handleChange(index, e)}
                  rows={3}
                  className="w-full p-2 border rounded"
                  placeholder="Jelaskan pekerjaan..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Hasil
                </label>
                <select
                  name="hasil"
                  value={pekerjaan.hasil}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">-- Pilih Hasil --</option>
                  {hasilOptions.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPekerjaan}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Tambah Pekerjaan
          </button>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
}

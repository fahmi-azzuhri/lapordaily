import React, { useState } from "react";

const Inputan = () => {
  const today = new Date().toISOString().split("T")[0];

  const [deskripsiList, setDeskripsiList] = useState([""]);

  // Array jenis pekerjaan dan satuan
  const jenisPekerjaanOptions = [
    "IR-1",
    "Scrap Tromol",
    "Kebersihan Hall",
    "Mesin LV",
    "Mesin MV",
    "Mesin HV",
    "Cat Tromol",
    "Quading",
    "Fk",
  ];

  const satuanOptions = ["kg", "palet", "box"];

  const addDeskripsi = () => {
    setDeskripsiList([...deskripsiList, ""]);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4 text-white text-center bg-gray-900 p-3 rounded-md">
        Laporan Harian
      </h2>

      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tanggal"
          >
            Tanggal
          </label>
          <input
            type="date"
            id="tanggal"
            defaultValue={today}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            placeholder="Masukkan nama"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jenisPekerjaan"
          >
            Jenis Pekerjaan
          </label>
          <select
            id="jenisPekerjaan"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {jenisPekerjaanOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Deskripsi Pekerjaan
          </label>
          {deskripsiList.map((deskripsi, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Masukkan deskripsi pekerjaan ${index + 1}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={deskripsi}
              onChange={(e) => {
                const newList = [...deskripsiList];
                newList[index] = e.target.value;
                setDeskripsiList(newList);
              }}
            />
          ))}
          <button
            type="button"
            onClick={addDeskripsi}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            + Tambah Deskripsi
          </button>
        </div>

        <div className="mb-4">
          <div className="flex flex-col">
            <div className="flex flex-row gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="hasil"
                >
                  Hasil
                </label>
                <input
                  type="text"
                  id="hasil"
                  placeholder="Masukkan hasil"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-[120px]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="satuan"
                >
                  Satuan
                </label>
                <select
                  id="satuan"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {satuanOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Kirim 🛫
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inputan;

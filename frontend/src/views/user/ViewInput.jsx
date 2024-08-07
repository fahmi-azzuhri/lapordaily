import React from "react";

const ViewInput = ({
  name,
  setName,
  tanggal,
  setTanggal,
  deskripsiList,
  setDeskripsiList,
  jenisPekerjaan,
  setJenisPekerjaan,
  handleSubmit,
  addDeskripsi,
  jenisPekerjaanOptions,
  satuanOptions,
  setHasil,
  satuan,
  setSatuan,
  today,
  hasil,
}) => {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4 text-white text-center bg-gray-900 p-3 rounded-md">
        Laporan Harian
      </h2>

      <form onSubmit={handleSubmit}>
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
            onChange={(e) => setTanggal(e.target.value)}
            value={tanggal}
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
            onChange={(e) => setName(e.target.value)}
            value={name}
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
            onChange={(e) => setJenisPekerjaan(e.target.value)}
            value={jenisPekerjaan}
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
                  onChange={(e) => setHasil(e.target.value)}
                  value={hasil}
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
                  onChange={(e) => setSatuan(e.target.value)}
                  value={satuan}
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

export default ViewInput;

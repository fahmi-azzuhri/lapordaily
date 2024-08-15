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
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
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
            disabled
            id="name"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={jenisPekerjaan}
            onChange={(e) => setJenisPekerjaan(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Jenis Pekerjaan</option>
            <option value="IR-1">IR-1</option>
            <option value="Scrap Tromol">Scrap Tromol</option>
            <option value="Kebersihan Hall">Kebersihan Hall</option>
            <option value="Mesin LV">Mesin LV</option>
            <option value="Mesin MV">Mesin MV</option>
            <option value="Mesin HV">Mesin HV</option>
            <option value="Cat Tromol">Cat Tromol</option>
            <option value="Quading">Quading</option>
            <option value="Fk">Fk</option>
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
              value={deskripsi}
              onChange={(e) => {
                const newList = [...deskripsiList];
                newList[index] = e.target.value;
                setDeskripsiList(newList);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  value={hasil}
                  onChange={(e) => setHasil(e.target.value)}
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
                  value={satuan}
                  onChange={(e) => setSatuan(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Pilih Satuan</option>
                  <option value="kg">kg</option>
                  <option value="palet">palet</option>
                  <option value="box">box</option>
                  <option value="bobbin">bobbin</option>
                  <option value="tromol">tromol</option>
                  <option value="lainnya">lainnya</option>
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

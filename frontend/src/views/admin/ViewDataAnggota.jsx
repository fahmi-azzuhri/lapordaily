import React from "react";
import PopupAdd from "../../components/admin/PopupAdd";
import Action from "../../components/admin/Action";

function ViewDataAnggota({ handleClickAdd, handleClosePopup, data, popUp }) {
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-xl font-bold mb-4">Data Anggota PHL Scrap PP</h1>
        <button
          onClick={handleClickAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambahkan Anggota
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="w-full bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">FULL NAME</th>
              <th className="py-2 px-4 text-left">USER ROLE</th>
              <th className="py-2 px-4 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4 flex items-center">{user.username}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  <Action userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <span>Showing 1 to 5 of {data.length} Entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded">Prev</button>
            <button className="px-3 py-1 bg-gray-200 rounded">Next</button>
          </div>
        </div>
      </div>
      {popUp && <PopupAdd onClose={handleClosePopup} />}
    </div>
  );
}

export default ViewDataAnggota;

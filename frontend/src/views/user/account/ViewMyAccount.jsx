import React from "react";

function ViewMyAccount({
  name,
  setName,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  changePassword,
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-3">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={changePassword} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="oldPassword"
              className="text-sm font-medium text-gray-700"
            >
              Password Lama
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              Password Baru
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Ubah Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default ViewMyAccount;

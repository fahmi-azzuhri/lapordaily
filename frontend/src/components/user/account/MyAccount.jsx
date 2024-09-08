import React, { useState } from "react";
import Nav from "../navbar/Nav";

function MyAccount() {
  const [formData, setFormData] = useState({
    name: "Melissa Peters",
    email: "melpeters@gmail.com",
    password: "",
    dateOfBirth: "1995-05-23",
    country: "Nigeria",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to API or backend
    console.log(formData);
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-3">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyAccount;

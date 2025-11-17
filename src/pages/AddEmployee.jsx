// src/pages/AddEmployee.jsx

import { useState } from "react";

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch("http://localhost:8000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // required!
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        alert("Error adding employee");
        return;
      }

      alert("Employee added successfully!");

      // reset form
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0F1F] text-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Add Employee</h1>

      <div className="bg-[#121828] border border-gray-800 rounded-2xl p-8 shadow-xl max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1A2234] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter employee name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1A2234] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter role"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1A2234] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1A2234] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter phone number"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Add Employee
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

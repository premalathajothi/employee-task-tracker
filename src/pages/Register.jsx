import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered — please login");
      nav("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20">
      <h1 className="text-3xl font-bold mb-4">Create Account</h1>

      <form onSubmit={handleSubmit} className="w-[420px] bg-[#0f1724] p-8 rounded-2xl border border-white/10">
        <label className="text-gray-300">Username</label>
        <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} className="w-full mt-1 mb-4 px-4 py-3 bg-[#0b1220] rounded-lg text-white border border-white/10" required />

        <label className="text-gray-300">Email</label>
        <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mt-1 mb-4 px-4 py-3 bg-[#0b1220] rounded-lg text-white border border-white/10" required />

        <label className="text-gray-300">Password</label>
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full mt-1 mb-6 px-4 py-3 bg-[#0b1220] rounded-lg text-white border border-white/10" required />

        <button type="submit" className="w-full py-3 bg-white text-black rounded-lg font-semibold">Register</button>

        <div className="mt-4 text-center text-gray-400">Already have an account? <span onClick={()=>nav('/login')} className="text-indigo-300 cursor-pointer">Login</span></div>
      </form>
    </div>
  );
}

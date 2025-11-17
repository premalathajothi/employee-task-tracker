import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username: form.username, password: form.password });
      const token = res.data.access_token;
      localStorage.setItem("access_token", token);
      setAuthToken(token);
      nav("/employees");
    } catch (err) {
      console.error(err);
      alert("Login failed — check credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20">
      {/* <h1 className="text-4xl font-bold mb-4"></h1> */}
      <p className="text-gray-400 mb-8">Log in to your account</p>

      <form onSubmit={handleSubmit} className="w-[420px] bg-[#0f1724] p-8 rounded-2xl border border-white/10">
        <label className="text-gray-300">Username</label>
        <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} className="w-full mt-1 mb-4 px-4 py-3 bg-[#0b1220] rounded-lg text-white border border-white/10" required />

        <label className="text-gray-300">Password</label>
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full mt-1 mb-6 px-4 py-3 bg-[#0b1220] rounded-lg text-white border border-white/10" required />
<div className="flex justify-center">
        <button type="submit" className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
  >Sign in</button>
</div>
        <div className="mt-4 text-center text-gray-400">Don't have an account? <span onClick={()=>nav('/register')} className="text-indigo-300 cursor-pointer">Get access</span></div>
      </form>
    </div>
  );
}

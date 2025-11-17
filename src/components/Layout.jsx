import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token"); // check authentication

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      {/* SIDEBAR ONLY IF LOGGED IN */}
      {token && <Sidebar />}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 bg-[#0b1220] border-b border-white/5 flex items-center justify-between px-6 shadow-sm">

          {/* LEFT SIDE TITLE */}
          <h1 className="text-lg font-semibold text-gray-200">Dashboard</h1>

          {/* RIGHT SIDE BUTTONS (SHOW ONLY WHEN LOGGED OUT) */}
          {!token && (
            <div className="flex gap-4">
              <NavLink
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
              >
                Register
              </NavLink>
            </div>
          )}
        </header>

        {/* CONTENT */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

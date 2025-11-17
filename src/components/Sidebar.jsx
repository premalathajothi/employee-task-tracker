import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Item = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-3 rounded-md text-sm ${
        isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-[#0b1220] border-r border-white/5 h-screen flex flex-col">

      {/* --- LOGO SECTION (New Minimal Icon) --- */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
          <span className="text-white text-lg font-bold">T</span>
        </div>
        <div>
          <div className="text-white font-semibold text-lg">Tracker</div>
          <div className="text-xs text-gray-400">Task System</div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="px-2 py-4 flex-1">
        <Item to="/employees">Employees</Item>
        <Item to="/tasks">Tasks</Item>
        <Item to="/add-employee">Add Employee</Item>
        <Item to="/add-task">Add Task</Item>
      </nav>

      {/* --- LOGOUT BUTTON --- */}
      <div className="px-4 py-4 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full text-left text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

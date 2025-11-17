import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getEmployees();
      setEmployees(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee? This will also delete their tasks.")) return;

    try {
      await deleteEmployee(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Employees</h2>
        <Link to="/add-employee" className="bg-white text-black px-4 py-2 rounded">Add Employee</Link>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : employees.length === 0 ? (
        <div className="text-gray-400">No employees found</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {employees.map(emp => (
            <div key={emp.id} className="p-4 bg-[#0f1724] rounded-lg border border-white/5 flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">{emp.name}</div>
                <div className="text-sm text-gray-400">{emp.email} • {emp.role}</div>
                <div className="text-xs text-gray-500 mt-2">{emp.department || "-"}</div>
                <div className="mt-3 flex gap-2">
                  <Link to={`/employees/${emp.id}`} className="text-sm text-indigo-300 hover:underline">Details</Link>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => handleDelete(emp.id)} className="text-red-400 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

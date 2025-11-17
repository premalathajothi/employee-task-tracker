import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee, deleteEmployee } from "../api/api";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getEmployeeById(id);
      setEmp(res.data);
      setRole(res.data.role || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleUpdate = async () => {
    try {
      await updateEmployee(id, { name: emp.name, email: emp.email, department: emp.department, role });
      alert("Updated");
      load();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await deleteEmployee(id);
      navigate("/employees");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (!emp) return <div className="text-gray-400">Employee not found</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Employee Details</h2>
        <div className="flex gap-2">
          <button onClick={handleUpdate} className="bg-green-500 px-3 py-1 rounded">Save</button>
          <button onClick={handleDelete} className="bg-red-600 px-3 py-1 rounded">Delete</button>
        </div>
      </div>

      <div className="p-5 bg-[#0f1724] rounded-lg border border-white/5">
        <div className="text-lg font-bold">{emp.name}</div>
        <div className="text-sm text-gray-400">{emp.email}</div>
        <div className="mt-3">
          <label className="text-sm text-gray-300">Role</label>
          <input value={role} onChange={(e)=>setRole(e.target.value)} className="mt-1 block w-full bg-[#0b1220] border border-white/6 rounded px-3 py-2 text-white" />
        </div>

        <h3 className="mt-6 text-lg font-semibold">Assigned Tasks</h3>
        <div className="mt-3 space-y-2">
          {emp.tasks && emp.tasks.length ? emp.tasks.map(t => (
            <div key={t.id} className="p-3 bg-[#08101a] rounded flex justify-between items-center border border-white/5">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-gray-400">{t.description}</div>
              </div>
              <div className="text-sm text-gray-300">{t.status}</div>
            </div>
          )) : <div className="text-gray-400">No tasks assigned</div>}
        </div>
      </div>
    </div>
  );
}

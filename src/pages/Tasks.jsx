import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/api";
import { api } from "../api/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(()=>{ load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      load();
    } catch (err) {
      console.error(err); alert("Delete failed");
    }
  };

  const changeStatus = async (id, newStatus) => {
    try {
      // backend expects status as query param; use api instance directly
      await api.put(`/tasks/${id}?status=${encodeURIComponent(newStatus)}`);
      load();
    } catch (err) {
      console.error(err); alert("Update failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Tasks</h2>
      </div>

      <div className="space-y-3">
        {tasks.map(t => (
          <div key={t.id} className="p-4 bg-[#0f1724] rounded-lg border border-white/5 flex justify-between items-center">
            <div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-gray-400">{t.description}</div>
              <div className="text-xs text-gray-500 mt-2">Assigned to: {t.employee?.name || "—"}</div>
            </div>

            <div className="flex items-center gap-3">
              <select value={t.status} onChange={(e)=>changeStatus(t.id, e.target.value)} className="bg-[#08101a] px-2 py-1 rounded border border-white/6">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button onClick={()=>handleDelete(t.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

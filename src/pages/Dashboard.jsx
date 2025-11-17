import React, { useEffect, useState } from "react";
import { getEmployees, getTasks } from "../api/api";

export default function Dashboard() {
  const [counts, setCounts] = useState({ employees: 0, tasks: 0, completed: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [eRes, tRes] = await Promise.all([getEmployees(), getTasks()]);
        const employees = eRes.data || [];
        const tasks = tRes.data || [];
        const completed = tasks.filter(t => t.status === "Completed").length;
        setCounts({ employees: employees.length, tasks: tasks.length, completed });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 bg-[#0f1724] rounded-lg shadow border border-white/5">
          <div className="text-sm text-gray-400">Total Employees</div>
          <div className="text-3xl font-bold mt-3">{counts.employees}</div>
        </div>

        <div className="p-5 bg-[#0f1724] rounded-lg shadow border border-white/5">
          <div className="text-sm text-gray-400">Total Tasks</div>
          <div className="text-3xl font-bold mt-3">{counts.tasks}</div>
        </div>

        <div className="p-5 bg-[#0f1724] rounded-lg shadow border border-white/5">
          <div className="text-sm text-gray-400">Completed Tasks</div>
          <div className="text-3xl font-bold mt-3">{counts.completed}</div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#0f1724] rounded-lg border border-white/5">
        <h3 className="text-lg font-semibold mb-3">Activity</h3>
        <div className="text-gray-400"></div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, getEmployees } from "../api/api";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getEmployees();
        setEmployees(res.data || []);
      } catch (err) { 
        console.error(err); 
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId) { 
      alert("Select an employee"); 
      return; 
    }
    try {
      await createTask({
        title,
        description,
        status,
        employee_id: Number(employeeId)  // backend expects this
      });
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-[#0f1724] rounded-lg border border-white/5">

        <input
          className="mb-3 w-full px-3 py-2 bg-[#0b1220] rounded border border-white/6"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="mb-3 w-full px-3 py-2 bg-[#0b1220] rounded border border-white/6"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="mb-3 w-full px-3 py-2 bg-[#0b1220] rounded border border-white/6"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        {/* FIXED: Using emp.emp_id */}
        <select
          className="mb-3 w-full px-3 py-2 bg-[#0b1220] rounded border border-white/6"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        >
          <option value="">Assign to employee</option>
          {employees.map((emp) => (
            <option key={emp.emp_id} value={emp.emp_id}>
              {emp.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button className="bg-white text-black px-4 py-2 rounded" type="submit">
            Add Task
          </button>
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="bg-transparent border border-white/10 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

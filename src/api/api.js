import axios from "axios";

// Base URL
const API_URL = "http://127.0.0.1:8000";

// Axios instance
export const api = axios.create({
  baseURL: API_URL,
});

// Set or remove auth token
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

/* ============================
   🔐 AUTH ENDPOINTS
   ============================ */
export const registerUser = (data) => api.post("/register", data);

// OAuth2PasswordRequestForm → needs form URL encoding
export const loginUser = ({ username, password }) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  return api.post("/token", params);
};

/* ============================
   👨‍💼 EMPLOYEE ENDPOINTS
   ============================ */
export const getEmployees = () => api.get("/employees");
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const createEmployee = (data) => api.post("/employees", data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

/* ============================
   📌 TASK ENDPOINTS
   ============================ */
export const getTasks = () => api.get("/tasks");
export const createTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

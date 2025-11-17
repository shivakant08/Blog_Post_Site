// src/utils/api.js
import axios from "axios";

// Export BASE_URL so it can be imported everywhere
export const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;

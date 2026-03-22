import axios from "axios";

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const isDevelopment = import.meta.env.DEV;

const apiBaseUrl = configuredApiBaseUrl || (isDevelopment ? "http://localhost:8080" : null);

if (!apiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL is required for production builds. Set it to your deployed backend origin."
  );
}

const api = axios.create({
  baseURL: `${apiBaseUrl}/api/v1`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

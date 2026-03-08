import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"

const api = axios.create({
  baseURL: `${apiBaseUrl}/api/v1`,
})

export default api

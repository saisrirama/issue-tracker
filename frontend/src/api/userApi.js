import api from "./axios";

export async function getAllUsers() {
  const response = await api.get("/users");
  return response.data;
}

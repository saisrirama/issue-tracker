import api from "./axios";

export async function getAllUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function createUser(user) {
  const response = await api.post("/users", user);
  return response.data;
}

export async function updateUser(userId, user) {
  const response = await api.put(`/users/${userId}`, user);
  return response.data;
}

export async function deleteUser(userId) {
  await api.delete(`/users/${userId}`);
}

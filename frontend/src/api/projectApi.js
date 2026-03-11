import api from "./axios";

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export const createProject = async (project) => {
  const response = await api.post("/projects", project);
  return response.data;
};

export const updateProject = async (projectId, project) => {
  const response = await api.put(`/projects/${projectId}`, project);
  return response.data;
};

export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};
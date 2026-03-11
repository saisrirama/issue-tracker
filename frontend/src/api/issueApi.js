import api from "./axios";

export const getIssues = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/issues`);
  return response.data;
};

export const getAllIssues = async () => {
  const response = await api.get("/issues");
  return response.data;
};

export const getIssue = async (issueId) => {
  const response = await api.get(`/issues/${issueId}`);
  return response.data;
};

export const createIssue = async (issue) => {
  const response = await api.post(`/issues`, issue);
  return response.data;
};

export const updateIssue = async (id, issue) => {
  const response = await api.put(`/issues/${id}`, issue);
  return response.data;
};

export const deleteIssue = async (id) => {
  await api.delete(`/issues/${id}`);
};


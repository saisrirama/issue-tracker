import api from "./axios"

export const getIssues = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/issues`)
  return response.data
}

export const createIssue = async (projectId, issue) => {
  const response = await api.post(`/projects/${projectId}/issues`, issue)
  return response.data
}

export const updateIssue = async (id, issue) => {
  const response = await api.put(`/issues/${id}`, issue)
  return response.data
}

export const deleteIssue = async (id) => {
  await api.delete(`/issues/${id}`)
}

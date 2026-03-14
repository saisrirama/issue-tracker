import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { createProject, deleteProject, updateProject } from "../api/projectApi";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";

function ProjectsPage() {
  const { projects, loading, setProjects } = useProjects();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleCreate = async (data) => {
    try {
      const newProject = await createProject(data);
      setProjects([...projects, newProject]);
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleSave = async (id, data) => {
    try {
      const updatedProject = await updateProject(id, data);
      setProjects(
        projects.map((p) => (p.id === id ? updatedProject : p))
      );
    } catch (error) {
      console.error("Failed to update project", error);
    }
  };

  if (loading) {
    return <p className="p-6">Loading projects...</p>;
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-left">Name</th>
              <th className="p-2 border text-left">Description</th>
              <th className="w-px whitespace-nowrap p-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="p-2 border">{project.name}</td>
                <td className="p-2 border">{project.description || "No description provided."}</td>
                <td className="w-px whitespace-nowrap p-2 border">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
      {editingProject && (
        <EditProjectModal
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
          project={editingProject}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ProjectsPage;

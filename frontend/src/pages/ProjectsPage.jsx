import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProjects } from "../hooks/useProjects";
import { createProject, deleteProject, updateProject } from "../api/projectApi";
import ProjectCard from "../components/ProjectCard";
import EditProjectModal from "../components/EditProjectModal";

function ProjectsPage() {
  const { projects, loading, setProjects } = useProjects();
  const { register, handleSubmit, reset } = useForm();
  const [editingProject, setEditingProject] = useState(null);

  const handleCreate = async (data) => {
    try {
      const newProject = await createProject(data);
      setProjects([...projects, newProject]);
      reset();
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
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Create Project Form */}
      <form onSubmit={handleSubmit(handleCreate)} className="mb-6 flex gap-2">
        <input
          {...register("name", { required: true })}
          className="border p-2"
          placeholder="Project Name"
        />
        <input
          {...register("description")}
          className="border p-2"
          placeholder="Description"
        />
        <button type="submit" className="bg-blue-500 text-white px-4">
          Create
        </button>
      </form>

      {/* Project List */}
      {projects.length === 0 && <p>No projects found</p>}

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

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
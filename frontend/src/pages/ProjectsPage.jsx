import { useEffect, useState } from "react"
import { getProjects, createProject, deleteProject } from "../api/projectApi"
import ProjectCard from "../components/ProjectCard"
import { useProjects } from "../hooks/useProjects"


function ProjectsPage() {

const { projects, loading, setProjects } = useProjects()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }
  

  const handleCreate = async (e) => {
    e.preventDefault()

    try {
      const newProject = await createProject({
        name,
        description
      })

      setProjects([...projects, newProject])

      setName("")
      setDescription("")

    } catch (error) {
      console.error("Failed to create project")
    }
  }

  const handleDelete = async (id) => {

    try {
      await deleteProject(id)

      setProjects(projects.filter(p => p.id !== id))

    } catch (error) {
      console.error("Failed to delete project")
    }
  }

  if (loading) {
    return <p className="p-6">Loading projects...</p>
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Projects
      </h1>

      {/* Create Project Form */}

      <form
        onSubmit={handleCreate}
        className="mb-6 flex gap-2"
      >

        <input
          className="border p-2"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4">
          Create
        </button>

      </form>

      {/* Project List */}

      {projects.length === 0 && (
        <p>No projects found</p>
      )}

      <div className="grid gap-4">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
          />
        ))}

      </div>

    </div>
  )
}

export default ProjectsPage
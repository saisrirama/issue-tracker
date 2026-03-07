import { useEffect, useState } from "react"
import { getProjects } from "../api/projectApi"
import ProjectCard from "../components/ProjectCard"

function ProjectsPage() {

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <p className="p-6">Loading projects...</p>
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Projects
      </h1>

      <div className="grid gap-4">

        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

      </div>

    </div>
  )
}

export default ProjectsPage
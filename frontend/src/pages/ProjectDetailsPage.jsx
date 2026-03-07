import { useParams } from "react-router-dom"

function ProjectDetailsPage() {
  const { projectId } = useParams()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Project Details
      </h1>

      <p>Project ID: {projectId}</p>
    </div>
  )
}

export default ProjectDetailsPage
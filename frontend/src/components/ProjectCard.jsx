function ProjectCard({ project }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg">
      <h2 className="text-lg font-semibold">{project.name}</h2>
      <p className="text-gray-600">{project.description}</p>
    </div>
  )
}

export default ProjectCard
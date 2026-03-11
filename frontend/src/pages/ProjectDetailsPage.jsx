import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { useIssues } from "../hooks/useIssues";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { project, loading: projectLoading, error: projectError } = useProject(projectId);
  const { issues, loading: issuesLoading, error: issuesError } = useIssues();

  if (projectLoading || issuesLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (projectError || issuesError) {
    return <p className="p-6">Error loading data.</p>;
  }

  const projectIssues = issues.filter(
    (issue) => issue.projectId === parseInt(projectId)
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
      <p className="text-gray-600 mb-6">{project?.description}</p>

      <h2 className="text-2xl font-bold mb-4">Issues</h2>

      <div className="grid gap-3">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Feature</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {projectIssues.map((issue) => (
              <tr key={issue.id}>
                <td className="p-2 border">{issue.title}</td>
                <td className="p-2 border">{issue.feature}</td>
                <td className="p-2 border">{issue.priority}</td>
                <td className="p-2 border">{issue.status}</td>
                <td className="p-2 border">{issue.dueDate}</td>
                <td className="p-2 border">{issue.assigneeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;


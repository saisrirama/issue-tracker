import { useParams } from "react-router-dom";
import { useIssue } from "../hooks/useIssue";

function IssueDetailsPage() {
  const { issueId } = useParams();
  const { issue, loading, error } = useIssue(issueId);

  if (loading) {
    return <p className="p-6">Loading issue details...</p>;
  }

  if (error) {
    return <p className="p-6">Error loading issue details.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{issue?.title}</h1>
      <p className="text-gray-600 mb-6">{issue?.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold">Details</h2>
          <div className="mt-2">
            <p>
              <strong>Project:</strong> {issue?.projectName}
            </p>
            <p>
              <strong>Feature:</strong> {issue?.feature}
            </p>
            <p>
              <strong>Priority:</strong> {issue?.priority}
            </p>
            <p>
              <strong>Status:</strong> {issue?.status}
            </p>
            <p>
              <strong>Due Date:</strong> {issue?.dueDate}
            </p>
            <p>
              <strong>Time Estimate:</strong> {issue?.timeEstimate} hours
            </p>
            <p>
              <strong>Assignee:</strong> {issue?.assigneeName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetailsPage;
import React from 'react';
import { useIssues } from '../hooks/useIssues';
import { useAuth } from '../context/AuthContext';

const MyIssuesPage = () => {
  const { issues, loading, error } = useIssues();
  const { user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const myIssues = issues.filter((issue) => issue.assigneeId === user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Issues</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Project</th>
            <th className="p-2 border">Feature</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {myIssues.map((issue) => (
            <tr key={issue.id}>
              <td className="p-2 border">{issue.title}</td>
              <td className="p-2 border">{issue.projectName}</td>
              <td className="p-2 border">{issue.feature}</td>
              <td className="p-2 border">{issue.priority}</td>
              <td className="p-2 border">{issue.status}</td>
              <td className="p-2 border">{issue.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyIssuesPage;

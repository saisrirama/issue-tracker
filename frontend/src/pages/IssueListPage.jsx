import React, { useState, useMemo } from 'react';
import { deleteIssue } from '../api/issueApi';
import { useIssues } from '../hooks/useIssues';
import { useProjects } from '../hooks/useProjects';
import CreateIssueModal from '../components/CreateIssueModal';
import EditIssueModal from '../components/EditIssueModal';
import ViewIssueModal from '../components/ViewIssueModal';

const IssueListPage = () => {
  const { issues, loading, error, setIssues } = useIssues();
  const { projects, loading: projectsLoading } = useProjects();
  const [projectFilter, setProjectFilter] = useState('');
  const [featureFilter, setFeatureFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingIssue, setViewingIssue] = useState(null);
  const [editingIssue, setEditingIssue] = useState(null);

  const filteredAndSortedIssues = useMemo(() => {
    let filteredIssues = [...issues];

    if (projectFilter) {
      filteredIssues = filteredIssues.filter((issue) => issue.projectId === parseInt(projectFilter));
    }

    if (featureFilter) {
      filteredIssues = filteredIssues.filter((issue) =>
        issue.feature?.toLowerCase().includes(featureFilter.toLowerCase())
      );
    }

    if (priorityFilter) {
      filteredIssues = filteredIssues.filter((issue) => issue.priority === priorityFilter);
    }

    if (sortConfig.key) {
      filteredIssues.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredIssues;
  }, [issues, projectFilter, featureFilter, priorityFilter, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleIssueUpdated = (updatedIssue) => {
    setIssues((currentIssues) =>
      currentIssues.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue))
    );
  };

  const handleIssueDeleted = async (issueId) => {
    try {
      await deleteIssue(issueId);
      setIssues((currentIssues) => currentIssues.filter((issue) => issue.id !== issueId));
      if (editingIssue?.id === issueId) {
        setEditingIssue(null);
      }
    } catch (deleteError) {
      console.error('Failed to delete issue', deleteError);
    }
  };

  if (loading || projectsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Issues</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Create Issue
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="projectFilter" className="block text-sm font-medium text-gray-700">
              Filter by Project
            </label>
            <select
              id="projectFilter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="featureFilter" className="block text-sm font-medium text-gray-700">
              Filter by Feature
            </label>
            <input
              id="featureFilter"
              type="text"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={featureFilter}
              onChange={(e) => setFeatureFilter(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700">
              Filter by Priority
            </label>
            <select
              id="priorityFilter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
        <div className="flex items-end space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <button onClick={() => requestSort('priority')} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">Priority</button>
          <button onClick={() => requestSort('dueDate')} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">Due Date</button>
          <button onClick={() => requestSort('status')} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">Status</button>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Project</th>
            <th className="p-2 border">Feature</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Assignee</th>
            <th className="w-px whitespace-nowrap p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedIssues.map((issue) => (
            <tr key={issue.id}>
              <td className="p-2 border">{issue.title}</td>
              <td className="p-2 border">{issue.projectName}</td>
              <td className="p-2 border">{issue.feature}</td>
              <td className="p-2 border">{issue.priority}</td>
              <td className="p-2 border">{issue.status}</td>
              <td className="p-2 border">{issue.dueDate}</td>
              <td className="p-2 border">{issue.assigneeName}</td>
              <td className="w-px whitespace-nowrap p-2 border">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingIssue(issue)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingIssue(issue)}
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIssueDeleted(issue.id)}
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

      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(createdIssue) => setIssues((currentIssues) => [...currentIssues, createdIssue])}
      />
      <ViewIssueModal
        isOpen={Boolean(viewingIssue)}
        issue={viewingIssue}
        onClose={() => setViewingIssue(null)}
      />
      <EditIssueModal
        isOpen={Boolean(editingIssue)}
        issue={editingIssue}
        onClose={() => setEditingIssue(null)}
        onUpdated={handleIssueUpdated}
      />
    </div>
  );
};

export default IssueListPage;

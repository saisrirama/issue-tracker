import React, { useState, useMemo } from 'react';
import { useIssues } from '../hooks/useIssues';
import { useProjects } from '../hooks/useProjects';

const IssueListPage = () => {
  const { issues, loading, error } = useIssues();
  const { projects, loading: projectsLoading } = useProjects();
  const [projectFilter, setProjectFilter] = useState('');
  const [featureFilter, setFeatureFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

  if (loading || projectsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Issues</h1>

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

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Project</th>
            <th className="p-2 border">Feature</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Assignee</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueListPage;

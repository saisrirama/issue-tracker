import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { useIssues } from "../hooks/useIssues";
import CreateIssueModal from "../components/CreateIssueModal";
import EditIssueModal from "../components/EditIssueModal";

function ProjectDetailsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project, loading: projectLoading, error: projectError } = useProject(projectId);
  const { issues, loading: issuesLoading, error: issuesError, setIssues } = useIssues();

  if (projectLoading || issuesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (projectError || issuesError) {
    return (
      <div className="p-8 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center justify-center">
        <span className="mr-2">⚠️</span> Error loading project details. Please try again.
      </div>
    );
  }

  const projectIssues = useMemo(
    () => issues.filter((issue) => issue.projectId === parseInt(projectId, 10)),
    [issues, projectId]
  );

  const handleIssueUpdated = (updatedIssue) => {
    setIssues((currentIssues) =>
      currentIssues.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Project Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm shadow-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <nav className="flex mb-4 text-sm font-medium text-slate-400" aria-label="Breadcrumb">
            <Link to="/projects" className="hover:text-indigo-600 transition-colors">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600">Details</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">{project?.name}</h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">{project?.description}</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-100 active:scale-95 whitespace-nowrap"
        >
          + Create Issue
        </button>
      </div>

      {/* Issues Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm shadow-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <span className="mr-2">📋</span> Project Issues
          </h2>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {projectIssues.length} Items Found
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="px-8 py-4 border-b border-slate-100">ID</th>
                <th className="px-8 py-4 border-b border-slate-100">Title</th>
                <th className="px-8 py-4 border-b border-slate-100">Priority</th>
                <th className="px-8 py-4 border-b border-slate-100">Tag</th>
                <th className="px-8 py-4 border-b border-slate-100">Status</th>
                <th className="px-8 py-4 border-b border-slate-100">Created Date</th>
                <th className="px-8 py-4 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectIssues.length > 0 ? (
                projectIssues.map((issue) => (
                  <tr key={issue.id} className="group transition-colors hover:bg-indigo-50/30">
                    <td className="px-8 py-5 text-slate-400 font-mono text-sm">#{issue.id}</td>
                    <td className="px-8 py-5 font-semibold text-slate-900">{issue.title}</td>
                    <td className="px-8 py-5">
                      <PriorityBadge priority={issue.priority} />
                    </td>
                    <td className="px-8 py-5 font-medium text-slate-600">
                      <span className="px-2 py-1 bg-slate-100 rounded-md text-xs">{issue.tag || 'Unset'}</span>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={issue.status} />
                    </td>
                    <td className="px-8 py-5 text-slate-500 text-sm">{issue.createdAt || 'Mar 13, 2026'}</td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/issues/${issue.id}`)}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingIssue(issue)}
                          className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-8 py-12 text-center text-slate-400 italic">
                    No issues found for this project. Start by creating one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialProjectId={Number(projectId)}
        onCreated={(createdIssue) => setIssues((currentIssues) => [...currentIssues, createdIssue])}
      />
      <EditIssueModal
        isOpen={Boolean(editingIssue)}
        issue={editingIssue}
        onClose={() => setEditingIssue(null)}
        onUpdated={handleIssueUpdated}
      />
    </div>
  );
}

const PriorityBadge = ({ priority }) => {
  const styles = {
    'High': 'bg-red-50 text-red-600 border-red-100',
    'Medium': 'bg-amber-50 text-amber-600 border-amber-100',
    'Low': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'default': 'bg-slate-50 text-slate-500 border-slate-100'
  };
  const style = styles[priority] || styles.default;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${style}`}>
      {priority}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'Done': 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
    'In Progress': 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10',
    'To Do': 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10',
    'DONE': 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
    'IN_PROGRESS': 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10',
    'TODO': 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10',
    'default': 'bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-400/10'
  };
  const style = styles[status] || styles.default;
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
};

export default ProjectDetailsPage;

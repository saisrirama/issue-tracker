import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { useIssues } from '../hooks/useIssues';

const DashboardPage = ({ children }) => {
  if (children) {
    return (
      <main className="flex-1 p-8">
        {children}
      </main>
    );
  }

  const { projects, loading: projectsLoading } = useProjects();
  const { issues, loading: issuesLoading } = useIssues();

  if (projectsLoading || issuesLoading) {
    return <main className="flex-1 p-8">Loading dashboard...</main>;
  }

  const recentIssues = issues.slice(0, 4);

  return (
    <main className="flex-1 space-y-10 p-8">
      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-2 text-slate-500">Overview of active projects and recent issues.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Projects</p>
            <p className="mt-3 text-4xl font-bold text-slate-900">{projects.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Issues</p>
            <p className="mt-3 text-4xl font-bold text-slate-900">{issues.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Open Issues</p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {issues.filter((issue) => !["Done", "DONE"].includes(issue.status)).length}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-500">Jump straight into any project.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
              <p className="mt-3 text-slate-600">{project.description || "No description provided."}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Recent Issues</h2>
          <p className="text-slate-500">Quick view of the latest issue cards.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {recentIssues.map((issue) => (
            <div key={issue.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{issue.title}</h3>
              <p className="mt-3 text-slate-600">{issue.description || "No description provided."}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;

import React from "react";

function ProjectCard({ project, onDelete, onEdit }) {
  const showActions = Boolean(onDelete || onEdit);

  return (
    <div className="group flex justify-between gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Project</p>
        <h2 className="mt-3 text-xl font-semibold text-slate-900">{project.name}</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          {project.description || "No description provided."}
        </p>
      </div>

      {showActions && (
        <div className="flex flex-col justify-between gap-3">
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(ProjectCard);

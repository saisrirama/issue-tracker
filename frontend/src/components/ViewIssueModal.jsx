import React from "react";

const formatReadableDateTime = (value) => {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${day}${suffix} ${month}, ${year} at ${time}`;
};

const DetailCard = ({ label, value, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 ${className}`}>
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
    <p className="mt-2 text-sm leading-6 text-slate-700">{value || "Not set"}</p>
  </div>
);

const ViewIssueModal = ({ isOpen, issue, onClose }) => {
  if (!isOpen || !issue) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Issue Details</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{issue.title}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Review the full issue details below.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          <DetailCard
            label="Description"
            value={issue.description || "No description provided."}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <DetailCard label="Project" value={issue.projectName} />
            <DetailCard label="Feature" value={issue.feature} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DetailCard label="Assigned To" value={issue.assigneeName} />
            <DetailCard label="Priority" value={issue.priority} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <DetailCard label="Status" value={issue.status} />
            <DetailCard label="Due Date" value={issue.dueDate} />
            <DetailCard
              label="Time Estimate"
              value={issue.timeEstimate ? `${issue.timeEstimate} hour(s)` : "Not set"}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <DetailCard label="Issue ID" value={issue.id ? `#${issue.id}` : "Not set"} />
            <DetailCard label="Created At" value={formatReadableDateTime(issue.createdAt)} />
            <DetailCard label="Updated At" value={formatReadableDateTime(issue.updatedAt)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewIssueModal;

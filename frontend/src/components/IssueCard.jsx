import { useState } from "react"
import { useNavigate } from "react-router-dom";

function IssueCard({ issue, onStatusChange, onSave, onDelete }) {
  const navigate = useNavigate();
  const showActions = Boolean(onDelete || onSave || onStatusChange);

  const [title, setTitle] = useState(issue.title ?? "")
  const [description, setDescription] = useState(issue.description ?? "")

  return (
    <div className="border p-4 rounded flex flex-col gap-3 bg-white shadow-sm">

      <div className="grid gap-2">
        <button
          type="button"
          onClick={() => navigate(`/issues/${issue.id}`)}
          className="text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {issue.projectName ?? "Issue"}
          </p>
        </button>
        <input
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Issue title"
        />
        <input
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Issue description"
        />
        <p className="text-gray-600">
          Status: {issue.status ?? "OPEN"}
        </p>
        {issue.priority && <p className="text-gray-600">Priority: {issue.priority}</p>}
      </div>

      {showActions && (
        <div className="flex gap-2 justify-end">
          {onDelete && (
            <button
              onClick={() => onDelete(issue.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          )}

          {onSave && (
            <button
              onClick={() => onSave(issue.id, { title, description })}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          )}

          {onStatusChange && (
            <button
              onClick={() =>
                onStatusChange(issue.id, issue.status)
              }
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Update Status
            </button>
          )}
        </div>
      )}

    </div>
  )
}

export default IssueCard

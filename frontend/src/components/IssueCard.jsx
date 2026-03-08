import { useState } from "react"

function IssueCard({ issue, onStatusChange, onSave, onDelete }) {

  const [title, setTitle] = useState(issue.title ?? "")
  const [description, setDescription] = useState(issue.description ?? "")

  return (
    <div className="border p-4 rounded flex flex-col gap-3">

      <div className="grid gap-2">
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
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={() => onDelete(issue.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

        <button
          onClick={() => onSave(issue.id, { title, description })}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Save
        </button>

        <button
          onClick={() =>
            onStatusChange(issue.id, issue.status)
          }
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Update Status
        </button>
      </div>

    </div>
  )
}

export default IssueCard

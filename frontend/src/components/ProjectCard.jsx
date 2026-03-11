import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded shadow flex justify-between">
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/projects/${project.id}`)}
      >
        <h2 className="font-semibold">{project.name}</h2>
        <p className="text-gray-600">{project.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(project)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProjectCard);
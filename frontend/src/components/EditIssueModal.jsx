import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { updateIssue } from "../api/issueApi";
import { useProjects } from "../hooks/useProjects";
import { useUsers } from "../hooks/useUsers";

const EditIssueModal = ({ isOpen, issue, onClose, onUpdated }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      projectId: "",
      feature: "",
      assignedTo: "",
      priority: "Medium",
      dueDate: "",
      timeEstimate: "",
      status: "To Do",
    },
  });
  const { projects, loading: projectsLoading } = useProjects();
  const { users, loading: usersLoading } = useUsers();
  const [submitError, setSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !issue) {
      return;
    }

    reset({
      title: issue.title ?? "",
      description: issue.description ?? "",
      projectId: issue.projectId ? String(issue.projectId) : "",
      feature: issue.feature ?? "",
      assignedTo: issue.assigneeId ? String(issue.assigneeId) : "",
      priority: issue.priority ?? "Medium",
      dueDate: issue.dueDate ?? "",
      timeEstimate: issue.timeEstimate ?? "",
      status: issue.status ?? "To Do",
    });
    setSubmitError("");
  }, [isOpen, issue, reset]);

  if (!isOpen || !issue) {
    return null;
  }

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      setSubmitError("");

      const updatedIssue = await updateIssue(issue.id, {
        ...data,
        projectId: data.projectId ? Number(data.projectId) : null,
        assignedTo: data.assignedTo ? Number(data.assignedTo) : null,
        timeEstimate: data.timeEstimate ? Number(data.timeEstimate) : null,
      });

      onUpdated?.(updatedIssue);
      onClose();
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ?? "Failed to update issue. Check your input and try again."
      );
      console.error("Failed to update issue:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Edit Issue</h2>
            <p className="mt-1 text-sm text-slate-500">Update the issue details and save your changes.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {submitError && (
            <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <div className="mb-4">
            <label htmlFor="edit-title" className="mb-1 block text-sm font-medium text-slate-700">
              Issue Name
            </label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Issue name is required" }}
              render={({ field }) => (
                <input {...field} id="edit-title" className="w-full rounded-xl border border-slate-200 p-3" />
              )}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="edit-description" className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea {...field} id="edit-description" rows={4} className="w-full rounded-xl border border-slate-200 p-3" />
              )}
            />
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="edit-project" className="mb-1 block text-sm font-medium text-slate-700">
                Project
              </label>
              <Controller
                name="projectId"
                control={control}
                rules={{ required: "Project is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    id="edit-project"
                    className="w-full rounded-xl border border-slate-200 p-3"
                    disabled={projectsLoading}
                  >
                    {projects.length === 0 && <option value="">No projects available</option>}
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.projectId && <p className="mt-1 text-sm text-red-500">{errors.projectId.message}</p>}
            </div>
            <div>
              <label htmlFor="edit-feature" className="mb-1 block text-sm font-medium text-slate-700">
                Feature
              </label>
              <Controller
                name="feature"
                control={control}
                render={({ field }) => (
                  <input {...field} id="edit-feature" className="w-full rounded-xl border border-slate-200 p-3" />
                )}
              />
            </div>
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="edit-assignee" className="mb-1 block text-sm font-medium text-slate-700">
                Assigned To
              </label>
              <Controller
                name="assignedTo"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="edit-assignee"
                    className="w-full rounded-xl border border-slate-200 p-3"
                    disabled={usersLoading}
                  >
                    <option value="">Unassigned</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label htmlFor="edit-priority" className="mb-1 block text-sm font-medium text-slate-700">
                Priority
              </label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <select {...field} id="edit-priority" className="w-full rounded-xl border border-slate-200 p-3">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                )}
              />
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="edit-status" className="mb-1 block text-sm font-medium text-slate-700">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select {...field} id="edit-status" className="w-full rounded-xl border border-slate-200 p-3">
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label htmlFor="edit-due-date" className="mb-1 block text-sm font-medium text-slate-700">
                Due Date
              </label>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <input {...field} id="edit-due-date" type="date" className="w-full rounded-xl border border-slate-200 p-3" />
                )}
              />
            </div>
            <div>
              <label htmlFor="edit-time-estimate" className="mb-1 block text-sm font-medium text-slate-700">
                Time Estimate
              </label>
              <Controller
                name="timeEstimate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="edit-time-estimate"
                    type="number"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 p-3"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssueModal;

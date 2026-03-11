import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useProjects } from '../hooks/useProjects';
import { useUsers } from '../hooks/useUsers';
import { createIssue } from '../api/issueApi';

const CreateIssueModal = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { projects, loading: projectsLoading } = useProjects();
  const { users, loading: usersLoading } = useUsers();

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    try {
      await createIssue(data);
      onClose();
    } catch (error) {
      console.error('Failed to create issue:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Create Issue</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Issue Name</label>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Issue name is required' }}
              render={({ field }) => <input {...field} id="title" className="w-full p-2 border rounded" />}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <textarea {...field} id="description" className="w-full p-2 border rounded" />}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="projectId" className="block text-gray-700">Project</label>
              <Controller
                name="projectId"
                control={control}
                rules={{ required: 'Project is required' }}
                render={({ field }) => (
                  <select {...field} id="projectId" className="w-full p-2 border rounded" disabled={projectsLoading}>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.projectId && <p className="text-red-500">{errors.projectId.message}</p>}
            </div>
            <div>
              <label htmlFor="feature" className="block text-gray-700">Feature</label>
              <Controller
                name="feature"
                control={control}
                render={({ field }) => <input {...field} id="feature" className="w-full p-2 border rounded" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="assignedTo" className="block text-gray-700">Assigned To</label>
              <Controller
                name="assignedTo"
                control={control}
                render={({ field }) => (
                  <select {...field} id="assignedTo" className="w-full p-2 border rounded" disabled={usersLoading}>
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
              <label htmlFor="priority" className="block text-gray-700">Priority</label>
              <Controller
                name="priority"
                control={control}
                rules={{ required: 'Priority is required' }}
                render={({ field }) => (
                  <select {...field} id="priority" className="w-full p-2 border rounded">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                )}
              />
              {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dueDate" className="block text-gray-700">Due Date</label>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => <input {...field} id="dueDate" type="date" className="w-full p-2 border rounded" />}
              />
            </div>
            <div>
              <label htmlFor="timeEstimate" className="block text-gray-700">Time Estimate (hours)</label>
              <Controller
                name="timeEstimate"
                control={control}
                render={({ field }) => <input {...field} id="timeEstimate" type="number" className="w-full p-2 border rounded" />}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 p-2 border rounded">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssueModal;

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const EditProjectModal = ({ isOpen, onClose, project, onSave }) => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
      });
    }
  }, [project, reset]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = (data) => {
    onSave(project.id, data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Project Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <input {...field} id="name" className="w-full p-2 border rounded" />}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <textarea {...field} id="description" className="w-full p-2 border rounded" />}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 p-2 border rounded">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;

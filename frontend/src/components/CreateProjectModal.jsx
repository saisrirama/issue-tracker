import React from "react";
import { Controller, useForm } from "react-hook-form";

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    await onCreate(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold">Create Project</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="create-project-name" className="block text-gray-700">
              Project Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input {...field} id="create-project-name" className="w-full rounded border p-2" />
              )}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="create-project-description" className="block text-gray-700">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea {...field} id="create-project-description" className="w-full rounded border p-2" />
              )}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 rounded border p-2">
              Cancel
            </button>
            <button type="submit" className="rounded bg-indigo-600 p-2 text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;

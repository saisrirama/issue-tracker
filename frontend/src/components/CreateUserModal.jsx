import React from "react";
import { Controller, useForm } from "react-hook-form";

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
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
        <h2 className="mb-4 text-2xl font-bold">Create User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="create-user-name" className="block text-gray-700">
              Full Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input {...field} id="create-user-name" className="w-full rounded border p-2" />
              )}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="create-user-email" className="block text-gray-700">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <input {...field} id="create-user-email" className="w-full rounded border p-2" />
              )}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
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

export default CreateUserModal;

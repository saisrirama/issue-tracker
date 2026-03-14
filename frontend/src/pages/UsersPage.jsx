import { useState } from "react";
import { createUser, deleteUser, updateUser } from "../api/userApi";
import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const { users, loading, error, setUsers } = useUsers();
  const [submitError, setSubmitError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleCreate = async (data) => {
    try {
      setSubmitError("");
      const newUser = await createUser(data);
      setUsers((currentUsers) => [...currentUsers, newUser]);
    } catch (err) {
      setSubmitError(err.response?.data?.message ?? "Failed to create user.");
    }
  };

  const handleEdit = async (userId, data) => {
    try {
      setSubmitError("");
      const updatedUser = await updateUser(userId, data);
      setUsers((currentUsers) =>
        currentUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (err) {
      setSubmitError(err.response?.data?.message ?? "Failed to update user.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setSubmitError(err.response?.data?.message ?? "Failed to delete user.");
    }
  };

  if (loading) {
    return <div className="p-8">Loading users...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Failed to load users.</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Create User
        </button>
      </div>

      {submitError && (
        <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-left">Name</th>
              <th className="p-2 border text-left">Email</th>
              <th className="w-px whitespace-nowrap p-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="w-px whitespace-nowrap p-2 border">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingUser(user)}
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
      <EditUserModal
        isOpen={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        user={editingUser}
        onSave={handleEdit}
      />
    </div>
  );
};

export default UsersPage;

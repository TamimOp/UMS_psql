"use client";

import useDelete from "@/hooks/useDelete";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();

  const {
    data: fetchedUsers,
    isLoading,
    error,
    success,
    refetch,
  } = useFetch("/api/users/get");

  useEffect(() => {
    async function fetchCurrentUser() {
      const response = await fetch("/api/auth/me");
      const userData = await response.json();
      setCurrentUser(userData.user);
    }

    fetchCurrentUser();
  }, []);

  const {
    postData: updateStatus,
    isLoading: isUpdatingStatus,
    error: errorUpdatingStatus,
  } = usePost("/api/users/update-status");

  const {
    deleteData: deleteUser,
    isLoading: isDeletingUser,
    error: errorDeletingUser,
  } = useDelete("/api/users/delete");

  useEffect(() => {
    if (success && fetchedUsers) {
      setUsers(fetchedUsers.users);
    }
  }, [success, fetchedUsers]);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleBlockUsers = async () => {
    await updateStatus({ userIds: selectedUsers, status: "Blocked" });
    if (!errorUpdatingStatus) {
      setUsers(
        users.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: "Blocked" }
            : user
        )
      );
      setSelectedUsers([]);
    }
  };

  const handleUnblockUsers = async () => {
    await updateStatus({ userIds: selectedUsers, status: "Active" });
    if (!errorUpdatingStatus) {
      setUsers(
        users.map((user) =>
          selectedUsers.includes(user.id) ? { ...user, status: "Active" } : user
        )
      );
      setSelectedUsers([]);
    }
  };

  const handleDeleteUsers = async () => {
    await deleteUser(selectedUsers);
    if (!errorDeletingUser) {
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          Hello, {currentUser ? currentUser.name : "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-bold">User Registry</h2>

      <div className="flex space-x-4 mb-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleBlockUsers}
          disabled={!selectedUsers.length}
        >
          🔒 Block
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleUnblockUsers}
          disabled={!selectedUsers.length}
        >
          🔓 Unblock
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleDeleteUsers}
          disabled={!selectedUsers.length}
        >
          ⚔️ Delete
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4">
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="py-2 px-4">Name / Position</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Last Login</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleSelectUser(user.id)}
                />
              </td>
              <td className="border px-4 py-2">
                {user.name} <br />{" "}
                <span className="text-sm text-gray-500">
                  {user.position || "-"}
                </span>
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.lastLogin || "-"}</td>
              <td className="border px-4 py-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;

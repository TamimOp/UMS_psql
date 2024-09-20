"use client"; // This marks the component as a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router hook for client-side navigation
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const router = useRouter(); // Replace useNavigate with Next.js useRouter

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = (userId) => {
    // Block user logic
  };

  const handleUnblockUser = (userId) => {
    // Unblock user logic
  };

  const handleDeleteUser = (userId) => {
    // Delete user logic
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="border px-4 py-2">
                {user.isBlocked ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleUnblockUser(user.id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleBlockUser(user.id)}
                  >
                    Block
                  </button>
                )}
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded ml-2"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;

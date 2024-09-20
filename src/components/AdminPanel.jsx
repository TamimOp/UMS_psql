import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from PostgreSQL via the Next.js API route
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

  // Handle selection of users (for block, unblock, delete actions)
  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Block selected users
  const handleBlockUsers = async () => {
    try {
      await axios.put("/api/users/block", { userIds: selectedUsers });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: "Blocked" }
            : user
        )
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  // Unblock selected users
  const handleUnblockUsers = async () => {
    try {
      await axios.put("/api/users/unblock", { userIds: selectedUsers });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id) ? { ...user, status: "Active" } : user
        )
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error unblocking users:", error);
    }
  };

  // Delete selected users
  const handleDeleteUsers = async () => {
    try {
      await axios.delete("/api/users/delete", {
        data: { userIds: selectedUsers },
      });
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedUsers.includes(user.id))
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  // Render user list with actions (Block, Unblock, Delete)
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <div className="mb-4">
        <button
          onClick={handleBlockUsers}
          disabled={selectedUsers.length === 0}
          className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
        >
          Block
        </button>
        <button
          onClick={handleUnblockUsers}
          disabled={selectedUsers.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
        >
          Unblock
        </button>
        <button
          onClick={handleDeleteUsers}
          disabled={selectedUsers.length === 0}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Select</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelection(user.id)}
                />
              </td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;

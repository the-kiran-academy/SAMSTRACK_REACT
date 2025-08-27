import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";

function AllUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = () => {
    fetch("http://localhost:8091/user/get-all-user/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDeleteUser = (username) => {
    if (!window.confirm(`Are you sure you want to delete user: ${username}?`)) {
      return;
    }

    fetch(
      `http://localhost:8091/user/delete-user-by-username?username=${username}`,
      {
        method: "DELETE",
      }
    )
      .then(async (res) => {
        if (res.ok) {
          alert("User deleted successfully!");
          fetchUsers();
        } else {
          const errorText = await res.text();
          alert(`Failed to delete user. Reason: ${errorText}`);
        }
      })
      .catch((err) =>
        alert("Error deleting user. Possibly associated with other records.")
      );
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <AdminMenu />
      <h1 className="text-2xl font-bold mb-4 text-center">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border text-center">Username</th>
              <th className="px-4 py-2 border text-center">Password</th>
              <th className="px-4 py-2 border text-center">First Name</th>
              <th className="px-4 py-2 border text-center">Last Name</th>
              <th className="px-4 py-2 border text-center">Email</th>
              <th className="px-4 py-2 border text-center">Role</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 border text-center">
                    {user.username}
                  </td>

                  <td className="px-4 py-2 border text-center">
                    {user.password}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {user.firstName}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {user.lastName}
                  </td>
                  <td className="px-4 py-2 border text-center">{user.email}</td>
                  <td className="px-4 py-2 border text-center">
                    {user.role ? user.role : "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                     onClick={() => navigate(`/update-user/${user.username}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md shadow hover:bg-blue-700 transition cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.username)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md shadow hover:bg-red-700 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUser;

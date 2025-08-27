import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const nevigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    nevigate("/");
  };
  return (
    <div className=" bg-gray-50">
      {/* Admin Menu */}
      <nav className="bg-white shadow flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <div className="text-lg font-bold text-blue-600">SAMSTRACK</div>
        <div className="flex items-center gap-3">
          {/* Dashboard */}
          <a
            href="/admin-dashboard"
            className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
          >
            Dashboard
          </a>
          {/* User Dropdown */}
          <div className="relative">
            <button
              className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition flex items-center gap-1"
              onClick={() => setUserMenuOpen((open) => !open)}
            >
              User
              <span className="ml-1">▼</span>
            </button>
            {userMenuOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <a
                  href="/add-user"
                  className="block px-4 py-2 hover:bg-blue-100 transition"
                >
                  Add User
                </a>
                <a
                  href="/all-users"
                  className="block px-4 py-2 hover:bg-blue-100 transition"
                >
                  All User
                </a>
              </div>
            )}
          </div>

          {/* Subject  */}

          <a
            href="/all-subject"
            className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
          >
            All Subject
          </a>

          {/* View Attendance */}
          <a
            href="/view-attendance"
            className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
          >
            View Attendance
          </a>
        </div>

        {/* Right Corner: MyProfile & Logout */}
        <div className="flex items-center gap-4">
          <a
            href="/my-profile"
            className="font-semibold text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            MyProfile
          </a>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default AdminMenu;

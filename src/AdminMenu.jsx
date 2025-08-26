import { useState } from "react";

function AdminMenu() {
   const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Menu */}
      <nav className="bg-white shadow flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <div className="text-lg font-bold text-blue-600">SAMSTRACK</div>
        <div className="flex items-center gap-3">
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
                <a href="/add-user" className="block px-4 py-2 hover:bg-blue-100 transition">Add User</a>
                <a href="/all-user" className="block px-4 py-2 hover:bg-blue-100 transition">All User</a>
              </div>
            )}
          </div>

          {/* Subject Dropdown */}
          <div className="relative">
            <button
              className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition flex items-center gap-1"
              onClick={() => setSubjectMenuOpen((open) => !open)}
            >
              Subject
              <span className="ml-1">▼</span>
            </button>
            {subjectMenuOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <a href="/add-subject" className="block px-4 py-2 hover:bg-blue-100 transition">Add Subject</a>
                <a href="/all-subject" className="block px-4 py-2 hover:bg-blue-100 transition">All Subject</a>
              </div>
            )}
          </div>

          {/* View Attendance */}
          <a href="/view-attendance" className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition">View Attendance</a>
        </div>

        {/* Right Corner: MyProfile & Logout */}
        <div className="flex items-center gap-4">
          <a href="/my-profile" className="font-semibold text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition">MyProfile</a>
          <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Admin Dashboard</h1>
        {/* ...other dashboard content... */}
      </div>
    </div>
  )
}

export default AdminMenu

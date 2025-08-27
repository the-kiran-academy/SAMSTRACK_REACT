import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import FacultyMenu from "./FacultyMenu";

function ViewAttendance() {

  const role= localStorage.getItem('role');

  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8091/user/get-all-faculty/")
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((err) => console.error("Error fetching faculties:", err));

    fetch("http://localhost:8091/subject/get-all-subjects/")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  const fetchAllAttendance = () => {
    fetch("http://localhost:8091/attendance/get-all-attendance-records/")
      .then((res) => res.json())
      .then((data) => setAttendance(data))
      .catch((err) => console.error("Error fetching all attendance:", err));
  };

  const fetchFilteredAttendance = () => {
    if (!selectedFaculty || !selectedSubject || !selectedDate) {
      alert("Please select Faculty, Subject, and Date!");
      return;
    }
    fetch(
      `http://localhost:8091/attendance/get-attendance/${selectedFaculty}/${selectedSubject}/${selectedDate}`
    )
      .then((res) => res.json())
      .then((data) => setAttendance(data))
      .catch((err) =>
        console.error("Error fetching filtered attendance:", err)
      );
  };

  // Show modal with students (already available in response)
  const handleShowStudents = (studentsList) => {
    setStudents(studentsList);
    setShowModal(true);
  };

  return (
    <>
      {role==='admin'?<AdminMenu />: <FacultyMenu />}

      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center py-8">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
           
           
           <div className="flex flex-col">
        {role === "admin" && (
          <>
            <label className="text-sm font-medium mb-1">Select Faculty</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">Choose Faculty</option>
              {faculties.map((f, i) => (
                <option key={i} value={f.username}>
                  {f.firstName} {f.lastName}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Select Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">Choose Subject</option>
                {subjects.map((s, i) => (
                  <option key={i} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              {role==='admin' && (
                <button
                onClick={fetchAllAttendance}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Show All
              </button>
              )}
              <button
                onClick={fetchFilteredAttendance}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Show
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Faculty</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Number of Students</th>
                  <th className="px-4 py-2">Show Students</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  attendance.map((a, index) => (
                    <tr key={a.id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">
                        {a.user.firstName} {a.user.lastName}
                      </td>
                      <td className="px-4 py-2">{a.subject.name}</td>
                      <td className="px-4 py-2">{a.date}</td>
                      <td className="px-4 py-2">{a.time}</td>
                      <td className="px-4 py-2">{a.numberOfStudents}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleShowStudents(a.students)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                        >
                          Show
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
            onClick={() => setShowModal(false)} // close when clicking outside
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-96"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Student List</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {students.length > 0 ? (
                  students.map((student) => (
                    <span
                      key={student.id}
                      className="px-3 py-1 bg-gray-100 rounded shadow text-sm font-medium"
                    >
                      {student.name}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No students found</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewAttendance;

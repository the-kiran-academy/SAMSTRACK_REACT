import { useEffect, useState } from "react";
import FacultyMenu from "./FacultyMenu";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });

  // Fetch students
  useEffect(() => {
    fetch("http://localhost:8091/student/get-all-students/")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Delete student
  const deleteStudent = (id) => {
    fetch(`http://localhost:8091/student/delete-student/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setStudents(students.filter((s) => s.id !== id));
      })
      .catch((err) => console.error("Error deleting student:", err));
  };

  // Handle edit click
  const startEditing = (student) => {
    setEditingStudent(student.id);
    setFormData({ id: student.id, name: student.name, email: student.email });
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated student
  const updateStudent = () => {
    fetch("http://localhost:8091/student/update-student/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setStudents(
          students.map((s) =>
            s.id === formData.id ? { ...s, ...formData } : s
          )
        );
        setEditingStudent(null);
      })
      .catch((err) => console.error("Error updating student:", err));
  };

  return (
    <>
      <FacultyMenu />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">All Students</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="border px-4 py-2">{student.id}</td>
                <td className="border px-4 py-2">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingStudent === student.id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {editingStudent === student.id ? (
                    <button
                      onClick={updateStudent}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(student)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllStudents;

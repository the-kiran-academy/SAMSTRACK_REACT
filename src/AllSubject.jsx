import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";

function AddSubject() {
  const [subjects, setSubjects] = useState([]);

  // Fetch all subjects
  const fetchSubjects = () => {
    fetch("http://localhost:8091/subject/get-all-subjects/")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error("Error fetching subjects:", err));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add new subject
  const handleAddSubject = () => {
    const subjectName = prompt("Enter Subject Name:");
    if (!subjectName || subjectName.trim() === "") {
      alert("Subject name cannot be empty!");
      return;
    }

    fetch("http://localhost:8091/subject/add-subject/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: subjectName }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Subject added successfully!");
          fetchSubjects();
        } else {
          alert("Failed to add subject.");
        }
      })
      .catch((err) => console.error("Error adding subject:", err));
  };

  // Edit subject
  const handleEditSubject = (id, name) => {
    const newName = prompt("Enter new subject name:", name);
    if (!newName || newName.trim() === "") {
      alert("Subject name cannot be empty!");
      return;
    }

    fetch("http://localhost:8091/subject/update-subject/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, name: newName }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Subject updated successfully!");
          fetchSubjects();
        } else {
          alert("Failed to update subject.");
        }
      })
      .catch((err) => console.error("Error updating subject:", err));
  };

  // Delete subject
  const handleDeleteSubject = (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    fetch(`http://localhost:8091/subject/delete-subject/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("Subject deleted successfully!");
          fetchSubjects();
        } else {
          alert("Failed to delete subject.");
        }
      })
      .catch((err) => console.error("Error deleting subject:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <AdminMenu />
      <div className="flex justify-between items-center m-4">
        <h1 className="text-2xl font-bold">All Subjects</h1>
        <button
          onClick={handleAddSubject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Subject
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-4 py-2 border text-center align-middle">#</th>
              <th className="px-4 py-2 border text-center align-middle">ID</th>
              <th className="px-4 py-2 border text-center align-middle">
                Subject Name
              </th>
              <th className="px-4 py-2 border text-center align-middle">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <tr
                  key={subject.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 border text-center align-middle">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border text-center align-middle">
                    {subject.id}
                  </td>
                  <td className="px-4 py-2 border text-center align-middle">
                    {subject.name}
                  </td>
                  <td className="px-4 py-2 border text-center align-middle space-x-2">
                    <button
                      onClick={() =>
                        handleEditSubject(subject.id, subject.name)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded-md shadow hover:bg-blue-700 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md shadow hover:bg-red-700 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddSubject;

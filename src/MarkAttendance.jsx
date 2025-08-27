import { useEffect, useState } from "react";
import FacultyMenu from "./FacultyMenu";

function MarkAttendance() {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [attendance, setAttendance] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const username = localStorage.getItem("username"); // logged in user

  // Fetch subjects
  useEffect(() => {
    fetch("http://localhost:8091/subject/get-all-subjects/")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch students
  useEffect(() => {
    fetch("http://localhost:8091/student/get-all-students/")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        const initialAttendance = {};
        data.forEach((stu) => {
          initialAttendance[stu.id] = false;
        });
        setAttendance(initialAttendance);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle select all
  const handleSelectAll = () => {
    const newStatus = !selectAll;
    const updated = {};
    students.forEach((stu) => {
      updated[stu.id] = newStatus;
    });
    setAttendance(updated);
    setSelectAll(newStatus);
  };

  // Handle individual checkbox
  const handleCheckboxChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Submit attendance with validation
  const handleSubmit = async () => {
    // Validation: check all fields
    if (!selectedSubject || !date || !time) {
      alert("Please fill all fields: Subject, Date, and Time.");
      return;
    }
    // Validation: at least one student selected
    const selectedStudents = students
      .filter((stu) => attendance[stu.id])
      .map((stu) => ({ id: stu.id }));
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    const payload = {
      username: username,
      subjectId: Number(selectedSubject),
      date: date,
      time: time,
      students: selectedStudents,
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await fetch("http://localhost:8091/attendance/take-attendance/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Attendance marked successfully!");
      } else {
        alert("Failed to mark attendance");
      }
    } catch (err) {
      console.error(err);
      alert("Error while marking attendance");
    }
  };

  return (
    <>
      <FacultyMenu />

      <div className="p-6 max-w-5xl mx-auto">
        {/* First Row: Subject, Date, Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="border p-2 rounded w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-2 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="border p-2 rounded w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Second Row: Students List */}
        <div className="border rounded p-4 shadow bg-white">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label className="font-semibold">Select / Deselect All</label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {students.map((stu) => (
              <div
                key={stu.id}
                className="flex items-center border rounded p-2 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={attendance[stu.id] || false}
                  onChange={() => handleCheckboxChange(stu.id)}
                  className="mr-2"
                />
                <span>{stu.id} - {stu.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </>
  );
}

export default MarkAttendance;

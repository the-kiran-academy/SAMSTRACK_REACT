import { Route, Routes } from "react-router-dom";
import AddStudent from "./AddStudent";
import AddUser from "./AddUser";
import AdminDashboard from "./AdminDashboard";
import AllStudents from "./AllStudents";
import AllSubject from "./AllSubject";
import AllUser from "./AllUser";
import "./App.css";
import FacultyDashboard from "./FacultyDashboard";
import Footer from "./Footer";
import Login from "./Login";
import MarkAttendance from "./MarkAttendance";
import Profile from "./Profile";
import UpdateUser from "./UpdateUser";
import ViewAttendance from "./ViewAttendance";
import Welcome from "./Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

        <Route path="/add-user" element={<AddUser />} />
        <Route path="/all-users" element={<AllUser />} />
        <Route path="/update-user/:username" element={<UpdateUser />} />
        <Route path="/all-subject" element={<AllSubject />} />

        <Route path="/my-profile" element={<Profile />} />

        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/all-students" element={<AllStudents />} />

        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

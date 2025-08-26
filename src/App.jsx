import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import './App.css'
import FacultyDashboard from './FacultyDashboard'
import Footer from './Footer'
import Login from './Login'
import Welcome from './Welcome'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App

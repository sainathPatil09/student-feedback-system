// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminSignup from './pages/AdminSignup.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import StudentLogin from './pages/StudentLogin.jsx'
import FacultyLogin from './pages/FacultyLogin.jsx'
import StudentPannel from './components/StudentPannel.jsx'
import { useAuth } from './context/AuthProvider.jsx'
import CoordinatorLogin from './pages/CoordinatorLogin.jsx'

function App() {
  const{authUser} = useAuth()

  return (
    <>
     {/* <Home/> */}
    {/* <AdminSignup/> */}
    
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/admin-signup' element={<AdminSignup/>}/>
      <Route path='/admin-login' element={<AdminLogin/>}/>
      <Route path='/student-login' element={<StudentLogin/>}/>
      <Route path='/faculty-login' element={<FacultyLogin/>}/>
      <Route path='/coordinator-login' element={<CoordinatorLogin/>}/>
      <Route path='/student-pannel' element={authUser ? <StudentPannel/> : <Navigate to={'/'}/>}/>
    </Routes>
    </>
  )
}

export default App

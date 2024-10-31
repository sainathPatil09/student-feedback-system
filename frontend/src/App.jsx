// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminSignup from './pages/AdminSignup.jsx'
import { Route, Routes } from 'react-router-dom'
import StudentLogin from './pages/StudentLogin.jsx'

function App() {

  return (
    <>
     {/* <Home/> */}
    {/* <AdminSignup/> */}
    
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/admin-signup' element={<AdminSignup/>}/>
      <Route path='/admin-login' element={<AdminLogin/>}/>
      <Route path='/student-login' element={<StudentLogin/>}/>
    </Routes>
    </>
  )
}

export default App

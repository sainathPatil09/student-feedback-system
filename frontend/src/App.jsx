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
import CoordinatorPannel from './components/CoordinatorPannel.jsx'
import FacultyAssign from './components/FacultyAssign.jsx'
import StudentAdd from './components/StudentAdd.jsx'
import AllStudents from './components/AllStudents.jsx'
import AllFaculty from './components/AllFaculty.jsx'
import ImportStudent from './components/ImportStudent.jsx'
import AdminPannel from './components/AdminPannel.jsx'
import Feedbacks from './components/Feedbacks.jsx'
import PDF from './components/PDF.jsx'
import { FeedbackProvider } from './context/FeedbackProvider.jsx'
import Verify from './pages/Verify.jsx'
import AddSubject from './coordinator/AddSubject.jsx'
import AddCourse from './coordinator/AddCourse.jsx'
import RegisterStudent from './student/RegisterStudent.jsx'
import RegisterFaculty from './faculty/RegisterFaculty.jsx'
import LoginFaculty from './faculty/LoginFaculty.jsx'
import FacultyMapping from './coordinator/FacultyMapping.jsx'
import LoginStudent from './student/LoginStudent.jsx'
import PannelStudent from './student/PannelStudent.jsx'
import PannelFaculty from './faculty/PannelFaculty.jsx'

function App() {
  const{authUser, loading, isAuthenticated} = useAuth()
  console.log(authUser)
  console.log(loading)

  if(loading) return (
    <>........
    </>
  )

  return (
    <>
     {/* <Home/> */}
    {/* <AdminSignup/> */}
    <FeedbackProvider>

    
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/admin-signup' element={<AdminSignup/>}/>
      <Route path='/admin-login' element={<AdminLogin/>}/>
      <Route path='/student-login' element={<StudentLogin/>}/>
      <Route path='/faculty-login' element={<FacultyLogin/>}/>
      <Route path='/verifyOTP' element={<Verify/>}/>
      <Route path='/coordinator-login' element={<CoordinatorLogin/>}/>
      <Route path='/admin-pannel' element={isAuthenticated && authUser.role === "Admin" ? <AdminPannel/> : <Navigate to='/'/> }/>
      <Route path='/view-feedback' element={isAuthenticated && authUser.role === "Admin" ? <Feedbacks/> : <Navigate to='/'/> }/>
      <Route path='/pdf' element={isAuthenticated && authUser.role === "Admin" ? <PDF/> : <Navigate to='/'/> }/>
      <Route path='/assignFaculty' element={isAuthenticated && authUser.role === "Coordinator" ? <FacultyAssign/> : <Navigate to='/'/>}/>
      <Route path='/addStudent' element={isAuthenticated && authUser.role === "Coordinator" ? <StudentAdd/> : <Navigate to='/'/>}/>
      <Route path='/importStudent' element={isAuthenticated && authUser.role === "Coordinator" ? <ImportStudent/> : <Navigate to='/'/>}/>
      <Route path='/all-student' element={isAuthenticated && authUser.role === "Coordinator" ? <AllStudents/> : <Navigate to='/'/>}/>
      <Route path='/all-faculty' element={isAuthenticated && authUser.role === "Coordinator" ? <AllFaculty/> : <Navigate to='/'/>}/>
      <Route path='/student-pannel' element={isAuthenticated && authUser.role === "Student" ? <StudentPannel /> : <Navigate to='/'/> }/>
      <Route path='/coordinator-pannel' element={isAuthenticated && authUser.role === "Coordinator" ? <CoordinatorPannel/> : <Navigate to='/'/>}/>
      {/* <Route path='/student-pannel' element={(<StudentPannel />)}/> */}

      {/* ======================= */}

      <Route path='/add-subject' element={isAuthenticated && authUser.role === "Coordinator" ? <AddSubject/> : <Navigate to='/'/>}/>
      <Route path='/add-course' element={isAuthenticated && authUser.role === "Coordinator" ? <AddCourse/> : <Navigate to='/'/>}/>
      <Route path='/register-student' element={<RegisterStudent/>}/>
      <Route path='/login-student' element={<LoginStudent/>}/>
      <Route path='/register-faculty' element={<RegisterFaculty/>}/>
      <Route path='/login-faculty' element={<LoginFaculty/>}/>
      <Route path='/map-faculty' element={isAuthenticated && authUser.role === "Coordinator" ? <FacultyMapping/> : <Navigate to='/'/>}/>
      <Route path='/pannel-student' element={isAuthenticated && authUser.role === "Student" ? <PannelStudent /> : <Navigate to='/'/> }/>
      <Route path='/pannel-faculty' element={isAuthenticated && authUser.role === "Faculty" ? <PannelFaculty /> : <Navigate to='/'/> }/>
    </Routes>
    </FeedbackProvider>
    </>
  )
}

export default App

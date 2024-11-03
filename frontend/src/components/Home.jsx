import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to={'/admin-login'} className='border-2 p-2'>Admin Login</Link>
      <Link to={'/coordinator-login'} className='border-2 p-2'>Coordinator Login</Link>
      <Link to={'/faculty-login'} className='border-2 p-2'>Faculty Login</Link>
      <Link to={'/student-login'} className='border-2 p-2'>Student Login</Link>
    </div>
  )
}

export default Home

import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const CoordinatorPannel = () => {
    const{authUser} = useAuth()
    console.log(authUser)
  return (
    <div>
      <Link to={'/assignFaculty'} className='border-2 p-2'>Assign Faculty</Link>
      <Link to={'/addStudent'} className='border-2 p-2'>Add Student</Link>
    </div>
  )
}

export default CoordinatorPannel

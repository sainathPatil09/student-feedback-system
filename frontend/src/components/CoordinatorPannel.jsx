import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CoordinatorPannel = () => {
    const{authUser} = useAuth()
    console.log(authUser)
    const [key, setKey] = useState("")

    const handleClick=async(e)=>{
      e.preventDefault();
      const response =await axios.post('/api/generate-key')
      console.log(response.data);
      setKey(response.data.studentAccessKey);
    }
    console.log(key)
  return (
    <div>
      <Link to={'/assignFaculty'} className='border-2 p-2'>Assign Faculty</Link>
      <Link to={'/addStudent'} className='border-2 p-2'>Add Student</Link>
      <button onClick={handleClick}>Generate Key</button>
    </div>
  )
}

export default CoordinatorPannel

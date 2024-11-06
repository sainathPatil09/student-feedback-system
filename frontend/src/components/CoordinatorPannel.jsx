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
      alert("Key generated")
    }

    const handleFeedbackStatus=async(e)=>{
      e.preventDefault();
      const response =await axios.put('/api/resetFeedbackStatus');
      console.log(response)
      alert("Feedback Status updated successfully")

    }
    console.log(key)
  return (
    <div>
      <Link to={'/assignFaculty'} className='border-2 p-2'>Assign Faculty</Link>
      <Link to={'/addStudent'} className='border-2 p-2'>Add Student</Link>
      <button className='border-2 p-2' onClick={handleClick}>Generate Key</button>
      <button className='border-2 p-2' onClick={handleFeedbackStatus}>Update Feedback Status</button>
    </div>
  )
}

export default CoordinatorPannel

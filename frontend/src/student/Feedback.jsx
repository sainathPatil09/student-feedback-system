import React from 'react'
import { useAuth } from '../context/AuthProvider'

const Feedback = () => {
  const{studentProfile} = useAuth()
  console.log(studentProfile)
  return (
    <div>
      give feedback
    </div>
  )
}

export default Feedback

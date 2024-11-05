import React from 'react'
import { useAuth } from '../context/AuthProvider'

const CoordinatorPannel = () => {
    const{authUser} = useAuth()
    console.log(authUser)
  return (
    <div>
      this is coordinator pannel
    </div>
  )
}

export default CoordinatorPannel

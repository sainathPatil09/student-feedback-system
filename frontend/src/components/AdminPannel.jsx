import React from 'react'
import { Link } from 'react-router-dom'

const AdminPannel = () => {
  return (
    <div>
      <Link to={'/view-feedback'} className='border-2 p-2'>view Feedback</Link>
    </div>
  )
}

export default AdminPannel

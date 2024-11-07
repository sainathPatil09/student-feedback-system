import React from 'react'
import { useFeedback } from '../context/FeedbackProvider'
import Table from './Table'

const PDF = () => {
    const{feedback} = useFeedback()
    console.log(feedback)
  return (
    <>
        <div>
            <header>
                <img src="" alt="" />
            </header>
            <h1>content</h1>
            <h2>semester: 5 C</h2>

            <Table feedback={feedback}/>
        </div>
    </>
  )
}

export default PDF

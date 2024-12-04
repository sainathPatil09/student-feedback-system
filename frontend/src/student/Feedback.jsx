import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'

const Feedback = () => {
  const{studentProfile} = useAuth()
  console.log(studentProfile)

  const [facultyMappings, setFacultyMappings] = useState([]);
  // const [selectedFaculty, setSelectedFaculty] = useState("");
  // const [selectedSubject, setSelectedSubject] = useState("");
  // const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchFacultyMappings = async () => {
      try {
        const response = await axios.post("/api/get-faculty-mappings", {
          branch: studentProfile.branch,
          sem: studentProfile.sem,
          div: studentProfile.div,
          coreSubjects: studentProfile.coreSubjects,
          electiveSubjects: studentProfile.electiveSubjects,
        });
        setFacultyMappings(response.data.facultyMappings);
        console.log(facultyMappings, 'facultyMappings')
      } catch (error) {
        console.error("Error fetching faculty mappings:", error);
      }
    };

    fetchFacultyMappings();
  }, []);
  return (
    <div className='flex flex-col'>
      give feedback
      {facultyMappings.map((faculty)=>{
        return <p className='flex'>{faculty.facultyId} subject: {faculty.subject}</p>
      })}
    </div>
  )
}

export default Feedback

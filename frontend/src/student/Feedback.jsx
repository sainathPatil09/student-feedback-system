import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'

const questions = [
  'Syllabus coverage',
  'Clarity in Teaching',
  'Punctuality',
  'Handling class full time',
  'Interaction with students',
  'Notes shared with students'
];

const options = ['Very good', 'Good', 'Medium', 'Poor'];

const Feedback = () => {
  const{studentProfile} = useAuth()
  console.log(studentProfile)

  const [facultyMappings, setFacultyMappings] = useState([]);
  const [responses, setResponses] = useState({});
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
  }, [studentProfile]);
  console.log(facultyMappings, 'facultyMappings')

  const handleResponseChange = (facultyIndex, questionIndex, option) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [facultyIndex]: {
        ...prevResponses[facultyIndex],
        [questionIndex]: option,
      },
    }));
  };


  const handleSubmit = async(e)=>{
    e.preventDefault();
    // Submit responses or process them as needed
    const feedbackData = facultyMappings.map((faculty, facultyIndex) => ({
      facultyId: faculty._id,
      responses: Object.keys(responses[facultyIndex] || {}).map(questionIndex => ({
        question: questions[questionIndex],
        rating: responses[facultyIndex][questionIndex],
      }))
    }));
    console.log('Feedback submitted:', responses);
    console.log(feedbackData);

    try {
      const response = await axios.post('/api/feedback', {
        studentId: studentProfile.id,
        feedback: feedbackData,
        feedbackDate: new Date().toISOString()
      });
      console.log(response)
  
      if (response.status === 200) {
        alert("Feedback submitted successfully")
        console.log("Feedback submitted successfully", response.data);
        window.location.reload()
      }
      else if(response.status === 202){
        window.location.reload()
        alert("Feedback already submitted successfully")

      } else {
        console.error("Error submitting feedback:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
    }
  }

  return (
    <div className='flex flex-col'>
      give feedback
      {/* {facultyMappings.map((faculty)=>{
        return <p className='flex'>{faculty.facultyId} subject: {faculty.subject}</p>
      })} */}
  <form action="" onSubmit={handleSubmit} >

 
{facultyMappings.map((curFaculty, facultyIndex) => (
        <div className="border-2 bg-gradient-to-r from-amber-300 to-violet-400  border-red-400 mb-5 p-5 rounded-xl w-1/2 mx-auto" key={facultyIndex}>
          <p>{curFaculty.subject}</p>
          <p>{curFaculty.facultyId}</p>
          <table className=" w-full">
            <thead>
              <tr>
                <th>Questions</th>
                {options.map((option, index) => (
                  <th key={index}>{option}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((question, questionIndex) => (
                <tr key={questionIndex}>
                  <td >{question}</td>
                  {options.map((option, optionIndex) => (
                    <td className="text-center" key={optionIndex}>
                      <input
                      className="w-4 h-4"
                        type="radio"
                        name={`faculty-${facultyIndex}-question-${questionIndex}`}
                        value={option}
                        checked={
                          responses[facultyIndex]?.[questionIndex] === option
                        }
                        onChange={() =>
                          handleResponseChange(facultyIndex, questionIndex, option)
                        }
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button type="submit" className='bg-blue-400 p-2 rounded-lg'>Submit Feedback</button>
      </form>
    </div>
    
  )
}

export default Feedback

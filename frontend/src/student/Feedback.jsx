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


  const handleResponseChange = (facultyIndex, questionIndex, option) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [facultyIndex]: {
        ...prevResponses[facultyIndex],
        [questionIndex]: option,
      },
    }));
  };

  return (
    <div className='flex flex-col'>
      give feedback
      {/* {facultyMappings.map((faculty)=>{
        return <p className='flex'>{faculty.facultyId} subject: {faculty.subject}</p>
      })} */}

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
    </div>
  )
}

export default Feedback

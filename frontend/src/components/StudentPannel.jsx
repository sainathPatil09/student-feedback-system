import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const questions = [
  'Syllabus coverage',
  'Clarity in Teaching',
  'Punctuality',
  'Handling class full time',
  'Interaction with students',
  'Notes shared with students'
];

const options = ['Very good', 'Good', 'Medium', 'Poor'];

const StudentPannel = () => {
  const [dataSC, setDataSC] = useState(0);
  const [dataCT, setDataCT] = useState(0);
  const [dataP, setDataP] = useState(0);
  const [dataHC, setDataHC] = useState(0);
  const [dataIS, setDataIS] = useState(0);
  const [dataN, setDataN] = useState(0);

  const {authUser} = useAuth()
  // console.log(authUser)
  const [facultyList, setFacultyList] = useState([])


  useEffect(() => {
    const fetchFaculty = async () => {
        if (authUser?.id) {
            const response = await fetch(`/api/faculty-assigned/${authUser.id}`);
            const data = await response.json();
            setFacultyList(data.faculty)
            console.log("Assigned Faculty:", data.faculty);
        }
    };
    fetchFaculty();
}, [authUser]);
 


  const [responses, setResponses] = useState({});


  const handleSubmit =async (e) => {
    e.preventDefault();
    // Submit responses or process them as needed
    const feedbackData = facultyList.map((faculty, facultyIndex) => ({
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
        studentId: authUser.id,
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
  };


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

    <form onSubmit={handleSubmit} className="feedback-form">
      {facultyList.map((curFaculty, facultyIndex) => (
        <div className="border-2 bg-gradient-to-r from-amber-300 to-violet-400  border-red-400 mb-5 p-5 rounded-xl w-1/2 mx-auto" key={facultyIndex}>
          <h2>{curFaculty.subject}</h2>
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
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default StudentPannel;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

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
  const [facultyList, setFacultyList] = useState([])


  useEffect(() => {
    const fetchFaculty = async () => {
        if (authUser?.userId) {
            const response = await fetch(`/api/faculty-assigned/${authUser.userId}`);
            const data = await response.json();
            setFacultyList(data.faculty)
            console.log("Assigned Faculty:", data.faculty);
        }
    };
    fetchFaculty();
}, [authUser]);
 


  const [responses, setResponses] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit responses or process them as needed
    console.log('Feedback submitted:', responses);
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

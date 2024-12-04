import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PannelStudent = () => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
  const { authUser, studentProfile } = useAuth();
  console.log(studentProfile);
  const [studentId, setStudentId] = useState("");
  // const[profile, setProfile] = useState("")

  const [showWindow, setShowWindow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleWindow = () => {
    setShowWindow(!showWindow);
  };
  const handleProfileView = () => {
    setShowProfile(!showProfile);
  };

  const handleKeyValidation = async () => {
    try {
      console.log(key);
      const { data } = await axios.post("api/validate-Key", { key });

      if (data && !studentProfile?.feedbackGiven) {
        navigateTo("/give-feedback");
      } else {
        setError("Invalid key or feedback already given. Please try again.");
      }
    } catch (error) {
      console.error("Error in validating key:", error);
      alert("Failed to validate key.");
    }
  };

  // const getProfile = async (e) => {
  //   e.preventDefault()
  //   try {
  //     setStudentId(authUser.id)
  //     console.log(studentId)
  //     const response = await axios.get(`/api/student-profile/${studentId}`);
  //     console.log(response.data.student)
  //     setStudentProfile(response.data.student)
  //     console.log(studentProfile)
  //   } catch (error) {
  //     console.log("Error fetching profile:", error)

  //   }
  // };
  return (
    <>
      <button onClick={handleProfileView} className="border-2 p-2 bg-blue-400">
        My-Profile
      </button>
      <button onClick={handleWindow} className="border-2 p-2 bg-blue-400">
        Give-Feedback
      </button>

      <div
        className={`p-4 w-80 mx-auto align-middle border-2 ${
          showWindow ? "block" : "hidden"
        }`}
      >
        <h1 className="text-xl font-bold mb-4">Enter Feedback Key</h1>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your key"
          className="border-2 p-2 w-full mb-4"
        />
        <button
          onClick={handleKeyValidation}
          className="bg-blue-400 text-white p-2 rounded"
        >
          Submit Key
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className={`${showProfile ? "block" : "hidden"}`}>
        <p>name: {studentProfile?.name}</p>
        <p>email: {studentProfile?.email}</p>
        <p>usn: {studentProfile?.usn}</p>
        <p>branch: {studentProfile?.branch}</p>
        <p>sem: {studentProfile?.sem}</p>
        <p>div: {studentProfile?.div}</p>
        <p>
          CoreSubject:{" "}
          {studentProfile?.coreSubjects.map((s) => {
            return s.subjectName + ", ";
          })}
        </p>
        <p>
          CoreSubject:{" "}
          {studentProfile?.electiveSubjects.map((s) => {
            return s.subjectName + ", ";
          })}
        </p>
      </div>
    </>
  );
};

export default PannelStudent;

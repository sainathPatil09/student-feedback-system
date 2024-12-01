import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PannelStudent = () => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const [showWindow, setShowWindow] = useState(false);

  const handleWindow = () => {
    setShowWindow(!showWindow);
  };

  const handleKeyValidation = async () => {
    try {
      console.log(key);
      const { data } = await axios.post("api/validate-Key", { key });

      if (data) {
        navigateTo("/give-feedback");
      } else {
        setError("Invalid key. Please try again.");
      }
    } catch (error) {
      console.error("Error in validating key:", error);
      alert("Failed to validate key.");
    }
  };
  return (
    <>
      <Link to={"/"} className="border-2 p-2 bg-blue-400">
        My-Profile
      </Link>
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
    </>
  );
};

export default PannelStudent;

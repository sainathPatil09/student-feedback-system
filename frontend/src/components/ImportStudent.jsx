import React, { useState } from "react";
import axios from "axios";

const ImportStudent = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);
    console.log(formData)

    try {
      const response = await axios.post("/api/importStudent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message) {
        alert(response.data.message)
        setMessage(response.data.message);
      } else {
          setMessage("Students imported successfully!");
          alert("Students imported successfully!")
      }
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file. Please try again.");
    }
  };
  return (
    <div className="student-import">
      {/* <form onSubmit={handleSubmit}>
        <div>
        <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
        </form> */}

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
        Import Student Data
        </h2>
      </div>
      {/* <h2></h2> */}
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} method="POST" className="space-y-2">
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium leading-6 "
            >
              select file
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept=".csv, .xlsx"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              required
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImportStudent;

import axios from "axios";
import React, { useState } from "react";

const AddSubject = () => {
  const [scheme, setScheme] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [branch, setBranch] = useState("");
  const [sem, setSem] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [credits, setCredits] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addSubject", {
        scheme,
        subjectName,
        subjectCode,
        branch,
        sem,
        subjectType,
        credits,
      });

      console.log(response);
      setScheme("")
      setSubjectName("");
      setSubjectCode("");
      setBranch("");
      setSem("");
      setSubjectType("");
      setCredits("");

      alert("Subject added successfully");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  return (
    <div className="shadow-xl border md:w-[30%] mx-auto mt-10">
      <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
            Add Subject
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            {/* scheme */}
            <div>
              <label
                htmlFor="scheme"
                className="block text-sm font-medium leading-6 "
              >
                Scheme
              </label>
              <div className="mt-2">
                <select
                  name=""
                  required
                  id=""
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                >
                  <option value="">Select</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
            {/* subject name */}
            <div>
              <label
                htmlFor="Subject Name"
                className="block text-sm font-medium leading-6 "
              >
                Subject Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </div>
            </div>

            {/* subject code */}
            <div>
              <label
                htmlFor="subject code"
                className="block text-sm font-medium leading-6 "
              >
                Subject code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                />
              </div>
            </div>

            {/* branch */}
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium leading-6 "
              >
                Branch
              </label>
              <div className="mt-2">
                <select
                  name=""
                  required
                  id=""
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                >
                  <option value="">Select</option>
                  <option value="CSE">CSE</option>
                  <option value="AIDS">AIDS</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
            </div>

            {/* sem */}
            <div>
              <label
                htmlFor="sem"
                className="block text-sm font-medium leading-6 "
              >
                Sem
              </label>
              <div className="mt-2">
                <select
                  name=""
                  required
                  id=""
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                >
                  <option value="">Select</option>
                  <option value="phy">PHY</option>
                  <option value="chy">CHY</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>

            {/* subject type */}
            <div>
              <label
                htmlFor="subject type"
                className="block text-sm font-medium leading-6 "
              >
                Subject Type
              </label>
              <div className="mt-2">
                <select
                  name=""
                  required
                  id=""
                  value={subjectType}
                  onChange={(e) => setSubjectType(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                >
                  <option value="">Select</option>
                  <option value="Core">Core</option>
                  <option value="Elective">Elective</option>
                  <option value="Lab">Lab</option>
                </select>
              </div>
            </div>

            {/* credit points */}
            <div>
              <label
                htmlFor="credit point"
                className="block text-sm font-medium leading-6 "
              >
                Credit Point
              </label>
              <div className="mt-2">
                <input
                  type="Number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                required
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;

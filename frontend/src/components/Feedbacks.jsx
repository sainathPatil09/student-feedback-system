import axios from "axios";
import React, { useState } from "react";

const Feedbacks = () => {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [div, setDiv] = useState("");

  const [feedback, setFeedback] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/getFeedback", {
        branch,
        year,
        div,
      });

      console.log(data);
    //   setFeedback(data.student);
      setBranch("");
      setDiv("");
      setYear("");
    } catch (error) {
      alert("error in viewFeedback");
      console.log(error);
    }
    // console.log(student);
  };

  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} method="POST" className="space-y-3">
        <div className="flex justify-between w-full gap-3 ">
          {/* branch */}
          <div className="w-full">
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
                <option value="select">select</option>
                <option value="CSE">CSE</option>
                <option value="AIDS">AIDS</option>
                <option value="ECE">ECE</option>
              </select>
            </div>
          </div>

          {/* studentYear */}
          <div className="w-full">
            <label
              htmlFor="Year"
              className="block text-sm font-medium leading-6 w-1/2 "
            >
              Year
            </label>
            <div className="mt-2 w-full">
              <input
                type="text"
                required
                className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          {/* studentDiv */}
          <div className="w-full">
            <label
              htmlFor="branch"
              className="block text-sm font-medium leading-6 "
            >
              Division
            </label>
            <div className="mt-2 w-full">
              <input
                type="text"
                required
                className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                value={div}
                onChange={(e) => setDiv(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            required
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            view Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedbacks;

import axios from "axios";
import React, { useState } from "react";

const Feedbacks = () => {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [div, setDiv] = useState("");

  const [feedback, setFeedback] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/getFeedback", {
        branch,
        year,
        div,
      });

      setFeedback(data);
      console.log(data);
      console.log(feedback[0].averageRatings[0].averageRating);
      setBranch("");
      setDiv("");
      setYear("");
    } catch (error) {
      alert("error in viewFeedback");
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-5 mb-10 space-y-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
            View Feedback
          </h2>
        </div>
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-bold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              view Feedback
            </button>
          </div>
        </form>
      </div>

      <table className="table-auto  border-collapse mx-auto w-3/4">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              Subject
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              A
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              B
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              C
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              D
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              E
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              F
            </th>
            <th className="px-4 py-2 text-left font-bold text-gray-700">
              Avg.
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">{feedback[0].facultyName}</td>
            <td className="px-4 py-2">Quality Control Specialist</td>
            <td className="px-4 py-2">Blue</td>
          </tr> */}

          {feedback.map((feed) => {
            console.log(feed.averageRatings[0].averageRating);
            return (
              <tr key={feed.facultyId} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2">{feed.facultyName}</td>
                <td className="px-4 py-2">{feed.subject}</td>
                <td className="px-4 py-2">
                  {feed.averageRatings[0].averageRating}
                </td>
                <td className="px-4 py-2">
                  {feed.averageRatings[1].averageRating}
                </td>
                <td className="px-4 py-2">
                  {feed.averageRatings[2].averageRating}
                </td>
                <td className="px-4 py-2">
                  {feed.averageRatings[3].averageRating}
                </td>
                <td className="px-4 py-2">
                  {feed.averageRatings[4].averageRating}
                </td>
                <td className="px-4 py-2">
                  {feed.averageRatings[5].averageRating}
                </td>
              </tr>
            );
          })}

          {/* <tr className="bg-gray-50 hover:bg-gray-100">
            <td className="px-4 py-2">2</td>
            <td className="px-4 py-2">Hart Hagerty</td>
            <td className="px-4 py-2">hee</td>
            <td className="px-4 py-2">Purple</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr>
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Brice Swyre</td>
            <td className="px-4 py-2">Software Engineer</td>
            <td className="px-4 py-2">Yellow</td>
          </tr> */}
        </tbody>
      </table>

      <div className="flex w-1/2 mx-auto  justify-center gap-10 mt-5">
        <div>
          <p> <span className="font-bold"> A:</span> Syllabus Coverage </p>
          <p> <span className="font-bold"> B:</span> Clarity in Teaching </p>
          <p> <span className="font-bold"> C:</span> Punctuality </p>
        </div>
        <div>
          <p> <span className="font-bold"> D:</span> Handling class full time </p>
          <p> <span className="font-bold"> E:</span> Interaction with Students</p>
          <p> <span className="font-bold"> F:</span> Notes and videos shared with Students</p>
        </div>
      </div>
    </>
  );
};

export default Feedbacks;

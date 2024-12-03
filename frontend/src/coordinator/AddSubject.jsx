import React, { useState } from "react";
import axios from "axios";

const AddSubject = () => {
  const [scheme, setScheme] = useState("");
  const [branch, setBranch] = useState("");
  const [sem, setSem] = useState("");
  const [courseExists, setCourseExists] = useState(null); // null: not checked, true/false: result
  const [totalSubjects, setTotalSubjects] = useState("");
  const [subjectDetails, setSubjectDetails] = useState({
    subjectName: "",
    subjectCode: "",
    subjectType: "",
    credits: "",
  });

  // Check if course exists
  const checkCourse = async () => {
    try {
      const response = await axios.get(`/api/checkCourse`, {
        params: { scheme, branch, sem },
      });
      console.log(response.data.exists);
      setCourseExists(response.data.exists); // true if course exists
    } catch (error) {
      console.error("Error checking course:", error);
      alert("Failed to check course. Try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(courseExists);
      console.log(totalSubjects);
      const payload = {
        scheme,
        branch,
        sem,
        totalSubjects: !courseExists ? totalSubjects : undefined, // Send if course is new
        ...subjectDetails,
      };
      console.log(payload);
      await axios.post(`/api/addSubject`, payload);

      alert("Subject added successfully!");
      // Reset form
      setScheme("");
      setBranch("");
      setSem("");
      setTotalSubjects("");
      setSubjectDetails({
        subjectName: "",
        subjectCode: "",
        subjectType: "",
        credits: "",
      });
      setCourseExists(null);
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Failed to add subject. Try again.");
    }
  };

  return (
    // <div>
    //   <h1>Add Subject</h1>
    //   <form className="flex flex-col" onSubmit={handleSubmit}>
    //     {/* Scheme, Branch, Semester */}
    //     <label>
    //       Scheme:
    //       <input
    //         type="text"
    //         value={scheme}
    //         onChange={(e) => setScheme(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <label>
    //       Branch:
    //       <input
    //         type="text"
    //         value={branch}
    //         onChange={(e) => setBranch(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <label>
    //       Semester:
    //       <input
    //         type="number"
    //         value={sem}
    //         onChange={(e) => setSem(e.target.value)}
    //         required
    //       />
    //     </label>

    //     <button type="button" onClick={checkCourse}>
    //       Check Course
    //     </button>

    //     {/* Conditionally render totalSubjects field */}
    //     {courseExists === false && (
    //       <label>
    //         Total Subjects (if course is new):
    //         <input
    //           type="number"
    //           value={totalSubjects}
    //           onChange={(e) => setTotalSubjects(e.target.value)}
    //           required
    //         />
    //       </label>
    //     )}

    //     {/* Subject Details */}
    //     {courseExists !== null && (
    //       <>
    //         <label>
    //           Subject Name:
    //           <input
    //             type="text"
    //             value={subjectDetails.subjectName}
    //             onChange={(e) =>
    //               setSubjectDetails({ ...subjectDetails, subjectName: e.target.value })
    //             }
    //             required
    //           />
    //         </label>
    //         <label>
    //           Subject Code:
    //           <input
    //             type="text"
    //             value={subjectDetails.subjectCode}
    //             onChange={(e) =>
    //               setSubjectDetails({ ...subjectDetails, subjectCode: e.target.value })
    //             }
    //             required
    //           />
    //         </label>
    //         <label>
    //           Subject Type (Core/Elective):
    //           <input
    //             type="text"
    //             value={subjectDetails.subjectType}
    //             onChange={(e) =>
    //               setSubjectDetails({ ...subjectDetails, subjectType: e.target.value })
    //             }
    //             required
    //           />
    //         </label>
    //         <label>
    //           Credits:
    //           <input
    //             type="number"
    //             value={subjectDetails.credits}
    //             onChange={(e) =>
    //               setSubjectDetails({ ...subjectDetails, credits: e.target.value })
    //             }
    //             required
    //           />
    //         </label>
    //       </>
    //     )}

    //     <button type="submit" disabled={courseExists === null}>
    //       Submit
    //     </button>
    //   </form>
    // </div>

    <>
      <div className="shadow-xl border md:w-[30%] mx-auto mt-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
//             alt="Your Company"
//             src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
//             className="mx-auto h-10 w-auto"
//           /> */}
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

              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="button"
                onClick={checkCourse}
              >
                Check Course
              </button>

              {/* Conditionally render totalSubjects field */}
              {courseExists === false && (
                <>
                  {/* Total Subjects */}
                  <div>
                    <label
                      htmlFor="Subject Name"
                      className="block text-sm font-medium leading-6 "
                    >
                      Total Subjects (if course is new):
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                        onChange={(e) => setTotalSubjects(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Subject Details */}
              {courseExists !== null && (
                <>
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
                        value={subjectDetails.subjectName}
                        onChange={(e) =>
                          setSubjectDetails({
                            ...subjectDetails,
                            subjectName: e.target.value,
                          })
                        }
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
                        value={subjectDetails.subjectCode}
                        onChange={(e) =>
                          setSubjectDetails({
                            ...subjectDetails,
                            subjectCode: e.target.value,
                          })
                        }
                      />
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
                        value={subjectDetails.subjectType}
                        onChange={(e) =>
                          setSubjectDetails({
                            ...subjectDetails,
                            subjectType: e.target.value,
                          })
                        }
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
                        value={subjectDetails.credits}
                        onChange={(e) =>
                          setSubjectDetails({
                            ...subjectDetails,
                            credits: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <button
                  type="submit"
                  disabled={courseExists === null}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubject;

import axios from "axios";
import React, { useState } from "react";

const RegisterStudent = () => {
  const [coreSubjects, setCoreSubjects] = useState([]);
  const [electiveSubjects, setElectiveSubjects] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    usn: "",
    branch: "",
    scheme: "",
    sem: "",
    div: "",
    electives: [],
    phNumber: "",
  });

  const fetchSubjects = async (scheme, branch, sem) => {
    try {
      const response = await axios.get("/api/subjects", {
        params: { scheme, branch, sem },
      });
      console.log(response);
      setCoreSubjects(response.data.core || []);
      setElectiveSubjects(response.data.electives || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setCoreSubjects([]);
      setElectiveSubjects([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "scheme" || name === "branch" || name === "sem") {
      const { scheme, branch, sem } = { ...formData, [name]: value };
      if (scheme && branch && sem) {
        fetchSubjects(scheme, branch, sem);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("/api/registerStudent", formData);
      console.log(response);
      alert("Student registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        role:"",
        usn: "",
        branch: "",
        scheme: "",
        sem: "",
        div: "",
        electives: [],
        phNumber: "",
      });
      setCoreSubjects([]);
      setElectiveSubjects([]);
    } catch (error) {
      console.error("Error registering student:", error);
      alert("Failed to register student.");
    }
  };

  return (
    <>
      <div className="shadow-xl border md:w-[30%] mx-auto mt-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
              Student Registration
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              {/* name */}
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium leading-6 "
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    name="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 "
                >
                  Role
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  > 
                    <option value="">Select</option>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                    <option value="Coordinator">Coordinator</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>
              </div>

              {/* password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 "
                  >
                    Password
                  </label>
                  <div className="text-sm flex">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className=" inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 hover:text-indigo-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mt-2 border">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none border-none"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* usn */}
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 "
                >
                  USN
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    name="usn"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                    value={formData.usn}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Branch */}
              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium leading-6 "
                >
                  Branch
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  >
                    <option value="">Select</option>
                    <option value="CSE">CSE</option>
                    <option value="AIDS">AIDS</option>
                    <option value="ECE">ECE</option>
                  </select>
                </div>
              </div>

              {/* Scheme */}
              <div>
                <label
                  htmlFor="scheme"
                  className="block text-sm font-medium leading-6 "
                >
                  Scheme
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="scheme"
                    value={formData.scheme}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  >
                    <option value="">Select Scheme</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>

              {/* Semester */}
              <div>
                <label
                  htmlFor="sem"
                  className="block text-sm font-medium leading-6 "
                >
                  Semester
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="sem"
                    value={formData.sem}
                    onChange={handleInputChange}
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

              {/* Div */}
              <div>
                <label
                  htmlFor="division"
                  className="block text-sm font-medium leading-6 "
                >
                  Division
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="div"
                    value={formData.div}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  >
                    <option value="">Select Division</option>
                    <option value="CSE">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              {/* phone number */}
              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium leading-6 "
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    name="phNumber"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                    value={formData.phNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Core Subjects */}
              <div>
                <label>Core Subjects:</label>
                {coreSubjects.length > 0 ? (
                  <div className="flex gap-3">
                    {coreSubjects.map((subject, index) => (
                      <div key={index}>
                        <input readOnly value={subject.subjectName} />
                        {/* <label>{subject.subjectName}</label> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No core subjects available for the selected semester.</p>
                )}
              </div>

              {/* Elective Subjects */}
              {/* <div>
                <label>Elective Subjects:</label>
                {electiveSubjects.length > 0 ? (
                  <div className="flex gap-3">
                    {electiveSubjects.map((subject, index) => (
                      <div key={index}>
                        <input type="checkbox" value={subject.subjectName} />
                        <label>{subject.subjectName}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>
                    No elective subjects available for the selected semester.
                  </p>
                )}
              </div> */}

              <div>
                <h4>Elective Subjects</h4>
                {electiveSubjects.length > 0 ? (
                  electiveSubjects.map((subject, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        value={subject.subjectName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            electives: e.target.checked
                              ? [...prev.electives, e.target.value]
                              : prev.electives.filter(
                                  (el) => el !== e.target.value
                                ),
                          }))
                        }
                      />
                      <label>{subject.subjectName}</label>
                    </div>
                  ))
                ) : (
                  <p>No electives available.</p>
                )}
              </div>

              {/* Total Subjects */}
              {/* <div>
                <label
                  htmlFor="totalSubject"
                  className="block text-sm font-medium leading-6 "
                >
                  Total Subjects
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    required
                    readOnly
                    value={formData.subjects.length}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                  />
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
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

export default RegisterStudent;

import axios from "axios";
import React, { useState } from "react";

const FacultyMapping = () => {

  const[subjects, setSubjects] = useState([]);
  const[faculty, setFaculty] = useState([]);
  const [formData, setFormData] = useState({
    scheme: "",
    sem: "",
    div: "",
    subject: "",
    branch: "",
    facultyId: "",
  });
  const fetchSubjects = async (scheme, branch, sem) => {
    try {
      const response = await axios.get("/api/subjects", {
        params: { scheme, branch, sem },
      });
      const{core, electives} = response.data
      const combinedSubjects = [...(core || []), ...(electives || [])]; 
      console.log(combinedSubjects);
      setSubjects(combinedSubjects)
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([])
    }
  };

  const fectchFaculty = async(branch)=>{
    try {
      const response = await axios.get('/api/faculties', {
        params:{branch}
      })
      console.log(response.data.faculty)
      setFaculty(response.data?.faculty);
    } catch (error) {
      console.error("Error fetching faculty:", error);
      setFaculty([]);
    }
  }

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
        fectchFaculty(branch)

        // console.log(subjects)
        // console.log(faculty)
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("/api/alotMapping", formData);
      console.log(response);
      alert("Mapping done successfully!");
      setFormData({
        scheme: "",
        sem: "",
        div: "",
        subject:"",
        branch: "",
        facultyId: ""
      });
    } catch (error) {
      console.error("Error Mapping faculty:", error);
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <div className="shadow-xl border md:w-[30%] mx-auto mt-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
              Faculty Mapping
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
                    required
                    name="scheme"
                    value={formData.scheme}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  >
                    <option value="">Select</option>
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
                    name="branch"
                    required
                    id=""
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
              

              {/* FId
              <div>
                <label
                  htmlFor="fId"
                  className="block text-sm font-medium leading-6 "
                >
                  Faculty Id
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    name="fId"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                    value={formData.fId}
                    onChange={handleInputChange}
                  />
                </div>
              </div> */}

              {/* subject*/}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium leading-6 "
                >
                  Subject
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  >
                    <option value="">Select</option>
                    {
                      subjects.map((s)=>{
                       return <option key={s._id} value={s.subjectName}>{s.subjectName}</option>
                      })
                    }
                  </select>
                </div>
              </div>


              {/* faculty name / fId */}
              <div>
                <label
                  htmlFor="facultyName"
                  className="block text-sm font-medium leading-6 "
                >
                  Faculty Name / id
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="facultyId"
                    value={formData.facultyId}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  >
                    <option value="">Select</option>
                    {
                      faculty.map((f)=>{
                      return <option key={f._id} value={f.Id}>{f.name} {" "}{f.fId}</option>
                      })
                    }
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Alot/Mapping
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyMapping;

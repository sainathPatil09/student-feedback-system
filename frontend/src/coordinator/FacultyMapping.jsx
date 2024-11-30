import React from "react";

const FacultyMapping = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    scheme: "",
    sem: "",
    div: "",
    subject: "",
    branch: "",
    facultyName: "",
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
                  Role
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

              {/* subject */}
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
              </div>

              {/* faculty name */}
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

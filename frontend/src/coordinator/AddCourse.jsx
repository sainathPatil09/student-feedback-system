import React, { useState } from "react";
import axios from "axios";

const AddCourse = () => {
  const [subjects, setSubjects] = useState({
    core: [],
    electives: [],
  }); // Subjects categorized into core and electives
  const [selectedSem, setSelectedSem] = useState(""); // Selected semester
  const [formData, setFormData] = useState({
    scheme: "",
    branch: "",
    sem: "",
    subjects: [], // Array to hold selected subjects
    totalSubject: 0,
  });

  // Handle semester selection
  const handleSemChange = async (e) => {
    const selectedSemester = e.target.value;
    setSelectedSem(selectedSemester);
    setFormData((prev) => ({
      ...prev,
      sem: selectedSemester,
      subjects: [],
      totalSubject: 0,
    }));

    try {
      const response = await axios.get("/api/subjects", {
        params: {
          scheme: formData.scheme,
          branch: formData.branch,
          sem: selectedSemester,
        },
      });

      console.log(response.data.core); // Logs the core subjects
      console.log(response.data.electives); // Logs the elective subjects

      if (response.data) {
        setSubjects({
          core: response.data.core || [], // Assign core subjects
          electives: response.data.electives || [], // Assign elective subjects
        });
      } else {
        setSubjects({ core: [], electives: [] });
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      alert("Failed to fetch subjects for the selected semester.");
      setSubjects({ core: [], electives: [] });
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setFormData((prev) => {
      const isSelected = prev.subjects.includes(selectedSubject);

      const updatedSubjects = isSelected
        ? prev.subjects.filter((sub) => sub !== selectedSubject)
        : [...prev.subjects, selectedSubject];

      return {
        ...prev,
        subjects: updatedSubjects
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("/api/addCourse", formData);
      console.log("Course added successfully:", response.data);
      alert("Course added successfully!");
      setFormData({
        scheme: "",
        branch: "",
        sem: "",
        subjects: [],
        totalSubject: 0,
      });
    } catch (error) {
      console.error("Error adding course:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="shadow-xl border md:w-[30%] mx-auto mt-10">
      <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
            Add Course
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
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
                  value={formData.scheme}
                  onChange={(e) =>
                    setFormData({ ...formData, scheme: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                >
                  <option value="">Select</option>
                  <option value="2022">2022</option>
                </select>
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
                  value={formData.branch}
                  onChange={(e) =>
                    setFormData({ ...formData, branch: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                >
                  <option value="">Select</option>
                  <option value="CSE">CSE</option>
                  <option value="AIDS">AIDS</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
            </div>

            {/* Semester */}
            <div>
              <label
                htmlFor="sem"
                className="block text-sm font-medium leading-6 "
              >
                Sem
              </label>
              <div className="mt-2">
                <select
                  required
                  value={selectedSem}
                  onChange={handleSemChange}
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

            {/* Core Subjects */}
            <div>
              <label>Core Subjects:</label>
              {subjects.core.length > 0 ? (
                <div className="flex gap-3">
                  {subjects.core.map((subject, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        value={subject.subjectName}
                        onChange={handleSubjectChange}
                        checked={formData.subjects.includes(
                          subject.subjectName
                        )}
                      />
                      <label>{subject.subjectName}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No core subjects available for the selected semester.</p>
              )}
            </div>

            {/* Elective Subjects */}
            <div>
              <label>Elective Subjects:</label>
              {subjects.electives.length > 0 ? (
                <div className="flex gap-3">
                  {subjects.electives.map((subject, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        value={subject.subjectName}
                        onChange={handleSubjectChange}
                        checked={formData.subjects.includes(
                          subject.subjectName
                        )}
                      />
                      <label>{subject.subjectName}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No elective subjects available for the selected semester.</p>
              )}
            </div>

            {/* Total Subjects */}
            <div>
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
                  value={formData.totalSubject}
                  onChange={(e) =>
                    setFormData({ ...formData, totalSubject: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                />
              </div>
            </div>

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
  );
};

export default AddCourse;

import axios from "axios";
import React, { useState } from "react";

const RegisterStudent = () => {
  const [coreSubjects, setCoreSubjects] = useState([]);
  const [electiveSubjects, setElectiveSubjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      console.log(response)
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
      const response = await axios.post("/api/registerStudent", formData);
      alert("Student registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
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
      <form onSubmit={handleSubmit}>
        {/* Scheme */}
        <div>
          <label>Scheme</label>
          <select
            name="scheme"
            value={formData.scheme}
            onChange={handleInputChange}
          >
            <option value="">Select Scheme</option>
            <option value="2022">2022</option>
          </select>
        </div>

        {/* Branch */}
        <div>
          <label>Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label>Semester</label>
          <select name="sem" value={formData.sem} onChange={handleInputChange}>
            <option value="">Select Semester</option>
            <option value="phy">PHY</option>
            <option value="chy">CHY</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        {/* Core Subjects */}
        <div>
          <h4>Core Subjects</h4>
          {coreSubjects.length > 0 ? (
            coreSubjects.map((subject, index) => (
              <div key={index}>
                <input type="checkbox" value={subject.name} />
                <label>{subject.name}</label>
              </div>
            ))
          ) : (
            <p>No core subjects available.</p>
          )}
        </div>

        {/* Elective Subjects */}
        <div>
          <h4>Elective Subjects</h4>
          {electiveSubjects.length > 0 ? (
            electiveSubjects.map((subject, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={subject.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      electives: e.target.checked
                        ? [...prev.electives, e.target.value]
                        : prev.electives.filter((el) => el !== e.target.value),
                    }))
                  }
                />
                <label>{subject.name}</label>
              </div>
            ))
          ) : (
            <p>No electives available.</p>
          )}
        </div>

        {/* Submit */}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterStudent;

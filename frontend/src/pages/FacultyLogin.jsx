import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyLogin = () => {
  // facultyName, facultyEmail, facultyBranch, password
  const navigateTo = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [facultyAccessKey, setFacultyAccessKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/loginFaculty", {
        fullName,
        email,
        role,
        branch,
        facultyAccessKey,
      });
      console.log(data);
      setFullName("");
      setEmail("");
      setRole("");
      setBranch("");
      setFacultyAccessKey("");

      localStorage.setItem("auth", JSON.stringify(data));

      alert("Admin logged in successfully");
      console.log(data);
      setIsAuthenticated(true);
      navigateTo("/student-pannel");
    } catch (error) {
      alert("Error in loggin");
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
            Faculty Login
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-3">
            {/* fullName */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 "
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 "
              >
                Role
              </label>
              <div className="mt-2">
                <select
                  name=""
                  required
                  id=""
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                >
                  <option value="select">select</option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                  <option value="Coordinator">Coordinator</option>
                  <option value="Faculty">Faculty</option>
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
                  <option value="select">select</option>
                  <option value="CSE">CSE</option>
                  <option value="AIDS">AIDS</option>
                  <option value="ECE">ECE</option>
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
                  Faculty Password
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none border-none"
                  value={facultyAccessKey}
                  onChange={(e) => setFacultyAccessKey(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                required
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Faculty Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;

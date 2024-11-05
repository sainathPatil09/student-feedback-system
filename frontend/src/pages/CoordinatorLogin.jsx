import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const CoordinatorLogin = () => {
    // coordinatorName,
    //   coordinatorEmail,
    //   coordinatorBranch,
    //   coordinatorAccessKey,
    const {setIsAuthenticated} = useAuth()
    const navigateTo = useNavigate()

    const [coordinatorName, setCoordinatorName] = useState("");
    const [coordinatorEmail, setCoordinatorEmail] = useState("");
    const [role, setRole] = useState("");
  const [coordinatorBranch, setCoordinatorBranch] = useState("");
  const [coordinatorAccessKey, setCoordinatorAccessKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/coordinatorlogin", {
        coordinatorName,
        coordinatorEmail,
        role,
        coordinatorBranch,
        coordinatorAccessKey,
      });
      console.log(data);
      setCoordinatorName("")
      setCoordinatorEmail("")
      setRole("")
      setCoordinatorBranch("");
      setCoordinatorAccessKey("")

      localStorage.setItem("auth", JSON.stringify(data.coordinator));

      alert("Coordinator logged in successfully")
      console.log(data)
      setIsAuthenticated(true)
      navigateTo('/coordinator-pannel')

    } catch (error) {
      alert("Error in coordinator loggin")
      console.log(error)
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
            Coordinator Login
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 "
              >
                Coordinator Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                  value={coordinatorName}
                  onChange={(e) => setCoordinatorName(e.target.value)}
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
                  value={coordinatorEmail}
                  onChange={(e) => setCoordinatorEmail(e.target.value)}
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
                  value={coordinatorBranch}
                  onChange={(e) => setCoordinatorBranch(e.target.value)}
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none border-none"
                  value={coordinatorAccessKey}
                  onChange={(e) => setCoordinatorAccessKey(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                required
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Coordinator Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorLogin;

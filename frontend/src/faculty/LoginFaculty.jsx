import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginFaculty = () => {
  const navigateTo = useNavigate();
  const { setIsAuthenticated } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("/api/facultyLogin", formData);
      console.log(response.data.faculty);
      alert("Faculty logged in successfully!");
      localStorage.setItem("auth", JSON.stringify(response.data.faculty));
      setIsAuthenticated(true);
      setFormData({
        email: "",
        password: "",
        fId: ""
      });
      navigateTo("/pannel-faculty");
    } catch (error) {
      console.error("Error login faculty:", error);
      alert("Failed to login faculty.");
    }
  };

  return (
    <>
      <div className="shadow-xl border md:w-[30%] mx-auto mt-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
              Faculty Login
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              

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

              {/* fId */}
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

              

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Faculty Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFaculty;

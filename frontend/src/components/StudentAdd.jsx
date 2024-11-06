import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentAdd = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [div, setDiv] = useState("");
  const [usn, setUsn] = useState("");
  const [phNumber, setPhNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/addStudent", {
        fullName,
        email,
        role,
        branch,
        year,
        div,
        usn,
        phNumber,
      });
      console.log(data);
      setFullName("");
      setEmail("");
      setRole("")
      setBranch("");
      setYear("");
      setDiv("");
      setUsn("");
      setPhNumber("");
      alert("Student added successfully");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="shadow-xl border md:w-[30%] mx-auto mt-8">
      <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
            Add Student
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-2">
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

            <div className="flex gap-3">
              {/* studentYear */}
              <div>
                <label
                  htmlFor="Year"
                  className="block text-sm font-medium leading-6 "
                >
                  Year
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>

              {/* studentDiv */}
              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium leading-6 "
                >
                  Division
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
                    value={div}
                    onChange={(e) => setDiv(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* usn */}
            <div>
              <label
                htmlFor="usn"
                className="block text-sm font-medium leading-6 "
              >
                USN
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                />
              </div>
            </div>

            {/* phone number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 "
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none border-none text-lg"
                  value={phNumber}
                  onChange={(e) => setPhNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                required
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Student
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-500">
            
            <Link
              to={"/importStudent"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              import file
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAdd;

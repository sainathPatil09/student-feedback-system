import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Verify = () => {
    const [otp, setOtp] = useState("")
    const navigateTo = useNavigate();
    const {setIsAuthenticated} = useAuth()
    const handleLogin=async(e)=>{
        e.preventDefault();
        console.log(otp)
        try {
            const{data} = await axios.post('/api/verify-otp',{
                otp
            })
            console.log(data)
            setOtp("");

            localStorage.setItem("auth", JSON.stringify(data.student));

            alert("Student logged in successfully")
            console.log(data)
            setIsAuthenticated(true)
            navigateTo('/student-pannel')
        } catch (error) {
            alert("Error in loggin")
            console.log(error)
        }
    }
  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleLogin} method="POST" className="space-y-6">
        {/* email */}
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium leading-6 "
          >
            Enter OTP
          </label>
          <div className="mt-2">
            <input
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg outline-none border-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            required
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Verify
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default Verify;

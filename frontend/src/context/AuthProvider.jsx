import { createContext, Profiler, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = Cookies.get("jwt");
  // const [authUser, setAuthUser] = useState(initialState ? JSON.parse(initialState) : undefined);
  const [authUser, setAuthUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const[studentProfile, setStudentProfile] = useState(null);
  useEffect(() => {
    // Fetch user data from the server on initial load
    const fetchAuthUser= async()=>{
      try{

        const response = await axios.get("/api/auth-User", { withCredentials: true })
        console.log(response)
        if(response){
          setAuthUser(response.data.user);
          setIsAuthenticated(true);
          setLoading(false);
        }
        if(response.data.user){
          console.log(response.data.user.id)
          const studentId = response.data.user.id
          const result = await axios.get(`/api/student-profile/${studentId}`);
          if(!result)console.log(error, " error in fetching profile")
          console.log(result, " result")
          const profile = result.data.student || null;
          setStudentProfile(profile);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        loading,
        setLoading,
        isAuthenticated,
        setIsAuthenticated,
        studentProfile,
        setStudentProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

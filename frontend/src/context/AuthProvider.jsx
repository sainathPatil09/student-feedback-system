import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = Cookies.get("jwt");
  // const [authUser, setAuthUser] = useState(initialState ? JSON.parse(initialState) : undefined);
  const [authUser, setAuthUser] = useState(undefined)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch user data from the server on initial load
    axios
      .get("/api/auth-User", { withCredentials: true })
      .then((response) => {
        setAuthUser(response.data.user);
        setLoading(false)
        console.log(response.data.user) // Set user data from server
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(()=> setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser,loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

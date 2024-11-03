import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const initialState = Cookies.get("jwt")
    const [authUser, setAuthUser] = useState(initialState ? JSON.parse(initialState) : undefined);

    return(
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
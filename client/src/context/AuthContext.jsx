import { createContext, useState, useEffect, Children } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate =useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    const login = (userData, token, message) => {
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)
        setUser(userData)
        toast.success(message || "Logged in successfully!")

    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        toast.success("Logged out successfully!")
        navigate("/")
    }

    const signup = (userData,token,message)=>{
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)
        setUser(userData)
        toast.success(message|| "Signed up successfully!")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}
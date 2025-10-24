import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user")
    //     if (storedUser) setUser(JSON.parse(storedUser))
    // }, [])

    useEffect(() => {

        const storedUser = localStorage.getItem("user")
        if (storedUser && token) {
            setUser(JSON.parse(storedUser))
        }
        const fetchUserProfile = async () => {
            // const token = localStorage.getItem("token")
            if (!token) {
                setLoading(false)
                return
            }

            try {
                const res = await axios.get("http://localhost:5000/v1/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUser(res.data.user)
            } catch (error) {
                console.error("Error fetching profile:", error)
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                toast.error("Session expired. Please log in again")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUserProfile()
    }, [token])

    const login = (userData, token, message, showToast = true) => {

        if (token) {
            localStorage.setItem("token", token)
            setToken(token)
        }
        if (userData) localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        if (showToast) toast.success(message || "Logged in successfully!")

    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setToken("")
        toast.success("Logged out successfully!")
        navigate("/")
    }

    const signup = (userData, token, message, showToast= true) => {

        if (token) {
            localStorage.setItem("token", token)
            setToken(token)
        }
        if (userData) localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        if (showToast) toast.success(message || "Signed up successfully!")
    }

    return (
        <AuthContext.Provider value={{ user,token, login, logout, signup, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
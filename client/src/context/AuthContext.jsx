import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Normalize avatar path
  const normalizeAvatar = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith("http")) return avatar; // Google or external URL
    return `${BASE_URL}${avatar}`; // Local upload
  };

  // ✅ Restore user from localStorage or refresh from backend
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // Load from storage for instant UI update
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.avatar = normalizeAvatar(parsedUser.avatar);
      setUser(parsedUser);
    }

    const fetchUserProfile = async () => {
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/v1/api/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        const userData = res.data.user;
        userData.avatar = normalizeAvatar(userData.avatar);

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.error("Session expired. Please log in again");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // ✅ Login method (works for both Google & Manual)
  const login = (userData, token, message = "Logged in successfully!") => {
    if (userData?.avatar) {
      userData.avatar = normalizeAvatar(userData.avatar);
    }

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }

    toast.success(message);
  };

  // ✅ Signup method
  const signup = (userData, token, message = "Signed up successfully!") => {
    if (userData?.avatar) {
      userData.avatar = normalizeAvatar(userData.avatar);
    }

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }

    toast.success(message);
  };

  // ✅ Logout method
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout, signup, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

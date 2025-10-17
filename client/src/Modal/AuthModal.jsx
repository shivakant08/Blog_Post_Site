import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from 'react-icons/fa';
import axios from "axios"
import {toast} from "react-hot-toast"
import { useState } from 'react';

const AuthModal = ({ isOpen, type, onClose, onSwitch }) => {
const [formData, setFormData] = useState({
  name:"",
  email:"",
  password:"",
  role:""
})

const handleChange = (e)=>{
  setFormData(prev=>({...prev, [e.target.name]: e.target.value}))
}

const handleSubmit = async (e)=>{
  e.preventDefault()

  try {
    if(type === "signup"){
      const res = await axios.post("http://localhost:5000/v1/api/register", formData)
      toast.success(res.data.message)
      onSwitch("signin")
    }else{
      const res = await axios.post("http://localhost:5000/v1/api/login",{
        email:formData.email,
        password:formData.password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      toast.success(res.data.message)
      onClose()
      window.location.reload()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong")
  }
}

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[2000] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-6 relative border border-white/30 overflow-hidden"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>

            {/* Title & Subtitle */}
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
              {type === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {type === "signup"
                ? "Join our blogging community today!"
                : "Login to continue exploring awesome stories."}
            </p>

            {/* Form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              {type === "signup" && (
                <input
                  type="text"
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 bg-white/95"
                />
              )}

              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 bg-white/95"
              />

              {/* Role Dropdown */}
              {type === "signup" && (
                <div className="relative">
                  <select
                    
                    name='role'
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/95 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none pr-10"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}

              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 bg-white/95"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                {type === "signup" ? "Sign Up" : "Sign In"}
              </button>

              {/* OR Divider */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-[1px] bg-gray-300" />
                <span className="px-2 text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-[1px] bg-gray-300" />
              </div>

              {/* Google Sign-in */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl font-medium bg-white hover:bg-gray-50 transition text-gray-800"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                {type === "signup" ? "Sign up" : "Sign in"} with Google
              </button>
            </form>

            {/* Switch Auth */}
            <div className="text-center mt-6 text-gray-600 text-sm">
              {type === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => onSwitch("signin")}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => onSwitch("signup")}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;


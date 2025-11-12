import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const AuthModal = ({ isOpen, type, onClose, onSwitch }) => {
  const { login, signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "signup") {
        const res = await axios.post("http://localhost:5000/v1/api/register", formData);
        signup(res.data.user, res.data.token, res.data.message);
        toast.success("Account created successfully!");
        onSwitch("signin");
      } else {
        const res = await axios.post("http://localhost:5000/v1/api/login", {
          email: formData.email,
          password: formData.password,
        });
        login(res.data.user, res.data.token, res.data.message);
        toast.success("Welcome back!");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/v1/api/forgot-password", {
        email: emailForReset,
      });
      toast.success("Password reset link sent!");
      onSwitch("signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
              {type === "signup"
                ? "Create Account"
                : type === "forgot"
                ? "Reset Password"
                : "Welcome Back"}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {type === "signup"
                ? "Join our blogging community today!"
                : type === "forgot"
                ? "Enter your email to reset password."
                : "Login to continue exploring awesome stories."}
            </p>

            {type === "forgot" ? (
              <form className="space-y-4" onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={emailForReset}
                  onChange={(e) => setEmailForReset(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  Send Reset Link
                </button>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => onSwitch("signin")}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit}>
                {type === "signup" && (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="Avatar URL (optional)"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                    {formData.avatar && (
                      <div className="flex justify-center my-2">
                        <img
                          src={formData.avatar}
                          alt="Avatar Preview"
                          className="w-16 h-16 rounded-full object-cover border border-gray-300"
                        />
                      </div>
                    )}
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </>
                )}

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500 hover:text-gray-700" />
                    ) : (
                      <FaEye className="text-gray-500 hover:text-gray-700" />
                    )}
                  </div>
                </div>

                {type === "signin" && (
                  <div className="text-right text-sm">
                    <button
                      type="button"
                      onClick={() => onSwitch("forgot")}
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  {type === "signup" ? "Sign Up" : "Sign In"}
                </button>

                <div className="flex items-center my-5">
                  <div className="flex-1 h-[1px] bg-gray-300" />
                  <span className="px-2 text-gray-500 text-sm">OR</span>
                  <div className="flex-1 h-[1px] bg-gray-300" />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    window.open("http://localhost:5000/v1/api/google", "_self")
                  }
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
            )}

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
              ) : type === "signin" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => onSwitch("signup")}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;

import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import api from '../utils/api'
import { toast } from "react-hot-toast"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [strength, setStrength] = useState("")
    const [loading, setLoading] = useState(false)

    const checkPasswordStrength = (password) => {
        if (password.length < 6) return "Weak"
        if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return "Strong"
        return "Medium"
    }

    const handlePasswordChange = (e) => {
        const val = e.target.value
        setNewPassword(val)
        setStrength(checkPasswordStrength(val))
    }


    const handleResetPassword = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!")
            return
        }

        try {
            setLoading(true)
            const res = await api.post("/v1/api/reset-password", {
                token,
                newPassword
            })
            toast.success(res.data.message || "Password reset successful!")
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Reset failed. Try again.")
        } finally {
            setLoading(false)
        }
    }

    const getStrengthColor = () => {
        switch (strength) {
            case "Weak":
                return "bg-red-500 w-1/3"
            case "Medium":
                return "bg-yellow-500 w-2/3"

            case "Strong":
                return "bg-green-500 w-full"
            default:
                return "bg-gray-300 w-0"
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#0d1224] to-[#0a0d1a]'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.65)] w-full max-w-md border border-white/10'
            >
                <div className='absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none' />
                <h2 className='text-2xl font-bold text-center text-indigo-400 mb-2'>
                    Reset Password
                </h2>

                <p className='text-gray-300 text-center mb-6'>Enter and confirm your new password</p>

                <form className='space-y-5' onSubmit={handleResetPassword}>
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={handlePasswordChange}
                            placeholder='Enter new password'
                            className='w-full border border-white/20 rounded-xl px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none'
                            required
                        />
                        <div
                            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    {newPassword && (
                        <div className='mt-1'>
                            <div className='h-2 rounded-full overflow-hidden bg-gray-700'>
                                <motion.div
                                    className={`h-2 ${getStrengthColor()} rounded-full`}
                                    layout
                                    transition={{ duration: 0.3 }}
                                ></motion.div>
                            </div>

                            <p className={`text-sm mt-1 ${strength === "Weak"
                                    ? "text-red-500"
                                    : strength === "Medium"
                                        ? "text-yellow-400"
                                        : "text-green-400"
                                }`}
                            >
                                Strength : {strength}
                            </p>
                        </div>
                    )}

                    <div className='relative'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full border border-white/20 rounded-xl px-4 py-3 bg-white/5  text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none'
                            required
                        />
                        <div
                            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? < FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition ${loading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30"
                            }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default ResetPassword
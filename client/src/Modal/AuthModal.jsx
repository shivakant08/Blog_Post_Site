// import React from 'react'
// import { motion, AnimatePresence } from "framer-motion";
// import { FaGoogle, FaTimes } from 'react-icons/fa';

// const AuthModal = ({ isOpen, type, onClose, onSwitch }) => {
//     if (!isOpen) return null;

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className='fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[2000]'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         initial={{ scale: 0.8, opacity: 0, y: -50 }}
//                         animate={{ scale: 1, opacity: 1, y: 0 }}
//                         exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                         transition={{ duration: 0.4 }}
//                         className='bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl w-[90%] max-w-lg p-8 relative border border-white/30 
//                        flex flex-col justify-center max-h-[85vh] overflow-hidden'
//                     >
//                         {/* Close Button */}
//                         <button
//                             className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
//                             onClick={onClose}
//                         >
//                             <FaTimes size={20} />
//                         </button>

//                         {/* Header */}
//                         <h2 className='text-2xl font-bold text-center text-indigo-600 mb-2'>
//                             {type === "signup" ? "Create Account" : "Welcome Back"}
//                         </h2>
//                         <p className='text-gray-600 text-center mb-6'>
//                             {type === "signup"
//                                 ? "Join our blogging community today!"
//                                 : "Login to continue exploring awesome stories."}
//                         </p>

//                         {/* Form */}
//                         <form className='space-y-5'>
//                             {type === "signup" && (
//                                 <input
//                                     type='text'
//                                     placeholder='Full Name'
//                                     className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 bg-white'
//                                 />
//                             )}

//                             <input
//                                 type='email'
//                                 placeholder='Email Address'
//                                 className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 bg-white'
//                             />

//                             {type === "signup" && (
//                                 <input
//                                     type='text'
//                                     placeholder='Username'
//                                     className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 bg-white'
//                                 />
//                             )}

//                             {type === "signup" && (
//                                 <div className='relative'>
//                                     <select
//                                         className='w-full rounded-lg px-4 py-3 bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none pr-10'
//                                         defaultValue=''
//                                     >
//                                         <option value='' disabled>
//                                             Select Role
//                                         </option>
//                                         <option value='admin'>Admin</option>
//                                         <option value='user'>User</option>
//                                     </select>
//                                     <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center'>
//                                         <svg
//                                             className='w-5 h-5 text-gray-500'
//                                             fill='none'
//                                             stroke='currentColor'
//                                             viewBox='0 0 24 24'
//                                             xmlns='http://www.w3.org/2000/svg'
//                                         >
//                                             <path
//                                                 strokeLinecap='round'
//                                                 strokeLinejoin='round'
//                                                 strokeWidth={2}
//                                                 d='M19 9l-7 7-7-7'
//                                             />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             )}

//                             <input
//                                 type='password'
//                                 placeholder='Password'
//                                 className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500 bg-white'
//                             />

//                             <button
//                                 type='submit'
//                                 className='w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition'
//                             >
//                                 {type === "signup" ? "Sign Up" : "Sign In"}
//                             </button>

//                             {/* Divider */}
//                             <div className='flex items-center my-4'>
//                                 <div className='flex-1 h-[1px] bg-gray-400' />
//                                 <span className='px-2 text-gray-700 text-sm'>OR</span>
//                                 <div className='flex-1 h-[1px] bg-gray-400' />
//                             </div>

//                             {/* Google Auth */}
//                             <button
//                                 type='button'
//                                 className='w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 transition text-gray-800'
//                             >
//                                 <FaGoogle className='mr-3 text-red-500' />
//                                 {type === "signup" ? "Sign up" : "Sign in"} with Google
//                             </button>
//                         </form>

//                         {/* Footer */}
//                         <div className='text-center mt-6 text-gray-600 text-sm'>
//                             {type === "signup" ? (
//                                 <>
//                                     Already have an account?{" "}
//                                     <button
//                                         onClick={() => onSwitch("signin")}
//                                         className='text-indigo-600 hover:underline font-medium'
//                                     >
//                                         Sign In
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     Don't have an account?{" "}
//                                     <button
//                                         onClick={() => onSwitch("signup")}
//                                         className='text-indigo-600 hover:underline font-medium'
//                                     >
//                                         Sign Up
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default AuthModal;


import React, { useState } from 'react'
import { motion } from "framer-motion"
import { FaPenFancy, FaLaptopCode, FaGlobe, FaRocket } from 'react-icons/fa'
import AuthModal from '../Modal/AuthModal'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authType, setAuthType] = useState(null)

  const openModal = (type) => {
    setAuthType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setAuthType(null)
  }

  return (
    <section className='relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white pt-28 pb-20 overflow-hidden'>
      <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-between'>
        <div className='text-center md:text-left space-y-6 z-10 max-w-xl'>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-5xl md:text-6xl font-extrabold leading-tight'>
            Share Your Thoughts <br />
            <span className='text-yellow-300'>In a Modern Way</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='text-lg text-gray-100 max-w-md mx-auto md:mx-0'>
            Write. Inspire. Connect with a global audience through your stories,
            ideas, and creativity — all in one elegant platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            {/* 🟡 Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
              onClick={() => openModal("signup")}
            >
              Sign Up
            </motion.button>

            {/* ⚪ Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition"
              onClick={() => openModal("signin")}
            >
              Sign In
            </motion.button>
          </motion.div>
        </div>

        <div className='relative mt-12 md:mt-0'>
          <motion.div
            className='relative w-72 h-72 md:w-96 md:h-96'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}>

            <motion.div
              className='absolute top-0 left-1/2 -translate-x-1/2 bg-white text-indigo-600 rounded-full p-5 shadow-xl'
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaPenFancy size={30} />
            </motion.div>

            <motion.div
              className='absolute top-1/4 right-0 bg-white text-purple-600 rounded-full p-5 shadow-xl'
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <FaLaptopCode size={30} />
            </motion.div>

            <motion.div
              className='absolute top-1/4 left-0 bg-white text-pink-600 rounded-full p-5 shadow-xl'
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <FaGlobe size={30} />
            </motion.div>

            <motion.div
              className='absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-white text-yellow-500 rounded-full p-5 shadow-xl'
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              <FaRocket size={30} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none'></div>

      {/* 🟢 Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        type={authType}
        onClose={closeModal}
      />
    </section>
  )
}

export default Hero





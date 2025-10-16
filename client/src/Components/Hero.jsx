import React, { useState } from 'react'
import { motion } from "framer-motion"
import { FaPenFancy, FaLaptopCode, FaGlobe, FaRocket } from 'react-icons/fa'
import AuthModal from '../Modal/AuthModal'

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [authType, setAuthType] = useState("signup")

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
                        ideas, and creativity - all in one elegant platform.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
                            onClick={() => openModal("signup")}
                        >
                            Sign Up
                        </motion.button>

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
            <AuthModal
                isOpen={isModalOpen}
                type={authType}
                onClose={closeModal} 
                onSwitch={(newType)=>setAuthType(newType)}/>
        </section>

    )
}

export default Hero
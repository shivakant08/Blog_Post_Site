import React from 'react'
import { motion } from "framer-motion"
import { FaPenFancy, FaLaptopCode, FaGlobe, FaRocket } from 'react-icons/fa'

const Hero = () => {
    return (
        <section
            className='relative text-white pt-28 pb-32 overflow-hidden'
            style={{
                background: 'radial-gradient(circle at bottom, #0b1a3f 0%, #000000 100%)'
            }}
        >

            {/* Stars */}
            <div className='absolute inset-0 overflow-hidden'>
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute bg-white rounded-full'
                        style={{
                            width: Math.random() * 2 + 1,
                            height: Math.random() * 2 + 1,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random(),
                        }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: Math.random() * 5 + 5, delay: Math.random() * 3 }}
                    />
                ))}
            </div>

            <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-around md:space-x-12 relative z-10'>
                {/* Left Section */}
                <div className='text-center md:text-left space-y-6 max-w-xl'>
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-snug tracking-tight'
                    >
                        Explore Your Thoughts <br />
                        <span className='text-purple-400 hover:text-purple-300 transition-colors duration-300'>
                            Across the Universe
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className='text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide'
                    >
                        Ignite your <span className="font-semibold">creativity</span>, spark <span className="font-semibold">conversations</span>,
                        and let your ideas soar through the <span className="font-semibold">cosmic horizon</span>. Share stories, insights, and dreams that resonate across the galaxy.
                    </motion.p>
                </div>

                {/* Right Section / Floating Icons */}
                <div className='relative mt-12 md:mt-0'>
                    <motion.div
                        className='relative w-72 h-72 md:w-96 md:h-96'
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Pen Icon */}
                        <motion.div
                            className='absolute top-0 left-1/2 -translate-x-1/2 bg-gray-800 text-pink-500 rounded-full p-5 shadow-lg'
                            animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <FaPenFancy size={30} />
                        </motion.div>

                        {/* Laptop Icon */}
                        <motion.div
                            className='absolute top-1/4 right-0 bg-gray-800 text-indigo-400 rounded-full p-5 shadow-lg'
                            animate={{ y: [0, 10, 0], rotate: [0, -10, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                        >
                            <FaLaptopCode size={30} />
                        </motion.div>

                        {/* Globe Icon */}
                        <motion.div
                            className='absolute top-1/4 left-0 bg-gray-800 text-purple-400 rounded-full p-5 shadow-lg'
                            animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            <FaGlobe size={30} />
                        </motion.div>

                        {/* Rocket Icon */}
                        <motion.div
                            className='absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-gray-800 text-yellow-400 rounded-full p-5 shadow-lg'
                            animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2.2 }}
                        >
                            <FaRocket size={30} />
                        </motion.div>
                    </motion.div>
                </div>

            </div>

        </section>
    )
}

export default Hero


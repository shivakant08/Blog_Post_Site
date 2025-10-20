// // import React, { useState } from 'react'
// // import { motion } from "framer-motion"
// // import { FaPenFancy, FaLaptopCode, FaGlobe, FaRocket } from 'react-icons/fa'
// // import AuthModal from '../Modal/AuthModal'

// // const Hero = () => {
// //         // const [isModalOpen, setIsModalOpen] = useState(false)
// //         // const [authType, setAuthType] = useState("signup")

// //         // const openModal = (type) => {
// //         //     setAuthType(type)
// //         //     setIsModalOpen(true)
// //         // }

// //         // const closeModal = () => {
// //         //     setIsModalOpen(false)
// //         //     setAuthType(null)

// //         // }

// //         return (
// //             <section className='relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white pt-28 pb-20 overflow-hidden'>
// //                 <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-around md:space-x-12'>
// //                     <div className='text-center md:text-left space-y-6 z-10 max-w-lg'>
// //                         <motion.h1
// //                             initial={{ opacity: 0, y: -30 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             transition={{ duration: 0.8 }}
// //                             className='text-5xl md:text-6xl font-extrabold leading-tight'>
// //                             Share Your Thoughts <br />
// //                             <span className='text-yellow-300'>In a Modern Way</span>
// //                         </motion.h1>

// //                         <motion.p
// //                             initial={{ opacity: 0, y: 20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             transition={{ duration: 1 }}
// //                             className='text-lg text-gray-100 max-w-md mx-auto md:mx-0'>
// //                             Write. Inspire. Connect with a global audience through your stories,
// //                             ideas, and creativity - all in one elegant platform.
// //                         </motion.p>

// //                         <motion.div
// //                             initial={{ opacity: 0 }}
// //                             animate={{ opacity: 1 }}
// //                             transition={{ delay: 0.6, duration: 0.6 }}
// //                             className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
// //                         >
// //                             {/* <motion.button
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 className="bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
// //                                 onClick={() => openModal("signup")}
// //                             >
// //                                 Sign Up
// //                             </motion.button>

// //                             <motion.button
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition"
// //                                 onClick={() => openModal("signin")}
// //                             >
// //                                 Sign In
// //                             </motion.button> */}
// //                         </motion.div>

// //                     </div>

// //                     <div className='relative mt-12 md:mt-0'>
// //                         <motion.div
// //                             className='relative w-72 h-72 md:w-96 md:h-96'
// //                             initial={{ scale: 0.8, opacity: 0 }}
// //                             animate={{ scale: 1, opacity: 1 }}
// //                             transition={{ duration: 0.8 }}>
// //                             <motion.div
// //                                 className='absolute top-0 left-1/2 -translate-x-1/2 bg-white text-indigo-600 rounded-full p-5 shadow-xl'
// //                                 animate={{ y: [0, -15, 0] }}
// //                                 transition={{ repeat: Infinity, duration: 2 }}
// //                             >
// //                                 <FaPenFancy size={30} />

// //                             </motion.div>

// //                             <motion.div
// //                                 className='absolute top-1/4 right-0 bg-white text-purple-600 rounded-full p-5 shadow-xl'
// //                                 animate={{ y: [0, 10, 0] }}
// //                                 transition={{ repeat: Infinity, duration: 2.5 }}
// //                             >
// //                                 <FaLaptopCode size={30} />
// //                             </motion.div>

// //                             <motion.div
// //                                 className='absolute top-1/4 left-0 bg-white text-pink-600 rounded-full p-5 shadow-xl'
// //                                 animate={{ y: [0, -10, 0] }}
// //                                 transition={{ repeat: Infinity, duration: 3 }}
// //                             >
// //                                 <FaGlobe size={30} />

// //                             </motion.div>

// //                             <motion.div
// //                                 className='absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-white text-yellow-500 rounded-full p-5 shadow-xl'
// //                                 animate={{ y: [0, 15, 0] }}
// //                                 transition={{ repeat: Infinity, duration: 2.2 }}
// //                             >
// //                                 <FaRocket size={30} />

// //                             </motion.div>
// //                         </motion.div>
// //                     </div>

// //                 </div>

// //                 <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none'></div>
// //                 {/* <AuthModal
// //                     isOpen={isModalOpen}
// //                     type={authType}
// //                     onClose={closeModal} 
// //                     onSwitch={(newType)=>setAuthType(newType)}/> */}
// //             </section>

// //         )



// //     // <section className='relative bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 text-white pt-28 pb-24 overflow-hidden'>
// //     //     <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-around md:space-x-8'>
// //     //         {/* Left Section */}
// //     //         <div className='text-center md:text-left space-y-6 z-10 max-w-md'>
// //     //             <motion.h1
// //     //                 initial={{ opacity: 0, y: -40 }}
// //     //                 animate={{ opacity: 1, y: 0 }}
// //     //                 transition={{ duration: 0.8 }}
// //     //                 className='text-5xl md:text-6xl font-extrabold leading-tight tracking-tight'>
// //     //                 Share Your Thoughts <br />
// //     //                 <span className='text-yellow-300 hover:text-yellow-400 transition-colors duration-300'>In a Modern Way</span>
// //     //             </motion.h1>

// //     //             <motion.p
// //     //                 initial={{ opacity: 0, y: 20 }}
// //     //                 animate={{ opacity: 1, y: 0 }}
// //     //                 transition={{ delay: 0.4, duration: 1 }}
// //     //                 className='text-lg text-gray-100 max-w-sm mx-auto md:mx-0'>
// //     //                 Write. Inspire. Connect with a global audience through your stories,
// //     //                 ideas, and creativity - all in one elegant platform.
// //     //             </motion.p>

// //     //             <motion.div
// //     //                 initial={{ opacity: 0 }}
// //     //                 animate={{ opacity: 1 }}
// //     //                 transition={{ delay: 0.6, duration: 0.6 }}
// //     //                 className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
// //     //             >
// //     //                 <motion.button
// //     //                     whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
// //     //                     whileTap={{ scale: 0.95 }}
// //     //                     className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition"
// //     //                 >
// //     //                     Sign Up
// //     //                 </motion.button>

// //     //                 <motion.button
// //     //                     whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
// //     //                     whileTap={{ scale: 0.95 }}
// //     //                     className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition"
// //     //                 >
// //     //                     Sign In
// //     //                 </motion.button>
// //     //             </motion.div>
// //     //         </div>

// //     //         {/* Right Section / Icons */}
// //     //         <div className='relative mt-12 md:mt-0'>
// //     //             <motion.div
// //     //                 className='relative w-72 h-72 md:w-96 md:h-96'
// //     //                 initial={{ scale: 0.8, opacity: 0 }}
// //     //                 animate={{ scale: 1, opacity: 1 }}
// //     //                 transition={{ duration: 0.8 }}
// //     //             >
// //     //                 {/** Floating Icons **/}
// //     //                 <motion.div
// //     //                     className='absolute top-0 left-1/2 -translate-x-1/2 bg-white text-indigo-600 rounded-full p-5 shadow-2xl'
// //     //                     animate={{ y: [0, -15, 0] }}
// //     //                     transition={{ repeat: Infinity, duration: 2 }}
// //     //                 >
// //     //                     <FaPenFancy size={30} />
// //     //                 </motion.div>

// //     //                 <motion.div
// //     //                     className='absolute top-1/4 right-0 bg-white text-purple-600 rounded-full p-5 shadow-2xl'
// //     //                     animate={{ y: [0, 10, 0], rotate: [0, 10, -10, 0] }}
// //     //                     transition={{ repeat: Infinity, duration: 2.5 }}
// //     //                 >
// //     //                     <FaLaptopCode size={30} />
// //     //                 </motion.div>

// //     //                 <motion.div
// //     //                     className='absolute top-1/4 left-0 bg-white text-pink-600 rounded-full p-5 shadow-2xl'
// //     //                     animate={{ y: [0, -10, 0], rotate: [0, -10, 10, 0] }}
// //     //                     transition={{ repeat: Infinity, duration: 3 }}
// //     //                 >
// //     //                     <FaGlobe size={30} />
// //     //                 </motion.div>

// //     //                 <motion.div
// //     //                     className='absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-white text-yellow-500 rounded-full p-5 shadow-2xl'
// //     //                     animate={{ y: [0, 15, 0] }}
// //     //                     transition={{ repeat: Infinity, duration: 2.2 }}
// //     //                 >
// //     //                     <FaRocket size={30} />
// //     //                 </motion.div>
// //     //             </motion.div>
// //     //         </div>
// //     //     </div>

// //     //     {/* Background Overlay */}
// //     //     <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none'></div>
// //     // </section>
// // }

// // export default Hero

// // import React from 'react'
// // import { motion } from "framer-motion"
// // import { FaPenFancy, FaLaptopCode, FaGlobe, FaRocket } from 'react-icons/fa'

// // const Hero = () => {
// //     return (
// //         <section className='relative flex-1 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white pt-28 pb-32 overflow-hidden'>

// //             {/* Background Animated Blobs */}
// //             <motion.div
// //                 className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-blob"
// //                 animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
// //                 transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
// //             />
// //             <motion.div
// //                 className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"
// //                 animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
// //                 transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
// //             />
// //             <motion.div
// //                 className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500 rounded-full filter blur-2xl opacity-40 animate-blob animation-delay-4000"
// //                 animate={{ scale: [1, 1.2, 1], rotate: [0, 60, 0] }}
// //                 transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
// //             />

// //             <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-around md:space-x-12 relative z-10'>

// //                 {/* Left Section */}
// //                 <div className='text-center md:text-left space-y-6 max-w-lg'>
// //                     <motion.h1
// //                         initial={{ opacity: 0, y: -40 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         transition={{ duration: 0.8 }}
// //                         className='text-5xl md:text-6xl font-extrabold leading-tight tracking-tight'>
// //                         Share Your Thoughts <br />
// //                         <span className='text-pink-400 hover:text-pink-300 transition-colors duration-300'>
// //                             In a Modern Way
// //                         </span>
// //                     </motion.h1>

// //                     <motion.p
// //                         initial={{ opacity: 0, y: 20 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         transition={{ delay: 0.4, duration: 1 }}
// //                         className='text-gray-300 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed tracking-wide'
// //                     >
// //                         Explore your <span className="text-pink-400 font-semibold">imagination</span>, ignite
// //                         <span className="text-indigo-400 font-semibold"> conversations</span>, and inspire
// //                         <span className="text-purple-400 font-semibold"> others</span> through your stories, ideas, and creativity.
// //                         Whether it’s a <span className="text-yellow-400 font-semibold">quick thought</span>, a
// //                         <span className="text-pink-400 font-semibold"> deep insight</span>, or a
// //                         <span className="text-indigo-400 font-semibold"> bold idea</span>, this platform lets your voice resonate across the globe—
// //                         turning ordinary words into <span className="text-purple-400 font-semibold">extraordinary connections</span>.
// //                     </motion.p>

// //                 </div>

// //                 {/* Right Section / Floating Icons */}
// //                 <div className='relative mt-12 md:mt-0'>
// //                     <motion.div
// //                         className='relative w-72 h-72 md:w-96 md:h-96'
// //                         initial={{ scale: 0.8, opacity: 0 }}
// //                         animate={{ scale: 1, opacity: 1 }}
// //                         transition={{ duration: 0.8 }}
// //                     >
// //                         {/* Pen Icon */}
// //                         <motion.div
// //                             className='absolute top-0 left-1/2 -translate-x-1/2 bg-gray-800 text-pink-500 rounded-full p-5 shadow-lg'
// //                             animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
// //                             transition={{ repeat: Infinity, duration: 2 }}
// //                         >
// //                             <FaPenFancy size={30} />
// //                         </motion.div>

// //                         {/* Laptop Icon */}
// //                         <motion.div
// //                             className='absolute top-1/4 right-0 bg-gray-800 text-indigo-400 rounded-full p-5 shadow-lg'
// //                             animate={{ y: [0, 10, 0], rotate: [0, -10, 10, 0] }}
// //                             transition={{ repeat: Infinity, duration: 2.5 }}
// //                         >
// //                             <FaLaptopCode size={30} />
// //                         </motion.div>

// //                         {/* Globe Icon */}
// //                         <motion.div
// //                             className='absolute top-1/4 left-0 bg-gray-800 text-purple-400 rounded-full p-5 shadow-lg'
// //                             animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
// //                             transition={{ repeat: Infinity, duration: 3 }}
// //                         >
// //                             <FaGlobe size={30} />
// //                         </motion.div>

// //                         {/* Rocket Icon */}
// //                         <motion.div
// //                             className='absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-gray-800 text-yellow-400 rounded-full p-5 shadow-lg'
// //                             animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
// //                             transition={{ repeat: Infinity, duration: 2.2 }}
// //                         >
// //                             <FaRocket size={30} />
// //                         </motion.div>
// //                     </motion.div>
// //                 </div>

// //             </div>

// //             {/* Background Overlay / Particles */}
// //             <div className='absolute inset-0 pointer-events-none'>
// //                 <div className='absolute w-full h-full'>
// //                     {[...Array(30)].map((_, i) => (
// //                         <motion.div
// //                             key={i}
// //                             className='absolute bg-white/20 rounded-full'
// //                             style={{
// //                                 width: Math.random() * 4 + 2,
// //                                 height: Math.random() * 4 + 2,
// //                                 top: `${Math.random() * 100}%`,
// //                                 left: `${Math.random() * 100}%`,
// //                             }}
// //                             animate={{ y: [0, -10, 0] }}
// //                             transition={{ repeat: Infinity, duration: Math.random() * 4 + 3, delay: Math.random() * 2 }}
// //                         />
// //                     ))}
// //                 </div>
// //             </div>

// //         </section>
// //     )
// // }

// // export default Hero


// import React from 'react'
// import { motion } from "framer-motion"
// import { FaPenFancy, FaLaptopCode, FaGlobe, FaRocket } from 'react-icons/fa'

// const Hero = () => {
//   return (
//     <section className='relative bg-gray-900 text-white pt-28 pb-32 overflow-hidden' style={{ background: 'radial-gradient(ellipse at bottom, #0b0c1a 0%, #000000 100%)' }}>

//       {/* Stars */}
//       <div className='absolute inset-0 overflow-hidden'>
//         {[...Array(80)].map((_, i) => (
//           <motion.div
//             key={i}
//             className='absolute bg-white rounded-full'
//             style={{
//               width: Math.random() * 2 + 1,
//               height: Math.random() * 2 + 1,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               opacity: Math.random(),
//             }}
//             animate={{ y: [0, -10, 0] }}
//             transition={{ repeat: Infinity, duration: Math.random() * 5 + 5, delay: Math.random() * 3 }}
//           />
//         ))}
//       </div>

//       <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-around md:space-x-12 relative z-10'>

//         {/* Left Section */}
//         <div className='text-center md:text-left space-y-6 max-w-lg'>
//           <motion.h1
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className='text-5xl md:text-6xl font-extrabold leading-tight tracking-tight'>
//             Explore Your Thoughts <br />
//             <span className='text-purple-400 hover:text-purple-300 transition-colors duration-300'>
//               Across the Universe
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 1 }}
//             className='text-gray-300 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed tracking-wide'
//           >
//             Ignite your <span className="font-semibold">creativity</span>, spark <span className="font-semibold">conversations</span>,
//             and let your ideas soar through the <span className="font-semibold">cosmic horizon</span>. Share stories, insights, and
//             dreams that resonate across the galaxy.
//           </motion.p>
//         </div>

//         {/* Right Section / Floating Icons */}
//         <div className='relative mt-12 md:mt-0'>
//           <motion.div
//             className='relative w-72 h-72 md:w-96 md:h-96'
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             {/* Pen Icon */}
//             <motion.div
//               className='absolute top-0 left-1/2 -translate-x-1/2 bg-gray-800 text-pink-500 rounded-full p-5 shadow-lg'
//               animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//             >
//               <FaPenFancy size={30} />
//             </motion.div>

//             {/* Laptop Icon */}
//             <motion.div
//               className='absolute top-1/4 right-0 bg-gray-800 text-indigo-400 rounded-full p-5 shadow-lg'
//               animate={{ y: [0, 10, 0], rotate: [0, -10, 10, 0] }}
//               transition={{ repeat: Infinity, duration: 2.5 }}
//             >
//               <FaLaptopCode size={30} />
//             </motion.div>

//             {/* Globe Icon */}
//             <motion.div
//               className='absolute top-1/4 left-0 bg-gray-800 text-purple-400 rounded-full p-5 shadow-lg'
//               animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 3 }}
//             >
//               <FaGlobe size={30} />
//             </motion.div>

//             {/* Rocket Icon */}
//             <motion.div
//               className='absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-gray-800 text-yellow-400 rounded-full p-5 shadow-lg'
//               animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
//               transition={{ repeat: Infinity, duration: 2.2 }}
//             >
//               <FaRocket size={30} />
//             </motion.div>
//           </motion.div>
//         </div>

//       </div>

//     </section>
//   )
// }

// export default Hero




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


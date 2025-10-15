import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white py-10 mt-20'>
            <div className='container mx-auto text-center'>
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center space-x-6 mb-4"
            
            >
                <a href="#" className='hover:text-indigo-500 transition-colors'>
                    <FaFacebook size={24}/>
                </a>
                <a href="#" className='hover:text-indigo-500 transition-colors'>
                    <FaInstagram size={24}/>
                </a>
                <a href="#" className='hover:text-indigo-500 transition-colors'>
                    <FaTwitter size={24}/>
                </a>

            </motion.div>

            <motion.p
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            transition={{delay:0.5, duration:0.5}}>
                &copy;{new Date().getFullYear()} BlogPost. All rights reserved.

            </motion.p>
        </div>
    </footer>
  )
}

export default Footer
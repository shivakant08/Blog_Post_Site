import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#050505] via-[#0d0d0d] to-[#161616] text-gray-300 py-12 border-t border-gray-800 mt-10">
      
      {/* 🌌 Floating Animated Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bubble 1 */}
        <motion.div
          className="absolute bg-blue-500/20 rounded-full blur-3xl"
          style={{ width: 150, height: 150, top: "20%", left: "10%" }}
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Bubble 2 */}
        <motion.div
          className="absolute bg-purple-500/20 rounded-full blur-3xl"
          style={{ width: 200, height: 200, top: "50%", left: "70%" }}
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Bubble 3 */}
        <motion.div
          className="absolute bg-pink-500/20 rounded-full blur-3xl"
          style={{ width: 120, height: 120, bottom: "10%", left: "40%" }}
          animate={{
            y: [0, 25, 0],
            x: [0, -10, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 🌐 Main Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative container mx-auto flex flex-col items-center text-center z-10"
      >
        {/* Social Icons */}
        <div className="flex space-x-6 mb-6">
          {[
            { Icon: FaFacebook, href: "#" },
            { Icon: FaInstagram, href: "#" },
            { Icon: FaTwitter, href: "#" },
            { Icon: FaLinkedin, href: "#" },
            { Icon: FaGithub, href: "#" },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              whileHover={{ scale: 1.3, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-blue-500 transition-all duration-300"
            >
              <Icon size={26} />
            </motion.a>
          ))}
        </div>

        {/* Divider Line */}
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-400"
        >
          © {new Date().getFullYear()} <span className="text-blue-500 font-semibold">BlogPost</span>. All rights reserved.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs mt-2 text-gray-500"
        >
          Crafted with <span className="text-red-500">❤️</span> by the BlogPost team.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;

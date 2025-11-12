import React, { useState, useEffect, useContext } from "react";
import { FaBlog, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ onOpenAuthModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const { user, logout } = useContext(AuthContext);

  const getAvatarUrl = (avatar, name = "User") => {
    if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=111827&color=fff`;
    }
    if (avatar.startsWith("http")) return avatar;
    return `http://localhost:5000${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNavLinks(user ? ["Home", "Explore", "Users", "Profile"] : []);
  }, [user]);

  return (
    <header className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 w-[94%] md:w-[85%] lg:w-[75%] z-[1200]">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`relative w-full rounded-2xl overflow-hidden backdrop-blur-2xl
        transition-all duration-300
        bg-gradient-to-br from-[#0b0f19] via-[#0d1224] to-[#0a0d1a]
        shadow-[0_8px_40px_rgba(0,0,0,0.65)]
        border border-[#1b2135]
        ${scrolled ? "scale-[1.015] shadow-[0_10px_50px_rgba(0,0,0,0.75)]" : ""}`}
      >
        {/* Reflection Bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        {/* Glow Border */}
        <div className="absolute inset-0 rounded-2xl border border-indigo-500/10 pointer-events-none" />
        {/* Animated Sheen */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: ["-150%", "150%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl pointer-events-none"
        />
        {/* Blue Ambient Glow */}
        <div className="absolute -bottom-6 left-[10%] w-[80%] h-10 bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* Main Nav */}
        <div className="relative px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xl font-bold text-white"
          >
            <FaBlog className="text-2xl text-indigo-400 drop-shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
            <span className="tracking-wide">BlogPost</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8 font-medium text-gray-300">
              {navLinks.map((link, index) => {
                const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
                return (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.2 }}
                    className="hover:text-indigo-400 transition cursor-pointer"
                  >
                    <Link to={path}>{link}</Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Auth / User Section */}
            {user ? (
              <div className="flex items-center gap-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={getAvatarUrl(user.avatar, user.name)}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-gray-700 shadow-lg"
                />
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-white shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => onOpenAuthModal("signup")}
                  className="px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => onOpenAuthModal("signin")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium shadow"
                >
                  Sign In
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="md:hidden text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="md:hidden bg-[#12182e] border-t border-[#1c264a] px-6 py-5 rounded-b-2xl text-white"
            >
              <ul className="flex flex-col gap-5 text-lg font-medium">
                {navLinks.map((link) => {
                  const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
                  return (
                    <li key={link}>
                      <Link
                        to={path}
                        onClick={() => setIsOpen(false)}
                        className="hover:text-indigo-400"
                      >
                        {link}
                      </Link>
                    </li>
                  );
                })}

                {!user ? (
                  <>
                    <button
                      onClick={() => onOpenAuthModal("signin")}
                      className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => onOpenAuthModal("signup")}
                      className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                  >
                    Logout
                  </button>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;

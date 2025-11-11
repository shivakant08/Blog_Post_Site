// import React, { useState, useEffect, useContext } from "react";
// import { FaBlog, FaBars, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Header = ({ onOpenAuthModal }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [navLinks, setNavLinks] = useState([]);
//   const { user, logout } = useContext(AuthContext);

//   const getAvatarUrl = (avatar, name = "User") => {
//     if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
//       return `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         name
//       )}&background=4F46E5&color=fff`;
//     }
//     if (avatar.startsWith("http")) return avatar;
//     return `http://localhost:5000${
//       avatar.startsWith("/") ? avatar : `/${avatar}`
//     }`;
//   };

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setNavLinks(["Home", "Explore", "Users", "Profile"]);
//     } else {
//       setNavLinks([]);
//     }
//   }, [user]);

//   const navVariants = {
//     hidden: { opacity: 0, y: -8 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.07, duration: 0.23 },
//     }),
//   };

//   return (
//     <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[94%] md:w-[85%] lg:w-[75%] z-[2000]">
//       {/* Floating Container */}
//       <motion.div
//         className={`relative w-full rounded-2xl overflow-hidden 
//           border backdrop-blur-xl transition-all
//           ${scrolled ? "border-gray-800 bg-[#0b0b0b]/80 shadow-2xl shadow-black/50 scale-[1.01]" 
//                      : "border-gray-900 bg-[#0a0a0a]/60 shadow-lg shadow-black/40"}
//         `}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         {/* Soft Animated Blue Highlight */}
//         <motion.div
//           className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,90,255,0.08),transparent_70%)] pointer-events-none"
//           animate={{ opacity: [0.12, 0.18, 0.12] }}
//           transition={{ duration: 7, repeat: Infinity }}
//         />

//         {/* NAV CONTENT */}
//         <div className="relative px-6 py-4 flex justify-between items-center">

//           {/* Logo */}
//           <motion.div
//             initial={{ opacity: 0, x: -18 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-2 text-xl font-bold text-white"
//           >
//             <FaBlog className="text-2xl text-indigo-400 drop-shadow-[0_0_6px_rgba(79,70,229,0.4)]" />
//             <span className="tracking-wide">BlogPost</span>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-10">
//             <ul className="flex items-center gap-8 font-medium text-gray-300">
//               {navLinks.map((link, index) => {
//                 const path =
//                   link === "Home"
//                     ? "/"
//                     : `/${link.toLowerCase().replace(" ", "-")}`;

//                 return (
//                   <motion.li
//                     key={link}
//                     custom={index}
//                     initial="hidden"
//                     animate="visible"
//                     variants={navVariants}
//                     className="hover:text-indigo-400 transition cursor-pointer"
//                   >
//                     <Link to={path}>{link}</Link>
//                   </motion.li>
//                 );
//               })}
//             </ul>

//             {/* Right Section */}
//             {user ? (
//               <div className="flex items-center gap-4">
//                 <motion.img
//                   whileHover={{ scale: 1.07 }}
//                   src={getAvatarUrl(user.avatar, user.name)}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full border border-gray-700 object-cover shadow shadow-black/60"
//                 />

//                 <button
//                   onClick={logout}
//                   className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold shadow text-white"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => onOpenAuthModal("signup")}
//                   className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-white font-medium transition"
//                 >
//                   Sign Up
//                 </button>

//                 <button
//                   onClick={() => onOpenAuthModal("signin")}
//                   className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium shadow"
//                 >
//                   Sign In
//                 </button>
//               </div>
//             )}
//           </nav>

//           {/* Mobile Menu Trigger */}
//           <motion.div
//             whileTap={{ scale: 0.9 }}
//             className="md:hidden text-white text-2xl cursor-pointer"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </motion.div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="md:hidden bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-gray-800 px-6 py-5 text-white rounded-b-2xl"
//             >
//               <ul className="flex flex-col gap-5 text-lg font-medium">
//                 {navLinks.map((link) => {
//                   const path =
//                     link === "Home"
//                       ? "/"
//                       : `/${link.toLowerCase().replace(" ", "-")}`;

//                   return (
//                     <li
//                       key={link}
//                       className="hover:text-indigo-400 transition"
//                     >
//                       <Link to={path} onClick={() => setIsOpen(false)}>
//                         {link}
//                       </Link>
//                     </li>
//                   );
//                 })}

//                 {!user ? (
//                   <>
//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signin");
//                         setIsOpen(false);
//                       }}
//                       className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
//                     >
//                       Sign In
//                     </button>

//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signup");
//                         setIsOpen(false);
//                       }}
//                       className="w-full px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/20 rounded-lg"
//                     >
//                       Sign Up
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsOpen(false);
//                     }}
//                     className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </ul>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </header>
//   );
// };

// export default Header;


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

  const navVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.22 },
    }),
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[94%] md:w-[85%] lg:w-[75%] z-[3000]">

      {/* OUTER SHADOW + FLOATING EFFECT */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`
      relative w-full rounded-2xl overflow-hidden backdrop-blur-2xl
      transition-all duration-300

      /* ✅ Premium Solid Gradient */
      bg-gradient-to-br from-[#0b0f19] via-[#0d1224] to-[#0a0d1a]

      /* ✅ Strong Separation */
      shadow-[0_8px_40px_rgba(0,0,0,0.65)]
      border border-[#1b2135]

      /* Scale-up when scrolled */
      ${scrolled ? "scale-[1.015] shadow-[0_10px_50px_rgba(0,0,0,0.75)]" : ""}
    `}
      >

        {/* ✅ TOP REFLECTION BAR / APPLE-LIKE GLASS STRIP */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* ✅ INNER NEON GLOW RING */}
        <div className="absolute inset-0 rounded-2xl border-[1px] border-indigo-500/10 pointer-events-none" />

        {/* ✅ HOVER SHEEN ANIMATION */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: ["-150%", "150%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl pointer-events-none"
        />

        {/* ✅ LOWER AMBIENT BLUE GLOW */}
        <div className="absolute -bottom-6 left-[10%] w-[80%] h-10 bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* ✅ MAIN NAV CONTENT */}
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

            {/* USER SECTION */}
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

          {/* Mobile Toggle */}
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="md:hidden text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </div>

        {/* Mobile Menu */}
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
                      <Link to={path} onClick={() => setIsOpen(false)} className="hover:text-indigo-400">
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


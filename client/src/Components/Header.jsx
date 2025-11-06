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

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
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
//     hidden: { opacity: 0, y: -20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.3 },
//     }),
//   };

//   return (
//     <header
//       className={`fixed w-full z-[1000] transition-shadow bg-indigo-600 ${
//         scrolled ? "shadow-lg" : ""
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center space-x-2 text-xl font-bold text-white"
//         >
//           <FaBlog className="text-2xl" />
//           <span>BlogPost</span>
//         </motion.div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-10">
//           <ul className="flex space-x-10 text-white font-medium">
//             {navLinks.map((link, index) => {
//               const path =
//                 link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
//               return (
//                 <motion.li
//                   key={link}
//                   custom={index}
//                   initial="hidden"
//                   animate="visible"
//                   variants={navVariants}
//                   className="hover:text-gray-200 transition-colors cursor-pointer"
//                 >
//                   <Link to={path}>{link}</Link>
//                 </motion.li>
//               );
//             })}
//           </ul>

//           {user ? (
//             <div className="flex items-center gap-4">
//               {/* Avatar */}
//               <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
//                 {user?.avatar ? (
//                   <img
//                     src={user.avatar}
//                     alt="User Avatar"
//                     className="w-10 h-10 rounded-full border-2 border-white object-cover"
//                   />
//                 ) : (
//                   <div className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">
//                     {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
//                   </div>
//                 )}
//               </motion.div>

//               {/* Logout Button */}
//               <button
//                 onClick={logout}
//                 className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex gap-3">
//               <button
//                 onClick={() => onOpenAuthModal("signup")}
//                 className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => onOpenAuthModal("signin")}
//                 className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Sign In
//               </button>
//             </div>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <motion.div
//             whileTap={{ scale: 0.9 }}
//             className="cursor-pointer text-white text-2xl"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </motion.div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-indigo-600 shadow-lg"
//           >
//             <ul className="flex flex-col text-white font-medium px-6 py-4 space-y-4">
//               {navLinks.map((link) => {
//                 const path =
//                   link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
//                 return (
//                   <li
//                     key={link}
//                     className="hover:text-gray-200 transition-colors cursor-pointer"
//                   >
//                     <Link to={path} onClick={() => setIsOpen(false)}>
//                       {link}
//                     </Link>
//                   </li>
//                 );
//               })}

//               {!user ? (
//                 <>
//                   <li>
//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signin");
//                         setIsOpen(false);
//                       }}
//                       className="w-full border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//                     >
//                       Sign In
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signup");
//                         setIsOpen(false);
//                       }}
//                       className="w-full bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//                     >
//                       Sign Up
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li className="flex items-center gap-4">
//                   {/* Avatar */}
//                   {user?.avatar ? (
//                     <img
//                       src={`http://localhost:5000${user.avatar}`}
//                       alt="User Avatar"
//                       className="w-10 h-10 rounded-full border-2 border-white object-cover"
//                       loading="lazy"
//                       onError={(e)=>(e.target.src = "/default-avatar.png")}
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">
//                       {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
//                     </div>
//                   )}

//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsOpen(false);
//                     }}
//                     className="flex-1 bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;



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

//   // ✅ Build correct avatar URL or fallback
//   const getAvatarUrl = (avatar, name = "User") => {
//     if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
//       return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
//     }
//     if (avatar.startsWith("http")) return avatar;
//     return `http://localhost:5000${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
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
//     hidden: { opacity: 0, y: -20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.3 },
//     }),
//   };

//   return (
//     <header
//       className={`fixed w-full z-[1000] transition-shadow bg-indigo-600 ${
//         scrolled ? "shadow-lg" : ""
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center space-x-2 text-xl font-bold text-white"
//         >
//           <FaBlog className="text-2xl" />
//           <span>BlogPost</span>
//         </motion.div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-10">
//           <ul className="flex space-x-10 text-white font-medium">
//             {navLinks.map((link, index) => {
//               const path =
//                 link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
//               return (
//                 <motion.li
//                   key={link}
//                   custom={index}
//                   initial="hidden"
//                   animate="visible"
//                   variants={navVariants}
//                   className="hover:text-gray-200 transition-colors cursor-pointer"
//                 >
//                   <Link to={path}>{link}</Link>
//                 </motion.li>
//               );
//             })}
//           </ul>

//           {user ? (
//             <div className="flex items-center gap-4">
//               {/* Avatar */}
//               <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
//                 <img
//                   src={getAvatarUrl(user.avatar, user.name)}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full border-2 border-white object-cover"
//                   onError={(e) => {
//                     e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       user.name || "User"
//                     )}&background=6366f1&color=fff`;
//                   }}
//                 />
//               </motion.div>

//               {/* Logout Button */}
//               <button
//                 onClick={logout}
//                 className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex gap-3">
//               <button
//                 onClick={() => onOpenAuthModal("signup")}
//                 className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => onOpenAuthModal("signin")}
//                 className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Sign In
//               </button>
//             </div>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <motion.div
//             whileTap={{ scale: 0.9 }}
//             className="cursor-pointer text-white text-2xl"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </motion.div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-indigo-600 shadow-lg"
//           >
//             <ul className="flex flex-col text-white font-medium px-6 py-4 space-y-4">
//               {navLinks.map((link) => {
//                 const path =
//                   link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
//                 return (
//                   <li
//                     key={link}
//                     className="hover:text-gray-200 transition-colors cursor-pointer"
//                   >
//                     <Link to={path} onClick={() => setIsOpen(false)}>
//                       {link}
//                     </Link>
//                   </li>
//                 );
//               })}

//               {!user ? (
//                 <>
//                   <li>
//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signin");
//                         setIsOpen(false);
//                       }}
//                       className="w-full border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//                     >
//                       Sign In
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signup");
//                         setIsOpen(false);
//                       }}
//                       className="w-full bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//                     >
//                       Sign Up
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li className="flex items-center gap-4">
//                   <img
//                     src={getAvatarUrl(user.avatar, user.name)}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full border-2 border-white object-cover"
//                     onError={(e) => {
//                       e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                         user.name || "User"
//                       )}&background=6366f1&color=fff`;
//                     }}
//                   />

//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsOpen(false);
//                     }}
//                     className="flex-1 bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;




// import React, { useState, useEffect, useContext } from "react";
// import { FaBlog, FaBars, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Header = ({ onOpenAuthModal }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [navLinks, setNavLinks] = useState([]);
//   const [avatarUrl, setAvatarUrl] = useState("");
//   const { user, logout } = useContext(AuthContext);

//   // ✅ Helper function to safely get the correct avatar URL
//   const getAvatarUrl = (avatar, name = "User") => {
//     if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
//       return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
//     }
//     if (avatar.startsWith("http")) return avatar;
//     return `http://localhost:5000${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
//   };

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setNavLinks(["Home", "Explore", "Users", "Profile"]);

//       // ✅ Always refresh avatar when user updates
//       const resolvedAvatar = getAvatarUrl(user.avatar, user.name);
//       setAvatarUrl(resolvedAvatar);
//     } else {
//       setNavLinks([]);
//       setAvatarUrl("");
//     }
//   }, [user]);

//   const navVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.3 },
//     }),
//   };

//   return (
//     <header
//       className={`fixed w-full z-[1000] transition-shadow bg-indigo-600 ${
//         scrolled ? "shadow-lg" : ""
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center space-x-2 text-xl font-bold text-white"
//         >
//           <FaBlog className="text-2xl" />
//           <span>BlogPost</span>
//         </motion.div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-10">
//           <ul className="flex space-x-10 text-white font-medium">
//             {navLinks.map((link, index) => {
//               const path =
//                 link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
//               return (
//                 <motion.li
//                   key={link}
//                   custom={index}
//                   initial="hidden"
//                   animate="visible"
//                   variants={navVariants}
//                   className="hover:text-gray-200 transition-colors cursor-pointer"
//                 >
//                   <Link to={path}>{link}</Link>
//                 </motion.li>
//               );
//             })}
//           </ul>

//           {user ? (
//             <div className="flex items-center gap-4">
//               {/* Avatar */}
//               <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
//                 <img
//                   src={avatarUrl}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full border-2 border-white object-cover"
//                   onError={(e) => {
//                     e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       user.name || "User"
//                     )}&background=6366f1&color=fff`;
//                   }}
//                 />
//               </motion.div>

//               {/* Logout Button */}
//               <button
//                 onClick={logout}
//                 className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex gap-3">
//               <button
//                 onClick={() => onOpenAuthModal("signup")}
//                 className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => onOpenAuthModal("signin")}
//                 className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Sign In
//               </button>
//             </div>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <motion.div
//             whileTap={{ scale: 0.9 }}
//             className="cursor-pointer text-white text-2xl"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </motion.div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-indigo-600 shadow-lg"
//           >
//             <ul className="flex flex-col text-white font-medium px-6 py-4 space-y-4">
//               {navLinks.map((link) => {
//                 const path =
//                   link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
//                 return (
//                   <li
//                     key={link}
//                     className="hover:text-gray-200 transition-colors cursor-pointer"
//                   >
//                     <Link to={path} onClick={() => setIsOpen(false)}>
//                       {link}
//                     </Link>
//                   </li>
//                 );
//               })}

//               {!user ? (
//                 <>
//                   <li>
//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signin");
//                         setIsOpen(false);
//                       }}
//                       className="w-full border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//                     >
//                       Sign In
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => {
//                         onOpenAuthModal("signup");
//                         setIsOpen(false);
//                       }}
//                       className="w-full bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//                     >
//                       Sign Up
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li className="flex items-center gap-4">
//                   <img
//                     src={avatarUrl}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full border-2 border-white object-cover"
//                     onError={(e) => {
//                       e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                         user.name || "User"
//                       )}&background=6366f1&color=fff`;
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsOpen(false);
//                     }}
//                     className="flex-1 bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
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
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { user, logout } = useContext(AuthContext);

  // ✅ Helper function to safely build avatar URL
  const getAvatarUrl = (avatar, name = "User") => {
    if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
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
    if (user) {
      setNavLinks(["Home", "Explore", "Users", "Profile"]);

      // ✅ Always refresh avatar safely
      const resolvedAvatar = getAvatarUrl(user.avatar, user.name);
      setAvatarUrl(resolvedAvatar);
    } else {
      setNavLinks([]);
      setAvatarUrl(null);
    }
  }, [user]);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <header
      className={`fixed w-full z-[1000] transition-shadow bg-indigo-600 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-xl font-bold text-white"
        >
          <FaBlog className="text-2xl" />
          <span>BlogPost</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <ul className="flex space-x-10 text-white font-medium">
            {navLinks.map((link, index) => {
              const path =
                link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
              return (
                <motion.li
                  key={link}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navVariants}
                  className="hover:text-gray-200 transition-colors cursor-pointer"
                >
                  <Link to={path}>{link}</Link>
                </motion.li>
              );
            })}
          </ul>

          {user ? (
            <div className="flex items-center gap-4">
              {/* ✅ Safe Avatar Rendering */}
              <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user?.name || "User"}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "User"
                      )}&background=6366f1&color=fff`;
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </motion.div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => onOpenAuthModal("signup")}
                className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => onOpenAuthModal("signin")}
                className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Sign In
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-indigo-600 shadow-lg"
          >
            <ul className="flex flex-col text-white font-medium px-6 py-4 space-y-4">
              {navLinks.map((link) => {
                const path =
                  link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
                return (
                  <li
                    key={link}
                    className="hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    <Link to={path} onClick={() => setIsOpen(false)}>
                      {link}
                    </Link>
                  </li>
                );
              })}

              {!user ? (
                <>
                  <li>
                    <button
                      onClick={() => {
                        onOpenAuthModal("signin");
                        setIsOpen(false);
                      }}
                      className="w-full border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                      Sign In
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onOpenAuthModal("signup");
                        setIsOpen(false);
                      }}
                      className="w-full bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex items-center gap-4">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user?.name || "User"}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user?.name || "User"
                        )}&background=6366f1&color=fff`;
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex-1 bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

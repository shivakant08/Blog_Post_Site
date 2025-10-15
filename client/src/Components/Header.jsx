



// // // src/components/Header.jsx
// // import React, { useState, useEffect } from "react";
// // import { FaBlog, FaSun, FaBars, FaTimes } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";

// // const navLinks = ["Home", "About", "Blog", "Contact"];

// // const Header = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 20);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Framer Motion variants for nav links
// //   const navVariants = {
// //     hidden: { opacity: 0, y: -20 },
// //     visible: (i) => ({
// //       opacity: 1,
// //       y: 0,
// //       transition: { delay: i * 0.1, duration: 0.3 },
// //     }),
// //   };

// //   return (
// //     <header
// //       className={`fixed w-full z-50 transition-shadow bg-white ${
// //         scrolled ? "shadow-lg" : ""
// //       }`}
// //     >
// //       <div className="container mx-auto flex justify-between items-center py-4 px-6">
// //         {/* Logo */}
// //         <motion.div
// //           initial={{ x: -50, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           transition={{ duration: 0.5 }}
// //           className="flex items-center space-x-2 text-xl font-bold text-indigo-600"
// //         >
// //           <FaBlog className="text-2xl" />
// //           <span>MyBlog</span>
// //         </motion.div>

// //         {/* Desktop Navigation */}
// //         <nav className="hidden md:flex items-center space-x-10">
// //           <ul className="flex space-x-10 text-gray-700 font-medium">
// //             {navLinks.map((link, index) => (
// //               <motion.li
// //                 key={link}
// //                 custom={index}
// //                 initial="hidden"
// //                 animate="visible"
// //                 variants={navVariants}
// //                 className="hover:text-indigo-600 transition-colors cursor-pointer"
// //               >
// //                 {link}
// //               </motion.li>
// //             ))}
// //           </ul>

// //           <motion.div
// //             whileHover={{ scale: 1.2 }}
// //             className="ml-6 cursor-pointer text-gray-700"
// //           >
// //             <FaSun className="text-xl" />
// //           </motion.div>
// //         </nav>

// //         {/* Mobile Menu Button */}
// //         <div className="md:hidden flex items-center">
// //           <motion.div
// //             whileTap={{ scale: 0.9 }}
// //             className="cursor-pointer text-gray-700 text-2xl"
// //             onClick={() => setIsOpen(!isOpen)}
// //           >
// //             {isOpen ? <FaTimes /> : <FaBars />}
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -50 }}
// //             transition={{ duration: 0.3 }}
// //             className="md:hidden bg-white shadow-lg"
// //           >
// //             <ul className="flex flex-col text-gray-700 font-medium px-6 py-4 space-y-4">
// //               {navLinks.map((link) => (
// //                 <li
// //                   key={link}
// //                   className="hover:text-indigo-600 transition-colors cursor-pointer"
// //                 >
// //                   {link}
// //                 </li>
// //               ))}
// //               <li className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center space-x-2">
// //                 <FaSun /> <span>Toggle Mode</span>
// //               </li>
// //             </ul>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </header>
// //   );
// // };

// // export default Header;

// import React, { useState, useEffect } from "react";
// import { FaBlog, FaSun, FaBars, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const navLinks = ["Home", "About", "Blog", "Contact"];

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

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
//       className={`fixed w-full z-[1000] transition-shadow bg-white ${
//         scrolled ? "shadow-lg" : ""
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center space-x-2 text-xl font-bold text-indigo-600"
//         >
//           <FaBlog className="text-2xl" />
//           <span>BlogPost</span>
//         </motion.div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-10">
//           <ul className="flex space-x-10 text-gray-400 font-medium">
//             {navLinks.map((link, index) => (
//               <motion.li
//                 key={link}
//                 custom={index}
//                 initial="hidden"
//                 animate="visible"
//                 variants={navVariants}
//                 className="hover:text-indigo-600 transition-colors cursor-pointer"
//               >
//                 {link}
//               </motion.li>
//             ))}
//           </ul>

//           <motion.div
//             whileHover={{ scale: 1.2 }}
//             className="ml-6 cursor-pointer text-gray-600"
//           >
//             <FaSun className="text-xl" />
//           </motion.div>
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <motion.div
//             whileTap={{ scale: 0.9 }}
//             className="cursor-pointer text-gray-500 text-2xl"
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
//             className="md:hidden bg-white shadow-lg"
//           >
//             <ul className="flex flex-col text-gray-500 font-medium px-6 py-4 space-y-4">
//               {navLinks.map((link) => (
//                 <li
//                   key={link}
//                   className="hover:text-indigo-600 transition-colors cursor-pointer"
//                 >
//                   {link}
//                 </li>
//               ))}
//               <li className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center space-x-2">
//                 <FaSun /> <span>Toggle Mode</span>
//               </li>
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;



import React, { useState, useEffect } from "react";
import { FaBlog, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "About", "Blog", "Contact"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="container mx-auto flex justify-around items-center py-4 px-6">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-xl font-bold text-white"
        >
          <FaBlog className="text-2xl" />
          <span>MyBlog</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <ul className="flex space-x-10 text-white font-medium">
            {navLinks.map((link, index) => (
              <motion.li
                key={link}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className="hover:text-gray-200 transition-colors cursor-pointer"
              >
                {link}
              </motion.li>
            ))}
          </ul>

          <motion.div
            whileHover={{ scale: 1.2 }}
            className="ml-6 cursor-pointer text-white"
          >
            <FaSun className="text-xl" />
          </motion.div>
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
              {navLinks.map((link) => (
                <li
                  key={link}
                  className="hover:text-gray-200 transition-colors cursor-pointer"
                >
                  {link}
                </li>
              ))}
              <li className="hover:text-gray-200 transition-colors cursor-pointer flex items-center space-x-2">
                <FaSun /> <span>Toggle Mode</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

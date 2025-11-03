import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🖼️ Hero Banner Images
  const bannerImages = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80", // tech
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80", // travel
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80", // food
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1500&q=80", // business
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80", // ideas
  ];

  useEffect(() => {
    // simulate small loading before showing content
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-300 text-lg animate-pulse">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* 🏞️ Hero Section */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={bannerImages[Math.floor(Math.random() * bannerImages.length)]}
            alt="Blog banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <motion.h1
            className="text-5xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore Inspiring Blogs
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover stories, insights, and experiences shared by our amazing
            community.
          </motion.p>
        </div>

        {/* {user && (
          <motion.button
            onClick={() => navigate("/create-post")}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.1,
              rotate: 6,
            }}
            whileTap={{ scale: 0.97, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center"
            aria-label="Create a new Post"
            title="Create Post"
          >
            <FaPlus size={20} className="sm:text-lg" />
          </motion.button>
        )} */}
      </section>

      {/* ✨ Animated Feature Section */}
      <main className="flex-grow">
        <section className="max-w-6xl mx-auto px-6 py-16 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Share, Learn, and Grow
          </motion.h2>

          <motion.p
            className="text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to your creative space! Whether you're a writer, a reader, or just
            here for inspiration — start your journey with us.
          </motion.p>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {/* Card 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-blue-600 transition-all"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                Write Blogs
              </h3>
              <p className="text-gray-400">
                Express your thoughts and creativity. Share stories, ideas, and
                insights that inspire others.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-green-600 transition-all"
            >
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Discover Posts
              </h3>
              <p className="text-gray-400">
                Explore a variety of blogs from passionate authors in tech,
                travel, food, business, and more.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-yellow-600 transition-all"
            >
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Join Community
              </h3>
              <p className="text-gray-400">
                Connect with like-minded people, leave comments, and grow together.
              </p>
            </motion.div>
          </motion.div>

          <motion.button
            onClick={() => navigate("/explore")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            className="mt-12 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            Explore Blogs
          </motion.button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

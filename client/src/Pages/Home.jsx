import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { motion, scale } from "framer-motion";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  // 🖼️ Hero Banner Images
  const bannerImages = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80", // tech
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80", // travel
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80", // food
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1500&q=80", // business
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80", // ideas
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/v1/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-300 text-lg animate-pulse">
        Loading posts...
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
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Explore Inspiring Blogs
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Discover stories, insights, and experiences shared by our amazing
            community.
          </p>
        </div>

        {user && (
          <motion.button
          onClick={()=>navigate("/create-post")}
          initial={{scale:0, opacity: 0}}
          animate={{scale:1, opacity:1}}
          whileHover={{
            scale:1.1,
            rotate: 6,
            // boxShadow: "0px 0px 15px rgba(59,130,246,0.6)",
          }}
          whileTap={{scale:0.97, rotate:0}}
          transition={{type:"spring", stiffness:260, damping:20}}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Create a new Post"
          title="Create Post"
          >
           <FaPlus size={20} className="sm:text-lg"/>
          </motion.button>
        )}
      </section>

      {/* 📝 Posts Grid */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-10 tracking-wide text-gray-200">
            Latest Posts
          </h2>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet.</p>
          ) : (
            <motion.div
              className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {posts.map((post) => {
                // ✅ Use uploaded DB image if exists, else fallback image
                const image = post.image
                  ? `http://localhost:5000/${post.image}`
                  : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=80";

                return (
                  <Link key={post._id} to={`/post/${post._id}`}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 14,
                      }}
                      className="bg-[#111] rounded-xl border border-gray-800 shadow-md hover:shadow-gray-700/30 transition-all duration-300 overflow-hidden"
                    >
                      {/* 🖼️ Post Image */}
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={image}
                          alt={post.title}
                          className="h-full w-full object-cover transform hover:scale-110 transition duration-500"
                        />
                      </div>

                      {/* 📄 Content */}
                      <div className="p-5">
                        <h2 className="text-xl font-semibold text-gray-100 mb-2 hover:text-blue-400 transition">
                          {post.title}
                        </h2>

                        <div className="flex items-center mt-3">
                          <img
                            src={
                              post.author?.avatar
                                ? post.author.avatar.startsWith("http")
                                  ? post.author.avatar
                                  : `http://localhost:5000/${post.author.avatar}`
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover mr-3 border border-gray-700"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-300">
                              {post.author?.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;






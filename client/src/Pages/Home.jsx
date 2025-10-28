// import React, { useState, useEffect, useContext } from 'react'
// import axios from "axios"
// import { AuthContext } from "../context/AuthContext"
// import { toast } from "react-hot-toast"
// import { FaHeart, FaRegHeart } from 'react-icons/fa'
// import Hero from '../Components/Hero'
// import Footer from '../Components/Footer'

// const Home = () => {
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { user, token } = useContext(AuthContext)

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/v1/api/posts")
//         setPosts(res.data)
//       } catch (error) {
//         console.error("Error fetching posts:", error)
//         toast.error("Failed to load posts")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchPosts()
//   }, [])

//   const handleLike = async (postId) => {
//     if (!token) {
//       toast.error("Please login to like posts")
//       return
//     }

//     try {
//       const res = await axios.put(`http://localhost:5000/v1/api/posts/${postId}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       })

//       setPosts((prev) => prev.map((p) => (p._id === postId ? res.data.post : p)))
//     } catch (error) {
//       console.error("Error toggling like:", error)
//       toast.error("Something went wrong")
//     }
//   }

//   if (loading) return <div className='text-center mt-10'>Loading posts...</div>

//   return (
//     <div className='max-w-4xl mx-auto mt-10 p-4'>
//       <h1 className='text-3xl font-bold text-center mb-8'>📝 Latest Posts</h1>
//       {posts.length === 0 ? (
//         <p className='text-center text-gray-500'>No posts yet.</p>
//       ) : (
//         <div className='grid gap-6'>
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className='p-5 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300'>
//               <div className='flex items-center mb-4'>
//                 <img src={post.author?.avatar ? post.author.avatar.startsWith("http") ? post.author.avatar : `http://localhost:5000/${post.author.avatar}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                   alt="avatar"
//                   className='w-10 h-10 rounded-full object-cover mr-3 border border-gray-300'
//                 />
//                 <div>
//                   <h3 className='font-semibold'>{post.author?.name}</h3>
//                   <p className='text-xs text-gray-500'>
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               <h2 className='text-xl font-semibold mb-2'>
//                 {post.title}
//               </h2>
//               <p className='text-gray-700 mb-4'>{post.desc}</p>

//               <div className='flex items-center justify-between'>
//                 <button
//                   onClick={() => handleLike(post._id)}
//                   className='flex items-center gap-2 text-pink-500 hover:text-pink-600 transition'>
//                   {post.likes.includes(user?._id) ? (
//                     <FaHeart />
//                   ) : (
//                     <FaRegHeart />
//                   )}
//                   <span>{post.likes.length}</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   )

// }

// export default Home;



import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);

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

  const handleLike = async (postId) => {
    if (!token) {
      toast.error("Please login to like posts");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/v1/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? res.data.post : p))
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-300 text-lg animate-pulse">
        Loading posts...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12 tracking-wide text-gray-200">
            📝 Latest Posts
          </h1>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet.</p>
          ) : (
            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
              {posts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <motion.div
                    key={post._id}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#111] p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-gray-700/40 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={
                          post.author?.avatar
                            ? post.author.avatar.startsWith("http")
                              ? post.author.avatar
                              : `http://localhost:5000/${post.author.avatar}`
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-700"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-200">
                          {post.author?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-2 text-gray-100">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-4">{post.desc}</p>

                    <div className="flex items-center justify-between mt-3">
                      <button
                        onClick={() => handleLike(post._id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition"
                      >
                        {post.likes.includes(user?._id) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                        <span>{post.likes.length}</span>
                      </button>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer pinned at bottom */}
      <Footer />
    </div>
  );
};

export default Home;



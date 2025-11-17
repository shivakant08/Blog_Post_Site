import React, { useEffect, useState, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import api, {BASE_URL } from "../utils/api"
import { FaPlus } from "react-icons/fa"
import { AuthContext } from "../context/AuthContext"

const Explore = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  // Fetching posts
  useEffect(() => {
    setLoading(true)
    const fetchPosts = async () => {
      try {
        const { data } = await api.get(
          `/v1/api/posts?page=${currentPage}&limit=6`
        )
        setPosts(data.posts)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
    fetchPosts()
  }, [currentPage])

  // Hide floating button on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowButton(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="relative min-h-screen bg-[#050505] text-white py-16 px-6 overflow-hidden">

      {/* DARK PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[#050505]">

        {/* Deep subtle gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#090909] via-[#070707] to-[#050505]"
          animate={{ opacity: [1, 0.92, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        {/* Ultra subtle mesh */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,120,255,0.06),transparent_70%)]"
          animate={{ opacity: [0.05, 0.09, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Soft noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('https://cdn.jsdelivr.net/gh/liyasthomas/cdn@master/noise.png')",
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* HEADER */}
      <section className="max-w-6xl mx-auto text-center mb-12 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white tracking-wide"
        >
          Explore Blogs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 max-w-2xl mx-auto mt-2"
        >
          Discover real stories, insights, and blogs from creators all around the world.
        </motion.p>
      </section>

      {/* SEARCH FIELD */}
      <div className="flex justify-center mb-12">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 bg-[#0a0a0a] text-gray-300 rounded-lg 
                     border border-gray-800 focus:outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* POSTS GRID */}
      <section className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => {
            const image = post.image
              ? `${BASE_URL}/${post.image}`
              : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=80"

            return (
              <motion.div
                key={post._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() =>
                  navigate(`/post/${post._id}`, { state: { from: "explore" } })
                }
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-gray-800 
                           hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/10 
                           transition-all overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={image}
                    alt={post.title}
                    className="h-full w-full object-cover transform hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2 hover:text-indigo-400 transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {post.content?.slice(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <img
                        src={
                          post.author?.avatar
                            ? post.author.avatar.startsWith("http")
                              ? post.author.avatar
                              : `${BASE_URL}/${post.author.avatar}`
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        className="w-7 h-7 rounded-full object-cover mr-2 border border-gray-700"
                      />
                      <span>{post.author?.name || "Unknown"}</span>
                    </div>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            )
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found.
          </p>
        )}
      </section>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            currentPage === 1
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
          }`}
        >
          ← Previous
        </motion.button>

        <span className="text-gray-400">
          Page <span className="text-indigo-400">{currentPage}</span> of{" "}
          <span className="text-indigo-400">{totalPages}</span>
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            currentPage === totalPages
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
          }`}
        >
          Next →
        </motion.button>
      </div>

      {/* Floating Create Button */}
      <AnimatePresence>
        {user && showButton && (
          <motion.button
            key="create-post-btn"
            onClick={() => navigate("/create-post")}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 
                       text-white p-4 rounded-full shadow-lg z-50"
            aria-label="Create-Post"
            title="Create Post"
          >
            <FaPlus size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Explore

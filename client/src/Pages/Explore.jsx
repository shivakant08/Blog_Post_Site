import React, { useEffect, useState, useContext } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaPlus } from 'react-icons/fa'
import { AuthContext } from '../context/AuthContext'

const Explore = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)

  useEffect(() => {
     console.log("Fetching page:", currentPage);
     setLoading(true)
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/v1/api/posts?page=${currentPage}&limit=6`)
        setPosts(data.posts)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("Error fetching post:", error)
      }finally{
        setLoading(false)
        window.scrollTo({top:0, behavior:"smooth"})
      }
    }
    fetchPosts()
  }, [currentPage])

  useEffect(()=>{
    const handleScroll =()=>{
      const currentScrollY = window.scrollY
      if(currentScrollY > lastScrollY){
        setShowButton(false)
      }else{
        setShowButton(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return ()=>window.removeEventListener("scroll", handleScroll)
  },[lastScrollY])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-16 px-6">
      <section className="max-w-6xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-400 mb-4"
        >
          Explore Blogs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Discover inspiring blogs, creative insights, and stories from writers all over the world.
        </motion.p>
      </section>

      <div className="flex justify-center mb-12">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 bg-[#0f172a] text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      <section className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => {
            const image = post.image
              ? `http://localhost:5000/${post.image}`
              : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=80"

            return (
              <motion.div
                key={post._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => navigate(`/explore/post/${post._id}`)}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10 transition-all overflow-hidden cursor-pointer"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={image}
                    alt={post.title}
                    className="h-full w-full object-cover transform hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2 hover:text-blue-400 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {post.content?.slice(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <div className="flex items-center">
                      <img
                        src={
                          post.author?.avatar
                            ? post.author.avatar.startsWith("http")
                              ? post.author.avatar
                              : `http://localhost:5000/${post.author.avatar}`
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        className="w-7 h-7 rounded-full object-cover mr-2 border border-gray-700"
                      />
                      <span>{post.author?.name || "Anonymous"}</span>
                    </div>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            )
          })
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 col-span-full"
          >
            No blogs found.
          </motion.p>
        )}
      </section>

      <div className='flex justify-center items-center gap-4 mt-12'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-5 py-2 rounded-lg font-medium transition ${currentPage === 1 ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"}`}>
          ← Previous
        </motion.button>
        <span className='text-gray-400'>
          Page <span className='text-blue-400'>{currentPage}</span> of{" "}
          <span className='text-blue-400'>{totalPages}</span>
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-5 py-2 rounded-lg font-medium transition ${currentPage === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }`}>
          Next →
        </motion.button>
      </div>

      <AnimatePresence>
        {user && showButton && (
          <motion.button
          key="create-post-btn"
          onClick={()=>navigate("/create-post")}
          initial={{opacity:0, y:40}}
          animate={{opacity:1, y:0}}
          exit={{opacity:0, y:40}}
          transition={{type:"spring", stiffness:260, damping:20}}
          className='fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50'
          aria-label='Create-Post'
          title='Create Post'
          >
            <FaPlus size={22}/>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Explore

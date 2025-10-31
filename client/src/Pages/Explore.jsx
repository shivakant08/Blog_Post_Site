// import React, { useEffect, useState } from 'react'
// import { motion } from "framer-motion"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// const Explore = () => {
//   const [posts, setPosts] = useState([])
//   const [search, setSearch] = useState("")
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/v1/api/posts")
//         setPosts(data)
//       } catch (error) {
//         console.error("Error fetching post:", error)
//       }
//     }
//     fetchPosts()
//   }, [])

//   const filteredPosts = posts.filter((post) => post.title.includes(search.toLowerCase()))

//   return (
//     <main className="min-h-screen bg-[#0b0b0b] text-white py-16 px-6">
//       <section className="max-w-6xl mx-auto text-center mb-12">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-bold text-blue-400 mb-4"
//         >
//           Explore Blogs
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="text-gray-400 max-w-2xl mx-auto">
//           Discover inspiring blogs, creative insights, and stories from writer all over the world.
//         </motion.p>
//       </section>

//       <div className="flex justify-center mb-12">
//         <input
//           type="text"
//           placeholder="Search blogs..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-5 py-3 bg-[#111] text-gray-300 rounded-lg border border-gray-800 focus:outline-none focus:border-blue-600 transition"
//         />
//       </div>

//       <section className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
//          {
//           filteredPosts.length > 0 ?(
//             filteredPosts.map((post,index)=>{
//               const image = post.image ? `http://localhost:5000/${post.image}`
//               : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=80"
//               return (
//                 <motion.div
//                 key={post._id || index}
//                 initial={{opacity:0, y:30}}
//                 animate={{opacity:1, y:0}}
//                 transition={{delay: index * 0.1, duration:0.5}}
//                 whileHover={{scale:1.03, y: -5}}
//                 onClick={()=>navigate(`/explore/post/${post._id}`)}
//                 className="bg-[#111] rounded-xl border border-gray-800 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10 transition-all overflow-hidden cursor-pointer"
//                 >
//                     <div className="h-48 w-full overflow-hidden">
//                       <img src={image}
//                        alt={post.title}
//                        className="h-full w-full object-cover transform hover:scale-110 transition duration-500"
//                        />
//                     </div>

//                     <div className="p-5 flex flex-col justify-between">
//                       <h3 className="text-xl font-semibold text-gray-100 mb-2 hover:text-blue-400 transition line-clamp-2">
//                         {post.title}
//                       </h3>
//                       <p className="text-gray-400 text-sm line-clamp-3 mb-4">
//                         {post.content?.slice(0,120)}...
//                       </p>

//                       <div className ="flex items-center justify-between text-sm text-gray-500 mt-auto">
//                          <div className="flex items-center">
//                                <img src={post.author?.avatar ?
//                                 post.author.avatar.startsWith("http")?
//                                 post.author.avatar
//                                 :`http://localhost:5000/${post.author.avatar}`
//                               : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                                }
//                                 alt="avatar"
//                                 className="w-7 h-7 rounded-full object-cover mr-2 border border-gray-700" 
//                                 />
//                                 <span>{post.author?.name || "Anonymous"}</span>
//                          </div>
//                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                 </motion.div>
//               )
//             })
//           ):(
//             <motion.p
//             initial={{opacity:0}}
//             animate={{opacity:1}}
//             className="text-center text-gray-500 col-span-full"
//             >
//            No blogs found.
//             </motion.p>
//           )
//          }
//       </section>
//     </main>
//   )
// }

// export default Explore



import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Explore = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/v1/api/posts")
        setPosts(data)
      } catch (error) {
        console.error("Error fetching post:", error)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

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
    </main>
  )
}

export default Explore

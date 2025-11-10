// import React, { useState, useEffect, useContext } from 'react'
// import axios from "axios"
// import { motion } from "framer-motion"
// import { AuthContext } from '../context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// const Profile = () => {
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { user, token } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const getAvatarUrl = (avatar, name = "User") => {
//     if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
//       return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
//     }
//     if (avatar.startsWith("http")) return avatar
//     return `http://localhost:5000${avatar.startsWith("/") ? avatar : `/${avatar}`}`
//   }

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/v1/api/posts/user/${user._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         )
//         setPosts(res.data.posts || [])

//       } catch (error) {
//         console.error("Failed to fetch user posts:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (user._id) fetchPosts()
//   }, [user, token])


//   if (loading) {
//     return (
//       <main className='min-h-screen flex items-center justify-center bg-black text-white'>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 0.7 }}
//           className='w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full'
//         />
//       </main>
//     )
//   }
//   return (
//     <main className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black py-16 px-6'>
//       <section className='max-w-4xl mx-auto text-center mb-12'>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className='flex flex-col items-center'
//         >
//           <motion.img
//             src={getAvatarUrl(user.avatar, user.name)}
//             alt={user.name}
//             className='w-32 h-32 rounded-full object-cover border-4 border-indigo-500 mb-6 shadow-lg'
//             whileHover={{ scale: 1.1 }}
//             transition={{ duration: 0.3 }}
//           />

//           <h1 className='text-3xl font-bold mb-2 text-gray-400'>{user.name}</h1>
//           <p className='text-gray-400'>{user.email}</p>

//           {user.bio && user.bio.trim() !== "" && (
//             <p className='mt-4 text-gray-300 max-w-xl text-center'>
//               {user.bio}
//             </p>
//           )}
//           <p className='text-gray-500 text-sm'>
//             Joined {new Date(user.createdAt).toLocaleDateString()}
//           </p>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className='mt-6 px-6 py-3 bg-indigo-600 rounded-xl shadow-lg text-lg font-semibold'
//           >
//             Total Posts: {posts.length}
//           </motion.div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/edit-profile")}
//             className='mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg text-lg cursor-pointer transition'
//           >
//             Edit Profile
//           </motion.button>
//         </motion.div>
//       </section>

//       <section className='max-w-6xl mx-auto'>
//         <h2 className='text-2xl font-bold text-indigo-400 text-center mb-6'>
//           Your Posts
//         </h2>

//         {posts.length > 0 ? (
//           <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
//             {posts.map((post, index) => (
//               <motion.div
//                 key={post._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.08, duration: 0.5 }}
//                 whileHover={{ scale: 1.05, y: -6 }}
//                 onClick={() => navigate(`post/${post._id}`)}
//                 className='cursor-pointer bg-white/5 rounded-xl border border-gray-800 p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/10 backdrop-blur-lg transition-all'
//               >
//                 <h3 className='text-lg font-semibold text-gray-100 mb-2'>
//                   {post.title}
//                 </h3>
//                 <p className='text-gray-400 text-sm line-clamp-3'>
//                   {post.content}
//                 </p>

//                 <div className='mt-3 text-sm text-gray-500'>
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className='text-gray-500 text-center'>
//             You haven't created any posts yet.
//           </p>
//         )}
//       </section>
//     </main>
//   )
// }

// export default Profile



import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { motion } from "framer-motion"
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, token } = useContext(AuthContext)
  const navigate = useNavigate()

  const getAvatarUrl = (avatar, name = "User") => {
    if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`
    }
    if (avatar.startsWith("http")) return avatar
    return `http://localhost:5000${avatar.startsWith("/") ? avatar : `/${avatar}`}`
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/v1/api/posts/user/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setPosts(res.data.posts || [])
      } catch (error) {
        console.error("Failed to fetch user posts:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user._id) fetchPosts()
  }, [user, token])

  if (loading) {
    return (
      <main className='min-h-screen flex items-center bg-black text-white'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className='w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full'
        />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-gray-200 pt-20">
      {/* TOP SECTION */}
      <section className="max-w-5xl mx-auto px-6 mb-10 flex flex-col md:flex-row items-center md:items-start gap-10">

        {/* PROFILE PHOTO */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <motion.img
            src={getAvatarUrl(user.avatar, user.name)}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border border-gray-700"
            whileHover={{ scale: 1.05 }}
          />
        </div>

        {/* USER DETAILS */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">

          {/* NAME + EDIT PROFILE BUTTON */}
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-semibold">{user.name}</h1>

            <button
              onClick={() => navigate("/edit-profile")}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg border border-gray-600 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* BIO */}
          {user.bio && (
            <p className="text-gray-400 max-w-md mb-4 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 
             px-8 py-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="text-4xl text-center font-bold text-indigo-400">
              {posts.length} Posts
            </div>
            {/* <div className="text-gray-300 text-center text-lg font-medium">
              Posts
            </div> */}
          </motion.div>

        </div>
      </section>

      {/* LINE DIVIDER */}
      <div className="border-t border-gray-800 mb-6"></div>


      {/* POSTS SECTION */}
      <section className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-indigo-400 text-center mb-8">
          Your Posts
        </h2>

        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -6 }}
                onClick={() => navigate(`/post/${post._id}`, { state: { from: "profile" } })}
                className="cursor-pointer bg-white/5 rounded-xl border border-gray-800 p-4
                     hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-600/10 
                     backdrop-blur-lg transition-all"
              >

                {/* CARD IMAGE */}
                {post.image ? (
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-40 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-4">
                    <span className="text-center text-white font-medium px-2 text-sm">
                      {post.title}
                    </span>
                  </div>
                )}

                {/* CARD TITLE */}
                <h3 className="text-lg font-semibold text-gray-100 mb-1 line-clamp-2">
                  {post.title}
                </h3>

                {/* DATE */}
                <p className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">You haven't created any posts yet.</p>
        )}
      </section>

    </main>
  )
}

export default Profile



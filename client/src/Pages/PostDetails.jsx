import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/AuthContext'
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"
import { FaHeart, FaRegHeart, FaPaperPlane, FaTrash, FaArrowLeft } from 'react-icons/fa'

const PostDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, user } = useContext(AuthContext)
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  const location = useLocation()
  const origin = location.state?.from
  const originUserId = location.state?.userId

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/v1/api/posts/${id}`)
      setPost(res.data)
      setIsLiked(res.data.likes.includes(user?._id))
    } catch (error) {
      console.error("Error fetching post:", error)
      toast.error("Failed to load post")
    } finally {
      setLoading(false)
    }
  }

  const toggleLike = async () => {
    try {
      await axios.put(
        `http://localhost:5000/v1/api/posts/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setIsLiked(!isLiked)
      setPost((prev) => ({
        ...prev,
        likes: isLiked
          ? prev.likes.filter((uid) => uid !== user._id)
          : [...prev.likes, user._id],
      }))
    } catch (error) {
      console.error("Error liking post:", error)
      toast.error("Failed to update like")
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      const res = await axios.post(
        `http://localhost:5000/v1/api/posts/${id}/comments`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data.comment],
      }))
      setComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Failed to add comment")
    }
  }

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/v1/api/posts/${id}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId)
      }))
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast.error("Failed to delete comment")
    }
  }

  const handleBack = () => {
  if (origin === "profile") {
    return navigate("/profile")
  }

  if (origin === "userProfile") {
    return navigate(`/users/${originUserId}`)
  }

  return navigate("/explore")
}


  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center text-gray-400 text-lg'>
        Loading post...
      </div>
    )
  }

  if (!post) {
    return (
      <div className='h-screen flex items-center justify-center text-gray-400 text-lg'>
        Post not found.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='relative min-h-screen bg-gradient-to-br from-[#060b28] via-[#0e173a] to-[#1c1f3b] text-gray-100 px-6 pt-28 pb-10 flex flex-col items-center overflow-hidden'
    >
      {/* 🌈 Animated Gradient Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.15),_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.15),_transparent_70%)] blur-3xl pointer-events-none" />

      {/* 💫 Floating Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full blur-3xl bg-blue-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🔙 Back Button */}
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-10 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-blue-600 hover:shadow-lg transition z-50"
      >
        <FaArrowLeft className="text-lg" />
      </motion.button>

      {/* 🧊 Glassmorphic Post Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className='max-w-3xl w-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-6 relative overflow-hidden'
      >
        {/* 🖼️ Image */}
        {post.image && (
          <motion.img
            src={`http://localhost:5000/${post.image}`}
            alt={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='w-full h-80 object-cover object-top rounded-2xl mb-5 shadow-xl'
          />
        )}

        {/* 📝 Post Info */}
        <h2 className='text-3xl font-bold mb-2 text-white'>{post.title}</h2>
        <p className='text-gray-400 mb-4 italic'>by {post.author?.name || "Unknown"}</p>
        <p className='text-gray-200 leading-relaxed mb-6'>{post.desc}</p>

        {/* ❤️ Like Button */}
        <motion.button
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={toggleLike}
          className='flex items-center gap-2 text-xl text-pink-500 mb-6'
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span className='text-gray-300 text-base'>
            {post.likes?.length || 0} Likes
          </span>
        </motion.button>

        {/* 💬 Comments Section */}
        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-3'>Comments</h3>

          <form onSubmit={addComment} className='flex gap-3 mb-6'>
            <input
              type='text'
              placeholder='Write a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition'
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type='submit'
              className='p-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition flex items-center justify-center'
            >
              <FaPaperPlane className='text-white text-lg' />
            </motion.button>
          </form>

          <div className='space-y-3'>
            {post.comments?.length > 0 ? (
              <AnimatePresence>
                {post.comments.map((c) => (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className='bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 flex justify-between items-start shadow-sm hover:shadow-lg transition'
                  >
                    <div>
                      <p className='text-gray-100 mb-1'>{c.text}</p>
                      <span className='text-xs text-gray-400'>
                        — {c.user?.name || "Anonymous"}
                      </span>
                    </div>
                    {c.user?._id === user._id && (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteComment(c._id)}
                        className='text-red-400 text-base'
                      >
                        <FaTrash />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <p className='text-gray-500 text-sm'>No comments yet.</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PostDetails



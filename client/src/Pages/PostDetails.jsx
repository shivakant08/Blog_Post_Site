import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/AuthContext'
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const PostDetails = () => {
    const { id } = useParams()
    const { token, user } = useContext(AuthContext)
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)

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
        }
    }

    const toggleLike = async () => {
        try {
            await axios.put(
                `http://localhost:5000/v1/api/posts/${id}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            setIsLiked(!isLiked)
            setPost((prev) => ({
                ...prev, likes: isLiked ? prev.likes.filter((uid) => uid !== user._id)
                    : [...prev.likes, user._id]
            }))
        } catch (error) {
            console.error("Error liking post:", error)
            toast.error("Failed to Update like")
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
                ...prev, comments: [...prev.comments, res.data.comment],
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
                `http://localhost:5000/v1/api/posts/${id}comments/${commentId}`,
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

    if (loading) {
        return (
            <div className='h-screen flex items-center justify-center text-gray-700'>
                Loading Post...
            </div>
        )
    }

    if (!post) {
        return (
            <div className='h-screen flex items-center justify-center text-gray-700'>
                Post not found
            </div>
        )
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-screen bg-gradient-to-br from-[#050505] via-[#0d0d0d] to-[#161616] text-gray-100 px-6 pt-28 pb-10 flex flex-col items-center'
        >
            <div className='max-w-3xl w-full bg-[#111]/90 border border-gray-800 shadow-xl rounded-2xl p-6 backdrop-blur-md'>
                {post.image && (
                    <img
                        src={`http://localhost:5000/${post.image}`}
                        alt={post.title}
                        className='w-full h-72 object-cover object-top rounded-lg mb-5'
                    />
                )}

                <h2 className='text-3xl font-bold mb-3'>{post.title}</h2>
                <p className='text-gray-400 mb-2'>{post.author?.name || "Unknown"}</p>

                <p className='text-gray-300 leading-relaxed mb-6'>{post.desc}</p>

                <div className='flex items-center gap-2 mb-6'>
                    <button
                    onClick={toggleLike}
                    className='flex items-center gap-2 text-xl text-red-500 focus:outline-none'
                    >
                        {isLiked? <FaHeart/> : <FaRegHeart/>}
                    </button>
                    <span className='text-gray-400'>{post.likes?.length || 0} Likes</span>

                </div>

                <div className='mt-8'>
                   <h3 className='text-lg font-semibold mb-3'>
                    Comments
                   </h3>

                   <form onSubmit={addComment} className='flex gap-2 mb-5'>
                    <input
                    type='text'
                    placeholder='Write a comment...'
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    className='flex-1 p-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-blue-500 outline-none'
                    />
                    <button type='submit' className='px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition'>Post</button>
                   </form>
                </div>
            </div>

        </motion.div>
    )
}

export default PostDetails
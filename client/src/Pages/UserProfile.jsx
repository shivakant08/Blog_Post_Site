import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'

const UserProfile = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRes = await axios.get(`http://localhost:5000/v1/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const postRes = await axios.get(`http://localhost:5000/v1/api/posts/user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                setUser(userRes.data.user)
                setPosts(postRes.data.posts || [])
            } catch (error) {
                console.error("Error fetching User Profile:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [id, token])

    const getAvatarUrl = (avatar, name = "User") => {
        if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`
        }
        if (avatar.startsWith("http")) return avatar
        return `http://localhost:5000${avatar.startsWith("/") ? avatar : `/${avatar}`}`
    }

    if (loading) {
        return (
            <main className='min-h-screen flex items-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white'>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: "Infinity", duration: 1 }}
                    className='w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full'
                />
            </main>
        )
    }

    if (!user) {
        return (
            <main className='min-h-screen flex items-center justify-center bg-gray-900 text-white text-lg'>
                <p>User not found</p>
            </main>
        )
    }
    return (
        <main className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-16 px-6'>
            <motion.button
                onClick={() => navigate("/users")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold mb-6 px-4 py-2 bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-indigo-500 transition'
            >
                ← Back
            </motion.button>
            <section className='max-w-4xl mx-auto text-center mb-12'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col items-center'
                >
                    <motion.img
                        src={getAvatarUrl(user.avatar, user.name)}
                        alt={user.name}
                        className='w-32 h-32 rounded-full object-cover border-4 border-indigo-500 mb-6 shadow-lg'
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                            )}&background=6366f1&color=fff`
                        }}
                    />
                    <h1 className='text-3xl font-bold mb-2'>{user.name}</h1>
                    <p className='text-gray-400 mb-1'>{user.email}</p>
                    <p className='text-gray-500 text-sm'>
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className='mt-6 px-6 py-3 bg-indigo-600 rounded-xl shadow-lg text-lg font-semibold'
                    >
                        Total Posts: {posts.length}
                    </motion.div>
                </motion.div>
            </section>


            <section className='max-w-6xl mx-auto'>
                <h2 className='text-2xl font-bold mb-6 text-indigo-400 text-center'>
                    {user.name.split(" ")[0]}'s Posts
                </h2>

                {posts.length > 0 ? (
                    <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {posts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -6 }}
                                onClick={() =>
                                    navigate(`/post/${post._id}`, {
                                        state: {
                                            from: "userProfile",
                                            userId: id
                                        }
                                    })
                                }
                                className='bg-white/5 rounded-xl border border-gray-800 p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/10 backdrop-blur-lg transition-all cursor-pointer'
                            >
                                <h3 className='text-lg font-semibold text-gray-100 mb-2'>
                                    {post.title}
                                </h3>
                                <p className='text-gray-400 text-sm line-clamp-3'>{post.content}</p>
                                <div className='mt-3 text-sm text-gray-500'>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-500 text-center'>No posts yet.</p>
                )}
            </section>
        </main>
    )
}

export default UserProfile
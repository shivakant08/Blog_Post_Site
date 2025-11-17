import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios, { formToJSON } from 'axios'
import api from "../utils/api.js"
import { AuthContext } from '../context/AuthContext'
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { FaArrowLeft, FaSave, FaImage } from 'react-icons/fa'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [preview, setPreview] = useState(null)
  const [image, setImage] = useState(null)
  const [originalAuthor, setOriginalAuthor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/v1/api/posts/${id}`)
      setTitle(data.title)
      setDesc(data.desc)
      setPreview(
        data.image
          ? `${import.meta.env.VITE_API_BASE_URL || "https://blog-post-site-tkky.onrender.com"}${data.image}`
          : null
      )
      setOriginalAuthor(data.author?._id)

      setLoading(false)
    } catch (error) {
      toast.error("Failed to load post")
      navigate("/explore")
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (user?._id !== originalAuthor) {
      toast.error("Unauthorized")
      navigate("/explore")
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("desc", desc)
    if (image) formData.append("image", image)

    try {
      await api.put(`/v1/api/posts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )

      toast.success("Post updated successfully")
      navigate(`/post/${id}`)
    } catch (error) {
      toast.error("Failed to update post")
    }
  }

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center text-gray-400 text-lg'>
        Loading post...
      </div>
    )
  }

  return (
    <main className='relative min-h-screen bg-[#050505] text-white pt-[130px] pb-20 px-6 overflow-hidden'>
      <div className='absolute inset-0 -z-10 pointer-events-none'>
        <motion.div
          className='absolute inset-0 bg-gradient-to-b from-[#090909] via-[#070707] to-[#050505]'
          animate={{ opacity: [1, 0.94, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className='absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,120,255,0.06),transparent_70%)]'
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div
          className='absolute inset-0 opacity-[0.04] mix-blend-soft-light'
          style={{
            backgroundImage: "url('https://cdn.jsdelivr.net/gh/liyasthomas/cdn@master/noise.png')",
          }}
        />
      </div>

      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.2 }}
        className='mb-8 p-3 bg-white/10 border border-gray-700 rounded-full hover:border-indigo-500 transition'
        title='Go back'
      >
        <FaArrowLeft className='text-lg' />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-3xl mx-auto bg-white/5 border border-gray-800 rounded-2xl p-8 shadow-2xl'
      >
        <h2 className='text-3xl font-bold mb-6 text-white'>Edit Post</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div>
            <label className='block text-gray-300 mb-2'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full p-3 bg-white/10 border border-gray-700 rounded-lg focus:border-indigo-500 outline-none text-gray-200'
            />
          </div>

          <div>
            <label className='block text-gray-300 mb-2'>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='w-full p-3 bg-white/10 border border-gray-700 rounded-lg h-40 resize-none focus:border-indigo-500 outline-none text-gray-200'
            ></textarea>
          </div>

          <div>
            <label className='block text-gray-300 mb-3'>Image</label>
            {preview && (
              <img src={preview}
                alt="preview"
                className='w-full h-64 object-cover rounded-xl mb-4 border border-gray-800'
              />
            )}
            <label className='flex items-center gap-3 p-3 bg-white/10 border border-gray-700 rounded-lg cursor-pointer hover:bg-white/20 transition text-gray-300'>
              <FaImage />
              <span>Choose Image</span>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className='flex items-center justify-center gap-2 p-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 text-white text-lg shadow'
            type='submit'
          >
            <FaSave /> Save Changes
          </motion.button>
        </form>
      </motion.div>
    </main>
  )
}

export default EditPost
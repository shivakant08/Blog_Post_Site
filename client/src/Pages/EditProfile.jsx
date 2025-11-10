import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from "react-hot-toast"

const EditProfile = () => {
    const { user, token, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: "",bio: ""})
    const [avatarFile, setAvatarFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!user) return
        setForm({
            name: user.name || "",
            bio: user.bio || ""
        })

       if (user.avatar && user.avatar.trim() !== "") {
            setPreview(
                user.avatar.startsWith("http")
                    ? user.avatar
                    : `http://localhost:5000/${user.avatar}`
            )
        } else {
            setPreview(null)
        }
    }, [user])

    const onFile = (e) => {
        const file = e.target.files?.[0]
        setAvatarFile(file)
        if (file) setPreview(URL.createObjectURL(file))
    }
    const save = async (e) => {
        e.preventDefault()
        if (!token) return toast.error("Unauthorized")
        try {
            setSaving(true)
            const fd = new FormData()
            fd.append("name", form.name)
            fd.append("bio", form.bio)
            if (avatarFile) fd.append("avatar", avatarFile)

            const res = await axios.patch(
                `http://localhost:5000/v1/api/users/${user._id}`,
                fd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            setUser(res.data.user)
            toast.success("Profile updated successfully")
            navigate("/profile")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update profile")
        } finally {
            setSaving(false)
        }
    }

    return (
        <main className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white pt-24 px-6'>
            <div className='max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6'>
                <h1 className='text-2xl font-semibold mb-6 text-center'>
                    Edit Profile
                </h1>

                <form onSubmit={save} className='space-y-6'>
                    <div className='flex items-center gap-4'>
                        <img
                            src={
                                preview ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    form.name || "User"
                                )}&background=6366f1&color=fff`
                            }
                            alt='avatar'
                            className='w-20 h-20 rounded-full object-cover border-4 border-indigo-500'
                        />
                        <label className='px-3 py-2 bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700'>
                            <input type="file" accept='image/*' className='hidden' onChange={onFile} />
                            Change Avatar
                        </label>
                    </div>

                    <div>
                        <label className='block text-sm text-gray-300 mb-1'>Name</label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm((prev) => ({
                                ...prev, name: e.target.value
                            }))}
                            className='w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none'
                            required
                        />
                    </div>
                    
                    <div>
                           <label className='block text-sm text-gray-300 mb-1'>Bio</label>
                           <textarea
                           value={form.bio}
                           rows={4}
                           onChange={(e)=>setForm(prev=>({...prev, bio: e.target.value}))}
                           className='w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none'
                           placeholder='Tell us something about yourself...'/>
                    </div>

                    <div>
                        <label className='block text-sm text-gray-300 mb-1'>Email</label>
                        <input
                            value={user.email}
                            disabled
                            className='w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                        />
                    </div>

                    <motion.button
                    whileHover={{scale:1.03}}
                    whileTap={{scale:0.97}}
                    disabled={saving}
                    type='submit'
                    className='px-6 py-3 bg-indigo-600 rounded-xl disabled:opacity-60 w-full'
                    >
                    {saving ? "Saving...": "Save Changes"}

                    </motion.button>
                </form>
            </div>
        </main>
    )
}

export default EditProfile
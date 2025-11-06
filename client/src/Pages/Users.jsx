import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import { AuthContext } from '../context/AuthContext'

const Users = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {

        if (!token) {
          console.error('No token available from AuthContext')
          return
        }
        const { data } = await axios.get(`http://localhost:5000/v1/api/users?page=${page}&limit=8`,

          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setUsers(data.users)
        setTotalPages(data.pagination?.totalPages)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [page, token])

  const filteredUsers = users.filter((user) => user.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-16 px-6'>
      <section className='max-w-6xl mx-auto text-center mb-12'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl font-bold text-blue-400 mb-4'
        >
          Discover Creators
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-gray-400 max-w-2xl mx-auto'
        >
          Meet amazing creators, explore their blogs, and get inspired by their stories.
        </motion.p>
      </section>

      <div className='flex justify-center mb-12'>
        <input
          type='text'
          placeholder='Search users...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full max-w-md px-5 py-3 bg-[#0f172a] text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition'
        />
      </div>

      <section className='max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className='h-60 bg-gray-800/50 rounded-xl animate-pulse'
              />

            ))
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <motion.div
              key={user._id || index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -6 }}
              onClick={() => navigate(`/users/${user._id}`)}
              className='cursor-pointer bg-white/5 rounded-xl border border-gray-800 p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/10 backdrop-blur-lg transition-all'
            >
              <div className='flex flex-col items-center text-center'>
                <div className='relative w-24 h-24 mb-4'>
                  <motion.img
                    src={
                      user.avatar
                        ? user.avatar.startsWith("data:image")
                          ? user.avatar
                          : user.avatar.startsWith("http")
                            ? user.avatar
                            : `http://localhost:5000/${user.avatar}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=0D8ABC&color=fff`
                    }


                    alt={user.name}
                    className='w-24 h-24 rounded-full object-cover border-4 border-gray-700'
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ delay: 0.3 }}
                  />
                  {/* <motion.div
                    className='absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  /> */}
                </div>
                <h3 className='text-lg font-semibold text-gray-100 mb-1'>{user.name}</h3>
                <p className='text-gray-400 text-sm mb-2'>{user.email}</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/users/${user._id}`)
                  }}
                  className='mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition'
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className='text-gray-500 text-center col-span-full'>No users found.</p>
        )}
      </section>

      {!loading && totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-12'>
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className='px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 disabled:opacity-50'>
            ← Previous
          </button>
          <span className='text-gray-400'>
            Page <span className='text-blue-400'>{page}</span> of{" "}
            <span className='text-blue-400'>{totalPages}</span>
          </span>

          <button
          disabled={page === totalPages}
          onClick={()=>setPage((prev)=>prev + 1)}
          className='px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 disabled:opacity-50'>
            Next →
          </button>
        </div>
      )}
    </main>
  )
}

export default Users


import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const getAvatarUrl = (avatar, name = "User") => {
    if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=4F46E5&color=fff`;
    }
    if (avatar.startsWith("http")) return avatar;
    return `${BASE_URL}${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get(
          `/v1/api/users/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const postRes = await api.get(
          `/v1/api/posts/user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(userRes.data.user);
        setPosts(postRes.data.posts || []);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-t-4 border-b-4 border-indigo-500 rounded-full"
        />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        User not found.
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6 overflow-hidden">

      {/* --- SAME BACKGROUND AS EXPLORE --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[#050505]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#090909] via-[#070707] to-[#050505]"
          animate={{ opacity: [1, 0.94, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,120,255,0.06),transparent_70%)]"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('https://cdn.jsdelivr.net/gh/liyasthomas/cdn@master/noise.png')",
          }}
        />
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

      {/* BACK BUTTON */}
      <motion.button
        onClick={() => navigate("/users")}
        whileHover={{ scale: 1.04 }}
        className="mb-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium shadow-md"
      >
        ← Back
      </motion.button>

      {/* USER INFO */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <motion.img
          src={getAvatarUrl(user.avatar, user.name)}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 mx-auto mb-4"
          whileHover={{ scale: 1.07 }}
        />

        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-400 mb-1">{user.email}</p>
        <p className="text-gray-500 text-sm">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <motion.div
          className="mt-6 inline-block px-6 py-3 bg-white/10 rounded-xl border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="font-semibold text-indigo-400">{posts.length}</span>{" "}
          <span className="text-gray-300">Posts</span>
        </motion.div>
      </section>

      {/* POSTS GRID */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-400 text-center mb-8">
          {user.name.split(" ")[0]}'s Posts
        </h2>

        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.05, y: -6 }}
                onClick={() =>
                  navigate(`/post/${post._id}`, {
                    state: { from: "userProfile", userId: id },
                  })
                }
                className="bg-white/5 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/10 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">{post.content}</p>
                <div className="mt-3 text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No posts yet.</p>
        )}
      </section>
    </main>
  );
};

export default UserProfile;

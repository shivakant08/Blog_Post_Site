import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
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
    const fetchPosts = async () => {
      try {
        const res = await api.get(
          `/v1/api/posts/user/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchPosts();
  }, [user, token]);

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

  return (
    <main className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6 overflow-hidden">

      {/* BACKGROUND — SAME AS EXPLORE */}
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
          className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('https://cdn.jsdelivr.net/gh/liyasthomas/cdn@master/noise.png')",
          }}
        />
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* PROFILE SECTION */}
      <section className="max-w-5xl mx-auto px-6 mb-10 flex flex-col md:flex-row items-center md:items-start gap-10">

        {/* Avatar */}
        <motion.img
          src={getAvatarUrl(user.avatar, user.name)}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          whileHover={{ scale: 1.06 }}
        />

        {/* User Details */}
        <div className="flex flex-col items-center md:items-start">

          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-3xl font-bold">{user.name}</h1>

            <button
              onClick={() => navigate("/edit-profile")}
              className="px-4 py-2 bg-white/10 border border-gray-700 hover:border-indigo-500 hover:bg-white/20 rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-400 max-w-md mb-3 text-center md:text-left">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          <motion.div
            className="mt-4 bg-white/10 border border-gray-700 px-6 py-3 rounded-xl shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-indigo-400 font-bold">{posts.length}</span>{" "}
            <span className="text-gray-300">{posts.length === 1 ? "Post" : "Posts"}</span>
          </motion.div>

        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto border-t border-gray-800 mb-8"></div>

      {/* POSTS GRID */}
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
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.05, y: -6 }}
                onClick={() =>
                  navigate(`/post/${post._id}`, { state: { from: "profile" } })
                }
                className="cursor-pointer bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-5 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/10 transition"
              >
                {/* Image */}
                {post.image ? (
                  <img
                    src={`${BASE_URL}/${post.image}`}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-indigo-700/20 rounded-lg flex items-center justify-center text-indigo-300">
                    No Image
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-100 mb-1">
                  {post.title}
                </h3>

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
  );
};

export default Profile;

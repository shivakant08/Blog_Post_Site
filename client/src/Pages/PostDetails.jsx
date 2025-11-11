import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FaHeart,
  FaRegHeart,
  FaPaperPlane,
  FaTrash,
  FaArrowLeft,
  FaEdit
} from "react-icons/fa";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const origin = location.state?.from;
  const originUserId = location.state?.userId;

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/v1/api/posts/${id}`);
      setPost(res.data);
      setIsLiked(res.data.likes.includes(user?._id));
    } catch (error) {
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (origin === "profile") return navigate("/profile");
    if (origin === "userProfile") return navigate(`/users/${originUserId}`);
    return navigate("/explore");
  };

  const toggleLike = async () => {
    try {
      await axios.put(
        `http://localhost:5000/v1/api/posts/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsLiked(!isLiked);
      setPost((prev) => ({
        ...prev,
        likes: isLiked
          ? prev.likes.filter((uid) => uid !== user._id)
          : [...prev.likes, user._id],
      }));
    } catch {
      toast.error("Failed to update like");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/v1/api/posts/${id}/comments`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data.comment],
      }));

      setComment("");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/v1/api/posts/${id}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/v1/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Post deleted");
      navigate("/explore");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading post...
      </main>
    );
  }

  if (!post) {
    return (
      <main className="h-screen flex items-center justify-center text-gray-400 text-lg">
        Post not found.
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white pt-[130px] pb-16 px-6 overflow-hidden">

      {/* Background (Same as Explore) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
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
      </div>

      {/* BACK BUTTON (ICON ONLY) */}
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.12 }}
        className="mb-8 p-3 bg-white/10 border border-gray-700 rounded-full hover:border-indigo-500 transition"
        title="Go Back"
      >
        <FaArrowLeft className="text-lg" />
      </motion.button>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white/5 border border-gray-800 rounded-2xl p-6 shadow-xl"
      >
        {/* Image */}
        {post.image && (
          <img
            src={`http://localhost:5000/${post.image}`}
            alt={post.title}
            className="w-full h-80 object-cover rounded-xl mb-5"
          />
        )}

        {/* Title */}
        <h2 className="text-3xl font-semibold mb-1">{post.title}</h2>
        <p className="text-gray-400 mb-4">By {post.author?.name}</p>

        {/* EDIT / DELETE ICONS */}
        {user?._id === post.author?._id && (
          <div className="flex gap-4 mb-6">

            {/* Edit */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              className="p-3 rounded-full bg-indigo-600/20 border border-indigo-600/40 
              text-indigo-400 hover:bg-indigo-600/30 transition shadow"
              onClick={() => navigate(`/post/${id}/edit`)}
              title="Edit Post"
            >
              <FaEdit size={18} />
            </motion.button>

            {/* Delete */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              className="p-3 rounded-full bg-red-600/20 border border-red-600/40 
              text-red-400 hover:bg-red-600/30 transition shadow"
              onClick={handleDelete}
              title="Delete Post"
            >
              <FaTrash size={18} />
            </motion.button>

          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6">{post.desc}</p>

        {/* LIKE BUTTON */}
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 1.25 }}
            className="p-3 rounded-full bg-pink-600/20 border border-pink-600/40 
            text-pink-400 hover:bg-pink-600/30 transition shadow"
            onClick={toggleLike}
            title="Like"
          >
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </motion.button>

          <span className="text-gray-400">{post.likes.length} likes</span>
        </div>

        {/* COMMENTS */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>

          {/* Add Comment */}
          <form onSubmit={addComment} className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-3 bg-white/10 border border-gray-700 rounded-lg text-gray-300"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              type="submit"
            >
              <FaPaperPlane />
            </motion.button>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            <AnimatePresence>
              {post.comments.map((c) => (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-gray-800 rounded-lg p-4 flex justify-between"
                >
                  <div>
                    <p className="text-gray-200">{c.text}</p>
                    <span className="text-xs text-gray-500">— {c.user?.name}</span>
                  </div>

                  {c.user?._id === user._id && (
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      onClick={() => deleteComment(c._id)}
                      className="text-red-500"
                      title="Delete"
                    >
                      <FaTrash />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </main>
  );
};

export default PostDetails;

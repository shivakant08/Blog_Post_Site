import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import writing from "../assets/writing.svg"; // 🖼️ illustration image (download from undraw.co)

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc) return toast.error("Title and description are required");
    if (!user || !token) return toast.error("You must be logged in to create a post");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/v1/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Post created successfully!");
      setTitle("");
      setDesc("");
      setImage(null);
      setPreview(null);
      navigate("/home");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center bg-gradient-to-br from-[#050505] via-[#0d0d0d] to-[#161616] text-gray-100 px-6 pt-24 pb-10 overflow-hidden"
    >
      {/* 🌈 Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 🫧 Floating Bubbles (visible version) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${["bg-blue-500/30", "bg-purple-500/30", "bg-pink-500/30", "bg-cyan-400/30"][i % 4]}`}

          style={{
            width: `${100 + i * 20}px`,
            height: `${100 + i * 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* 🖋️ Illustration */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex flex-col items-center justify-center w-1/2 p-8"
      >
        <motion.img
          src={writing}
          alt="Create Post Illustration"
          className="w-4/5 animate-float drop-shadow-2xl"
        />
        <p className="text-gray-400 text-center mt-6 text-sm italic">
          “Your thoughts deserve a platform — inspire, create, and share 🚀”
        </p>
      </motion.div>

      {/* 🧾 Create Post Form */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-[#111]/90 border border-gray-800 shadow-2xl rounded-2xl p-8 w-full md:w-1/2 max-w-lg backdrop-blur-md z-10"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white tracking-wide">
          ✍️ Create a New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Post Title
            </label>
            <input
              type="text"
              placeholder="Enter your post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-100 placeholder-gray-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              placeholder="Write something interesting..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="4"
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-100 placeholder-gray-500 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300 bg-[#1a1a1a]">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover object-top rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-3xl text-gray-400 mb-1" />
                  <p className="text-xs text-gray-400">Click or drag an image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish Post 🚀"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePost;

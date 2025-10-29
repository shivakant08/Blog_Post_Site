import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion"
import { FaCloudUploadAlt } from "react-icons/fa";

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

    if (!title || !desc) {
      toast.error("Title and description are required");
      return;
    }

    if (!user || !token) {
      toast.error("You must be logged in to create a post");
      return;
    }

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
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-gray-100 px-4 py-16"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#111] border border-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-lg backdrop-blur-md mx-4"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white tracking-wide">
          ✍️ Create a New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Post Title
            </label>
            <input
              type="text"
              placeholder="Enter your post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-100 placeholder-gray-500"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              placeholder="Write something interesting..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="4"
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-100 placeholder-gray-500"
            />
          </motion.div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Image
            </label>

            <motion.label
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300 bg-[#1a1a1a]"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">
                    Click to Upload or drag an image
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </motion.label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Publishing..." : "Publish Post 🚀"}
          </motion.button>
        </form>
      </motion.div>

    </motion.div>
  )
}
export default CreatePost;

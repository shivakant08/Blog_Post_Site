import express from "express"
import upload from "../Middlewares/upload.js"
import { createPost, deletePost, getAllPosts, getPostById, toggleLike } from "../controllers/postController.js"
import { authenticate } from "../Middlewares/auth.js"  
const router = express.Router()

router.get("/",getAllPosts)
router.get("/:id", getPostById)

router.post("/", authenticate,upload.single("image"), createPost)
router.put("/:id/like", authenticate, toggleLike)
router.delete("/:id", authenticate, deletePost)


export default router
import express from "express"
import { createPost, deletePost, getAllPosts, getPostById, toggleLike } from "../controllers/postController.js"
import { authenticate } from "../Middlewares/auth.js"  
const router = express.Router()

router.get("/",getAllPosts)
router.get("/:id", getPostById)

router.post("/", authenticate, createPost)
router.put("/:id/like", authenticate, toggleLike)
router.delete("/:id", authenticate, deletePost)


export default router
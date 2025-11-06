import express from "express"
import upload from "../Middlewares/upload.js"
import { addComment, createPost, deleteComment, deletePost, getAllPostByUser, getAllPosts, getPostById, toggleLike } from "../controllers/postController.js"
import { authenticate } from "../Middlewares/auth.js"  
const router = express.Router()

router.get("/",getAllPosts)
router.get("/:id", getPostById)

router.post("/", authenticate,upload.single("image"), createPost)
router.put("/:id/like", authenticate, toggleLike)
router.delete("/:id", authenticate, deletePost)

router.post("/:id/comments",authenticate, addComment)
router.delete("/:id/comments/:commentId",authenticate, deleteComment)

//---------------------GET ALL POST BY USER------------------------------
router.get("/user/:id", authenticate, getAllPostByUser);
export default router
import Post from "../Model/Post.js"
import User from "../Model/User.js"
import redis from "../config/redisClient.js"

//Create a new Post
export const createPost = async (req, res) => {
    try {
        const { title, desc } = req.body
        if (!title || !desc) {
            return res.status(400).json({ message: "Title and description are required" })
        }

        const imagePath = req.file ? `uploads/${req.file.filename}` : ""

        const post = await Post.create({
            title,
            desc,
            author: req.user.id,
            image: imagePath
        })

        await redis.del("all_posts")
        res.status(201).json({ message: "Post created successfully", post })
    } catch (error) {
        console.error("Error creating post:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 6
        const skip = (page - 1) * limit

        const cacheKey = `posts_page_${page}_${limit}`
        const cachedPosts = await redis.get(cacheKey)
        if (cachedPosts) {
            console.log("Serving posts from redis cache")
            return res.status(200).json(JSON.parse(cachedPosts))
        }

        const totalPosts = await Post.countDocuments()
        const posts = await Post.find().populate("author", "name email avatar").sort({ createdAt: -1 }).skip(skip).limit(limit)

        const response = {
            posts,
            totalPosts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit)
        }
        await redis.set(cacheKey, JSON.stringify(response), "EX", 60)

        console.log("Fetched posts from MongoDB")
        res.status(200).json(response)
    } catch (error) {
        console.error("Error fetching posts:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Get single post by ID
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const cacheKey = `post:${id}`
        const cachedPost = await redis.get(cacheKey)
        if (cachedPost) {
            console.log("Serving post from redis cache")
            return res.status(200).json(JSON.parse(cachedPost))
        }

        const post = await Post.findById(id).populate("author", "name email avatar").populate("comments.user", "name avatar")
        if (!post) return res.status(404).json({ message: "Post not found" })

        await redis.set(cacheKey, JSON.stringify(post), "EX", 120);
        console.log("Fetched posts from MongoDB")

        res.status(200).json(post)
    } catch (error) {
        console.error("Error fetching post:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Like / Unlike a post

export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        const userId = req.user.id
        const isLiked = post.likes.includes(userId)

        if (isLiked) {
            post.likes.pull(userId)
            await post.save()
            await redis.del(`post:${id}`)
            return res.json({ message: "Post unliked", post })
        } else {
            post.likes.push(userId)
            await post.save()
            await redis.del(`post:${id}`)
            return res.json({ message: "Post liked", post })
        }
    } catch (error) {
        console.error("Error toggling like:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not Authorized to delete this post" })
        }

        await post.deleteOne()

        await redis.del("all_posts")
        await redis.del(`posts:${id}`)
        res.json({ message: "Post deleted successfully" })
    } catch (error) {
        console.error("Error deleting post:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Add a comment to a post

export const addComment = async (req, res) => {
    try {
        const { id } = req.params
        const { text } = req.body

        if (!text) return res.status(400).json({ message: "Comment cannot be empty" })

        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        const newComment = {
            text,
            user: req.user.id,
            createdAt: new Date()

        }
        post.comments.push(newComment)
        await post.save()

        const populatedPost = await Post.findById(id).populate("comments.user", "name email")

        await redis.del("all_posts")
        await redis.del(`post:${id}`)

        const addedComment = populatedPost.comments[populatedPost.comments.length - 1]
        res.status(201).json({ message: "Comment added successfully", comment: addedComment })
    } catch (error) {
        console.error("Error adding comment:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Delete a comment

export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params
        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        const comment = post.comments.id(commentId)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own comments" })
        }
        comment.deleteOne()
        await post.save()

        await redis.del("all_posts")
        await redis.del(`post:${id}`)
        res.status(200).json({ message: "Comment deleted successfully" })
    } catch (error) {
        console.error("Error deleting comment:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


// GET ALL POST BY USER

export const getAllPostByUser = async (req, res) => {
    // try {
    //     const posts = await Post.find({author:req.params.userId}).sort({createdAt: -1})
    //     res.status(200).json({posts})
    // } catch (err) {
    //     res.status(500).json({message:"Error fetching user posts", error:err.message})
    // }


    try {
        const { id } = req.params;

        const posts = await Post.find({ author: id }).sort({ createdAt: -1 });

        if (!posts) {
            return res.status(404).json({ message: "No posts found for this user" });
        }

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


// UPDATE POST
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)

        if (!post) return res.status(404).json({ message: "Post not found" })
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" })
        }

        const { title, desc } = req.body
        if (req.file) {
            post.image = `uploads/${req.file.filename}`; // consistent format
        }

        if (title) post.title = title;
        if (desc) post.desc = desc;

        await post.save()
        
        await redis.del(`post:${id}`);
        await redis.del("all_posts");

        // res.status(200).json(updatedPost);

        const updatedPost = await Post.findById(id).populate("author", "name email avatar");

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost,
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


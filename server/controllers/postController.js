import Post from "../Model/Post.js"
import User from "../Model/User.js"
import redis from "../config/redisClient.js"

//Create a new Post
export const createPost = async(req, res)=>{
    try {
        const {title, desc} = req.body
        if(!title || !desc){
            return res.status(400).json({message:"Title and description are required"})
        }

        const imagePath = req.file? `uploads/${req.file.filename}`:""

        const post = await Post.create({
            title, 
            desc,
            author:req.user.id,
            image:imagePath
        })

        await redis.del("all_posts")
        res.status(201).json({message:"Post created successfully",post})
    } catch (error) {
        console.error("Error creating post:",error)
        res.status(500).json({message:"Internal server error"})
    }
}

// Get all posts
export const getAllPosts = async (req, res)=>{
    try {
        const cacheKey = "all_posts"
        const cachedPosts = await redis.get(cacheKey)
        if(cachedPosts){
            console.log("Serving posts from redis cache")
            return res.status(200).json(JSON.parse(cachedPosts))
        }
        const posts = await Post.find().populate("author","name email avatar").sort({createdAt:-1})

       await redis.set(cacheKey, JSON.stringify(posts),"EX", 60)

        console.log("Fetched posts from MongoDB")
        res.status(200).json(posts)
    } catch (error) {
        console.error("Error fetching posts:", error)
        res.status(500).json({message:"Internal server error"})
    }
}

// Get single post by ID
export const getPostById = async (req, res)=>{
    try {
        const {id} = req.params
        const cacheKey = `post:${id}`
        const cachedPost= await redis.get(cacheKey)
        if(cachedPost){
            console.log("Serving post from redis cache")
            return res.status(200).json(JSON.parse(cachedPost))
        }

        const post = await Post.findById(id).populate("author", "name email avatar")
        if(!post) return res.status(404).json({message:"Post not found"})
        
        await redis.set(cacheKey, JSON.stringify(post),  "EX:", 120 );
        console.log("Fetched posts from MongoDB")

        res.status(200).json(post)
    } catch (error) {
        console.error("Error fetching post:",error)
        res.status(500).json({message:"Internal server error"})
    }
}

// Like / Unlike a post

export const toggleLike = async (req, res)=>{
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post) return res.status(404).json({message:"Post not found"})

        const userId = req.user.id
        const isLiked = post.likes.includes(userId)

        if(isLiked){
            post.likes.pull(userId)
            await post.save()
            await redis.del(`post:${id}`)
            return res.json({message:"Post unliked",post})
        }else{
            post.likes.push(userId)
            await post.save()
            await redis.del(`post:${id}`)
            return res.json({message:"Post liked",post})
        }
    } catch (error) {
        console.error("Error toggling like:", error)
        res.status(500).json({message:"Internal server error"})
    }
}

// Delete a post
export const deletePost = async (req, res)=>{
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post) return res.status(404).json({message:"Post not found"})
        
        if(post.author.toString() !== req.user.id){
            return res.status(403).json({message:"Not Authorized to delete this post"})
        }

        await post.deleteOne()

        await redis.del("all_posts")
        await redis.del(`posts:${id}`)
        res.json({message:"Post deleted successfully"})
    } catch (error) {
       console.error("Error deleting post:",error) 
       res.status(500).json({message:"Internal server error"})
    }
}
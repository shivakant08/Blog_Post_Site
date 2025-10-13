import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import User from "./Model/User.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.get("/v1/api/users",(req, res)=>{
    res.json("Welcome to the Blog Post")
})

app.post("/v1/api/users", async (req, res)=>{
    try {
        const {name, username, email, password} = req.body
    if(!name || !username || !email || !password){
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({email})
    if(user){
        res.json("User already exists. Kindly login")
    }

    const newUser =new User({
        name,
        username,
        email,
        password
    }) 
    await newUser.save()
    res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}🚀🚀`)
    })

}).catch(error=>{
    console.log(`Connection failed❌`)
})



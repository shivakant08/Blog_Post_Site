import express from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import connectDB from "./config/db.js"
import User from "./Model/User.js"
import api from "./utils/api.js"

import router from "./routes/userRoutes.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
app.use(express.json())

app.use(`${api}`, router)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}🚀🚀`)
    })

}).catch(error=>{
    console.log(`Connection failed❌`)
})



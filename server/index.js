import express from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import cors from "cors"
import path from "path"
import fs from "fs"

import connectDB from "./config/db.js"
import User from "./Model/User.js"
import api from "./utils/api.js"

import router from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import "./config/passport.js"
import passport from "passport"
dotenv.config()
const app = express()
const PORT = process.env.PORT

const uploadDir = path.resolve("uploads")
if(!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir)
}

app.use("/uploads", express.static(uploadDir))
app.use(express.json())
app.use(cors({

    origin:[
      "https://blog-post-site-dec8kchrk-shivakants-projects-885e5318.vercel.app",
      "http://localhost:5173"],
    credentials: true
}
))
app.use(passport.initialize())

app.use(`${api}`, router)
app.use(`${api}/posts`, postRoutes)

connectDB()
  .then(() => {
    import("./config/passport.js").then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}🚀🚀`))
    })
  })
  .catch((err) => console.log("Database connection failed❌", err))




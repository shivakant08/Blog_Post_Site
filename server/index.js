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

    origin:"http://localhost:5173",
    credentials: true
}
))
app.use(passport.initialize())

app.use(`${api}`, router)

connectDB()
  .then(() => {
    import("./config/passport.js").then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}🚀🚀`))
    })
  })
  .catch((err) => console.log("Database connection failed❌", err))




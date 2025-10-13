import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const uri = process.env.MONGO_URI
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(uri)
        console.log("Established connection with the database✅")
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB



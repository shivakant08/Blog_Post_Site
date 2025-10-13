import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    } ,
    email:{
        type: String,
        required: true, 
        unique : true,
        lowercase: true
    },
    password :{
        type:String,
        required: true

    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
},{timestamp: true})

export default mongoose.model("User", userSchema)
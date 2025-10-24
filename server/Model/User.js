import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true, 
        unique : true,
        lowercase: true
    },
    role:{
        type: String,
        enum:["user", "admin"],
        default: "user"

    },
    password :{
        type:String,
        required: false

    },
    avatar:{
        type:String,
        default:""
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
},{timestamp: true})

export default mongoose.model("User", userSchema)
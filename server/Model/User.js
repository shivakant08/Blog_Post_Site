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
    bio:{
        type: String,
        default:""
    },

    resetPasswordToken:{type: String},

    resetPasswordExpires: {type: Date},
    
    createdAt:{
        type: Date,
        default: Date.now
    }
    
},{timestamps: true})

export default mongoose.model("User", userSchema)
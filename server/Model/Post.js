import mongoose from "mongoose"
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    desc:{
        type:String,
        required: true
    },
    owner:{
       type:mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true
    },

    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
}, {timestamps: true})

export default mongoose.model("Post", postSchema)
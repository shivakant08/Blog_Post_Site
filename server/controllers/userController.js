
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import User from "../Model/User.js";

//Get all non-admin users (admin only)//
export const getAllNonAdminUsers = async (req, res)=>{
    try {
        const users = await User.find({role: {$ne : "admin"}})
        if(!users || users.length === 0){
            return res.status(404).json({message:"No non-admin users in the Database"})
        }

        return res.status(200).json({message:"Users", users})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

// Get all users (admin only)
export const getAllUsers = async (req, res)=>{
    try {
        const users = await User.find()
        if(!users || users.length === 0){
            return res.status(404).json({message:"No Users in the Database"})
        }

        return res.status(200).json({message:"Users", users})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

//Register User
export const registerUser = async (req, res)=>{
    try {
        const {name, username, email, password, role} = req.body
    if(!name || !username || !email || !password){
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({ message: "User already exists. Kindly login" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser =new User({
        name,
        username,
        email,
        password:hashedPassword,
        role
    }) 
    await newUser.save()
    const { password: pw, ...userWithoutPassword } = newUser._doc;
    res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Login user
export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"})
        }


        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"User does not exist. Kindly Register first"})
        
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword) return res.status(401).json({message:"Invalid Credentials"})

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET,{expiresIn:"7d"})

        const {password:pw, ...userWithoutPassword} = user._doc

        return res.status(200).json({message:"Login Successful", token, user: userWithoutPassword})
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }

}

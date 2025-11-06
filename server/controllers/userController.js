import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Model/User.js";
import fs from "fs";
import path from "path";
import axios from "axios";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ------------------ TOKEN GENERATOR ------------------
const generateTokenAndUser = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const { password, ...userWithoutPassword } = user._doc;
  return { token, user: userWithoutPassword };
};

// ------------------ REGISTER USER ------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Kindly login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const avatarUrl = req.file ? `/uploads/${req.file.filename}` : "";
    let avatarUrl = ""
    if (req.file) {
      avatarUrl = `/uploads/${req.file.fileName}`
    } else if (avatar && avatar.startsWith("http")) {
      avatarUrl = avatar
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      avatar: avatarUrl, // ✅ manual upload image
    });

    await newUser.save();

    const { token, user } = generateTokenAndUser(newUser);
    return res
      .status(201)
      .json({ message: "User registered successfully", token, user });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ------------------ LOGIN USER ------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User does not exist. Kindly Register first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    const { token, user: userData } = generateTokenAndUser(user);
    return res
      .status(200)
      .json({ message: "Login Successful", token, user: userData });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ------------------ GOOGLE SIGN-IN ------------------
export const googleSignIn = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email, picture } = ticket.getPayload();

    if (!email_verified) {
      return res.status(400).json({ message: "Google email not verified" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      let avatarPath = "";

      if (picture) {
        const response = await axios.get(picture, { responseType: "arraybuffer" });
        const uploadDir = path.resolve("uploads");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${email.split("@")[0]}.jpg`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, response.data);
        avatarPath = `/uploads/${fileName}`;
      }

      user = new User({
        name,
        email,
        password: "",
        role: "user",
        avatar: avatarPath, // ✅ Google image saved
      });

      await user.save();
    }

    const { token, user: userData } = generateTokenAndUser(user);
    return res
      .status(200)
      .json({ message: "Google login successful", token, user: userData });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ------------------ GET ALL NON-ADMIN USERS ------------------
export const getAllNonAdminUsers = async (req, res) => {
 try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 8
    const skip = (page - 1) * limit

    // console.log("Page:", page, "Limit:", limit, "Skip:", skip)


    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } })
    // console.log("Total users:", totalUsers)
    const users = await User.find({ role: { $ne: "admin" } })
      .sort({createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      count:users.length,
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      }
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    })
  }
};

// ------------------ GET ALL USERS ------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users in the Database" });
    }
    return res.status(200).json({ message: "Users", users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



//-------------------------GET SINGLE USER---------------------------------
export const getSingleUser = async (req, res)=>{
  try {
    const {id} = req.params
    const user = await User.findById(id).select("-password")
    if(!user) return res.status(404).json({message:"User not found"})
    res.status(200).json({user})
  } catch (err) {
    res.status(500).json({message:"Error fetching user", error: err.message})
  }
}
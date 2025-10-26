import express from "express";
import passport from "passport"
import {
  getAllUsers,
  getAllNonAdminUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../Middlewares/auth.js";
import upload from "../Middlewares/upload.js";

const router = express.Router();

// Public routes
router.post(`/register`,upload.single("avatar"), registerUser);
router.post("/login", loginUser);

//Google OAuth routes
router.get("/google", passport.authenticate("google",{scope:["profile","email"]}))

router.get("/google/callback",
  passport.authenticate("google",{session:false, failureRedirect: "http://localhost:5173"}),
  (req, res)=>{
    const {token, user} = req.user
    // res.json({message:"Google login successful", token, user})
    const encodedUser = encodeURIComponent(JSON.stringify(user))
    res.redirect(`http://localhost:5173/google-success?token=${token}&user=${encodedUser}`)
  }
)

// Get user profile (for logged-in users)
router.get("/profile", authenticate, (req, res)=>{
  res.json({
    message:"User profile fetched successfully",
    user:req.user
  })
})

// Protected routes
router.get(`/users`, authenticate, authorize("admin"), getAllUsers);
router.get(`/non-admins`, authenticate, authorize("user", "admin"), getAllNonAdminUsers);

export default router;

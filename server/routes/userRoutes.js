import express from "express";
import {
  getAllUsers,
  getAllNonAdminUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../Middlewares/auth.js";

const router = express.Router();

// Public routes
router.post(`/register`, registerUser);
router.post("/login", loginUser);

// Protected routes
router.get(`/users`, authenticate, authorize("admin"), getAllUsers);
router.get(`/non-admins`, authenticate, authorize("user", "admin"), getAllNonAdminUsers);

export default router;

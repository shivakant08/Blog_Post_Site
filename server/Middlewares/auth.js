import jwt from "jsonwebtoken"
import User from "../Model/User.js";

export const authenticate = async(req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token) return res.status(401).json({message:"Access Denied.No Token Provided"})
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export const authorize =(...allowedRoles)=>{
return (req, res, next)=>{
    if(!req.user) return res.status(401).json({message: "Unauthorized"})
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({message:"Forbidden"})
    next()
}
}
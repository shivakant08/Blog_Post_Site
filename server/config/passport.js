import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../Model/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"
dotenv.config()

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/v1/api/google/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                
                const {displayName, emails, photos } = profile
                const email = emails?.[0]?.value
                const avatar = photos?.[0]?.value

                if(!email) return done(new Error("No email provided by Google"), null)

                let user = await User.findOne({ email })

                if (!user) {
                    const response = await axios.get(avatar,{
                        responseType:"arraybuffer",
                    })

                    const fileName = `${Date.now()}-${email.split("@")[0]}.jpg`
                    const filePath = path.join("uploads", fileName)
                    fs.writeFileSync(filePath, response.data)

                    user = await User.create({
                        name: displayName,
                        email,
                        password: "",
                        role: "user",
                        avatar: `/uploads/${fileName}`

                    })
                   
                }
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
                return done(null, { user, token })
            } catch (error) {
                console.error("Google Auth Error:", error)
                return done(error, null)
            }
        }

    )
)

passport.serializeUser((data, done)=>done(null, data))
passport.deserializeUser((data, done)=>done(null, data))
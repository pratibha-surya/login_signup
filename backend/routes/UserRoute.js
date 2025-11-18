
import express from "express"
import { login, Profile, Signup } from "../controller/userController.js"
import authMiddleware from "../middleware/authmiddleware.js"
const router = express.Router()
router.post("/signup",Signup)
router.post("/login",login)
router.get ("/profile",authMiddleware,Profile)
export default router
import express from "express"
import { googleAuth, login, logOut, Register } from "../controller/authController.js";
const router = express.Router();




router.post("/register",Register)
router.post("/login",login)
router.post("/google",googleAuth)
router.post("/logout",logOut)



export default router;
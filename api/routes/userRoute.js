import express from "express"
import { deleteUser, getUser, updateUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();



router.patch("/update/:id", verifyToken, updateUser)
router.delete("/delete/:id", verifyToken, deleteUser)
router.get("/getuser/:id", verifyToken, getUser)

export default router;
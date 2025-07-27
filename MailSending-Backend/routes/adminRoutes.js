import express from "express"
import { AllUser, UpdateUser } from "../controllers/adminController.js"
import {resetPasswordAdmin, verifyResetOTP,resetPassword, loginAdmin } from "../controllers/adminAuhtController.js"
const router = express.Router()

router.get("/allUser" , AllUser)
router.put("/updateUser", UpdateUser)
router.post("/forgot", resetPasswordAdmin)
router.post('/verify', verifyResetOTP)
router.post('/reset',resetPassword)
router.post('/login', loginAdmin)
export default router;

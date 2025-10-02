import express from "express";
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';
import { requestOtp } from "../controllers/otpRequest.controller.js";
import { verifyOtp } from "../middlewares/verifyOtpMiddleware.js";
import { signupHost } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/signup-host",verifyOtp,signupHost)
router.post("/signin",signin)
router.post("/google",google)
router.get("/signout",signOut)
router.post("/send-otp",requestOtp)


export default router;
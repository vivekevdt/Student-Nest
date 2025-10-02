
import { sendOtpEmail } from "../utils/sendEmail.js";
import otpModel from "../models/otp.model.js";


// Generate random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Example route handler
export const requestOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });
  
    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  
    try {
      // Save or update OTP in DB
      await otpModel.findOneAndUpdate(
        { email },
        { otp, expiresAt },
        { upsert: true, new: true }
      );
  
      const emailSent = await sendOtpEmail(email, otp);
  
      if (emailSent) {
        res.json({ success: true, message: "OTP sent to email" });
      } else {
        res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
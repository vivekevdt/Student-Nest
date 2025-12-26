import User from "../models/User.js"; // assuming MongoDB
import Otp from "../models/Otp.js";   // store otp with expiry

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP required" });
  }

  // Find OTP record
  const otpRecord = await Otp.findOne({ email });
  if (!otpRecord) {
    return res.status(400).json({ success: false, message: "OTP not found" });
  }

  // Check expiry
  if (otpRecord.expiresAt < Date.now()) {
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  // Check if OTP matches
  if (otpRecord.otp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // OTP is valid → create user session / JWT
  const user = await User.findOneAndUpdate(
    { email },
    { $setOnInsert: { email } }, // create new user if not exists
    { new: true, upsert: true }
  );

  // Example JWT
  const token = "JWT_TOKEN_HERE"; // generate with jsonwebtoken

  // Delete OTP (one-time use)
  await Otp.deleteOne({ email });

  return res.json({ success: true, message: "Login successful", token, user });
};

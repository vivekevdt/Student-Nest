import otpModel from "../models/otp.model.js";

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const record = await otpModel.findOne({ email });

    if (!record) {
      return res.status(400).json({ success: false, message: "No OTP request found"});
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP is valid → delete it after verification
    await otpModel.deleteOne({ email });

    // Pass control to next middleware / controller
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

import dotenv from "dotenv";
dotenv.config(); // <-- MUST be called first
import nodemailer from "nodemailer";

// Create reusable transporter (using Gmail here)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail ID
    pass: process.env.EMAIL_PASS, // your Gmail App Password
  },
});
console.log( process.env.EMAIL_USER)

/**
 * Send OTP to user's email
 * @param {string} to - recipient email
 * @param {string} otp - generated OTP
 */
export const sendOtpEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: `"Student Nest" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP for Login",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2563eb;">🔐 Student Nest Login</h2>
          <p>Here is your OTP for login:</p>
          <h1 style="color: #111827; letter-spacing: 3px;">${otp}</h1>
          <p>This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.</p>
          <br/>
          <p>Regards,<br/>Student Nest Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
};

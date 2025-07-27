import Admin from "../models/Admin.js";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import dotenv from "dotenv";

dotenv.config();

const mailerSend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });
const sender = new Sender("info@blastinvo.info", "Blastinvo");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtpEmail = async (toEmail, subject, htmlContent) => {
  const recipients = [new Recipient(toEmail, "")];
  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(htmlContent);
  await mailerSend.email.send(emailParams);
};
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Enter both email and password" });
    }

    if (email !== "razaa0802@gmail.com") {
      return res.status(400).json({ success: false, message: "Enter valid admin email only" });
    }

    const checkUser = await Admin.findOne({ email, password });

    if (!checkUser) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    console.log("Admin logged in:", checkUser.email);
    return res.status(200).json({ success: true, message: "User login success" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const resetPasswordAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    if (email !== "razaa0802@gmail.com") {
      return res.status(400).json({ error: "Please enter the correct admin email" });
    }

    let admin = await Admin.findOne({ email });
    if (!admin) {
      if (!admin) {
      admin = await Admin.create({
        email,
        password: "Admin#123@PassKeySequrePassword",
      });
      console.log("Admin created automatically.");
    }
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;
    console.log(otp, "otp")
    admin.resetPasswordToken = otp;
    admin.resetPasswordExpires = otpExpires;
    await admin.save();

    await sendOtpEmail(
      email,
      "Admin Password Reset OTP",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Admin Password Reset OTP</h2>
          <p>Your OTP is:</p>
          <div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
        </div>
      `
    );

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const verifyResetOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const admin = await Admin.findOne({
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const admin = await Admin.findOne({
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    admin.password = newPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

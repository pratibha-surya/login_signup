import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"




export  const Signup =async (req, res) => {
    try {const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
         return res .status(402).json({ msg: "User already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPass });
    await user.save();

    res.status(201).json({ msg: "Signup successful" });
        
    } catch (error) {
        res.status(500).json({ msg: err.message });
  }

        
    
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Login Notification",
      text: `Hello ${user.name || "User"},\n\nYou just logged into your account successfully.\n\nIf this wasn't you, secure your account immediately.`,
    };

    
    await transporter.sendMail(mailOptions);

    
    res.status(200).json({ msg: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};


export const Profile=async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
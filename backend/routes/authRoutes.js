const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Invitation = require("../models/invitationModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Blacklist = require("../models/Blacklist");
const { protect } = require("../middleware/authMiddleware");
const axios = require('axios');
const Company = require("../models/Company");
const mongoose = require('mongoose');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // typically 587 for TLS
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_CONTACT,
    pass: process.env.EMAIL_CONTACT_PASS,
  },
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const newCompany = new Company({
      userIds: [new mongoose.Types.ObjectId(user?._id)]
    })

    const savedCompany = await newCompany.save();

    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      { dashboardId: savedCompany?._id }, // Set the dashboardId to the updated company's ID
      { new: true } // Optional: get the updated user object back
    );

    console.log(savedCompany);
    

    console.log(updatedUser);
    

    const transporterSignUp = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // typically 587 for TLS
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_ADMIN_PASS,
      },
    });

    const mailOptions = {
      from: "admin@instacruit.no",
      to: email,
      subject: "Velkommen til vår Instacruit!",
      text: `Hei ${name},\n\nDin konto har blitt opprettet.\n\nHer er dine påloggingsdetaljer:\n\nE-post: ${email}\nPassord: ${password}\n\nVennligst endre passordet ditt etter din første pålogging av sikkerhetsmessige årsaker.\n\nVennlig hilsen,\nDitt team`,
    };

    await transporterSignUp.sendMail(mailOptions);


    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dashboardId: user?.dashboardId,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register-invitation", async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  console.log("comes in route");
  
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const invitation = await Invitation.findOne({ token });
    if (!invitation) {
      return res
        .status(400)
        .json({ error: "Invalid token or invitation not found" });
    }

    if (invitation.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Invitation expired" });
    }

    const { name, email, dashboardId } = invitation;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password,
      dashboardId
    });

    await Company.updateOne(
      { _id: dashboardId }, // The company you want to update
      { $push: { userIds: new mongoose.Types.ObjectId(user?._id) } } // Add another user ID
    );

    await Invitation.deleteOne({ token });

    const mailOptions = {
      from: process.env.EMAIL_CONTACT,
      to: email,
      subject: "Welcome to Our instacruit!",
      text: `Hello ${name},\n\nYour account has been successfully activated. You can now log in with your credentials.\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "User activated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        dashboardId: user?.dashboardId,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if(user?.role === "ADMIN"){

        const token = generateToken(user._id);

        res.cookie("authToken", token, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production", // Only use secure in production
          sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Use lax during development
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send the user data in the response
        
        console.log("worked");
        
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token
        });

        // res.json({
        //   _id: user._id,
        //   name: user.name,
        //   email: user.email,
        //   token: generateToken(user._id),
        // });
      }
      else{
        res.status(401).json({ message: "Only admin can login" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/dashboard", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDashboardData = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(200).json({ dashboardData: userDashboardData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", protect, async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    await Blacklist.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }

});
router.post("/admin-logout", protect, async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    await Blacklist.create({ token });

    res.clearCookie("authToken", {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Use lax during development
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
});

router.get("/user-info", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

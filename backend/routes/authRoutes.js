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
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Velkommen til vår Instacruit!",
      text: `Hei ${name},\n\nDin konto har blitt opprettet.\n\nHer er dine påloggingsdetaljer:\n\nE-post: ${email}\nPassord: ${password}\n\nVennligst endre passordet ditt etter din første pålogging av sikkerhetsmessige årsaker.\n\nVennlig hilsen,\nDitt team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register-invitation", async (req, res) => {
  const { token, password, confirmPassword } = req.body;

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

    const { name, email } = invitation;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await Invitation.deleteOne({ token });

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
        token: generateToken(user._id),
      });
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

const dotenv = require("dotenv");
const crypto = require("crypto");
const Invitation = require("../models/invitationModel");
const User = require("../models/user");
const emailService = require("../services/emailService");
const generateToken = require("../utils/generateTokens");
dotenv.config();
exports.sendInvitation = async (req, res) => {
  const { name, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const existingInvitation = await Invitation.findOne({ email });
    if (existingInvitation && existingInvitation.expiresAt > Date.now()) {
      return res.status(400).json({ error: "Invitation already sent" });
    }
    const token = generateToken();
    const expiresAt = Date.now() + 3600000 * 24;

    const invitation = new Invitation({ name, email, token, expiresAt });
    await invitation.save();

    const registrationLink = `${process.env.CLIENT_URL}/invitation/${token}`;

    await emailService.sendInvitationEmail(name, email, registrationLink);

    res.status(200).json({ message: "Invitation sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send the invitation" });
  }
};

exports.registerUser = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  console.log("Received token:", token);
  console.log("Received password:", password);
  console.log("Received confirmPassword:", confirmPassword);

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const invitation = await Invitation.findOne({ token });
    if (!invitation || invitation.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const { name, email } = invitation;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }
    const newUser = new User({ name, email, password });

    await newUser.save();
    await Invitation.deleteOne({ token });
    res.status(201).json({
      message: "User registered successfully!",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

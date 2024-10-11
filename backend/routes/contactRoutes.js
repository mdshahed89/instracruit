const express = require("express");
const router = express.Router();
const {
  sendContactEmail,
  sideOneContact,
} = require("../services/emailService");

router.post("/send-email", async (req, res) => {
  const { companyName, email, phoneNumber, message, subscribe } = req.body;

  if (!companyName || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await sendContactEmail(companyName, email, phoneNumber, message, subscribe);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

router.post("/send-email-sideone", async (req, res) => {
  const { companyName, email, message } = req.body;

  if (!companyName || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await sideOneContact(companyName, email, message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

module.exports = router;

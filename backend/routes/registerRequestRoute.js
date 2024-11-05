const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "send.one.com", 
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.EMAIL_ONE_CONTACT, 
    pass: process.env.EMAIL_TEAM_PASS, 
  },
});

router.post("/send-email", async (req, res) => {
  const { companyName, email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_ONE_CONTACT,
    to: process.env.EMAIL_ONE_CONTACT,
    subject: `${companyName}  registrert interesse for å bli instacruiter!`,
    text: `Company Name: ${companyName}\nEmail: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
});

module.exports = router;

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
      port: 587, // typically 587 for TLS
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_CONTACT,
        pass: process.env.EMAIL_CONTACT_PASS,
      },
});

router.post("/send-email", async (req, res) => {
  const { companyName, email } = req.body;

  const mailOptions = {
    from: email,
    to: "kontakt@instacruit.no",
    subject: "New Contact Form Submission",
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

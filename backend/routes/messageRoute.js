const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.post("/save-message", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const newMessage = new Message({ message });
    const savedMessage = await newMessage.save();
    res
      .status(200)
      .json({ message: "Message saved successfully!", data: savedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving message" });
  }
});

module.exports = router;

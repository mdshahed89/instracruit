const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const nodemailer = require("nodemailer");
const { protect } = require("../middleware/authMiddleware");

const upload = require("../config/cloudinary");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

router.post("/", protect, async (req, res) => {
  const { campaignInfo, customerInfo, quizzes } = req.body;

  if (!campaignInfo || !customerInfo || !quizzes) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newCandidate = new Candidate({
      campaignInfo,
      customerInfo,
      quizzes,
      userId: req.user.id,
    });

    await newCandidate.save();
    res
      .status(201)
      .json({ message: "Candidate added successfully", newCandidate });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const candidates = await Candidate.find({ userId: req.user.id });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    console.log("Candidate ID:", req.params.id);
    console.log("User ID:", req.user.id);

    const candidate = await Candidate.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    console.log("Fetched candidate:", candidate);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error fetching candidate:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.put("/:id/job-match", protect, async (req, res) => {
  const { progress } = req.body;

  try {
    const candidate = await Candidate.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.jobMatchProgress = progress;
    await candidate.save();
    res
      .status(200)
      .json({ message: "Job match progress updated successfully", candidate });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.put("/:id/position", protect, async (req, res) => {
  const { columnPosition } = req.body;

  try {
    const candidate = await Candidate.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.columnPosition = columnPosition;
    await candidate.save();
    res.status(200).json({
      message: "Candidate column position updated successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.post("/send-email", protect, async (req, res) => {
  const { to, subject, text, candidateId, questions } = req.body;

  if (!to || !subject || !text || !candidateId || !questions) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
    const candidate = await Candidate.findOne({
      _id: candidateId,
      userId: req.user.id,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.questions = questions;
    await candidate.save();

    res.status(200).json({ message: "Email sent and questions saved" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

router.get("/:id/get-questions", protect, async (req, res) => {
  try {
    const candidate = await Candidate.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ questions: candidate.questions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:id/screening-answers", protect, async (req, res) => {
  try {
    const candidate = await Candidate.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      questions: candidate.questions || [],
      answers: candidate.answers || [],
      resumeUrl: candidate.resumeUrl || "",
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.post(
  "/:id/submit-answers",
  protect,
  upload.single("resume"),
  async (req, res) => {
    const { questions, answers } = req.body;
    const candidateId = req.params.id;

    try {
      const candidate = await Candidate.findOne({
        _id: candidateId,
        userId: req.user.id,
      });

      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      candidate.questions = JSON.parse(questions);
      candidate.answers = JSON.parse(answers);

      if (req.file) {
        candidate.resumeUrl = req.file.path;
      }

      await candidate.save();

      res
        .status(200)
        .json({ message: "Answers and resume saved successfully" });
    } catch (error) {
      console.error("Error saving candidate data:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }
);

module.exports = router;

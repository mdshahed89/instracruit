const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const nodemailer = require("nodemailer");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/user")
const upload = require("../config/cloudinary");
const Jobs = require("../models/Jobs");
const Company = require("../models/Company")

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "send.one.com", // one.com SMTP server
    port: 587, // Secure port for SSL
    secure: false, // SSL for encryption
    auth: {
      user: process.env.EMAIL_TEAM, // Your one.com email
      pass: process.env.EMAIL_TEAM_PASS, // Your one.com password (from environment variables)
    },
  });
};

router.get("/jobs/:id", async (req, res) => {
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json({
        success: false,
        message: "Job Id is required"
      })
    }
    const job = await Jobs.findById(id)
    if(!job){
      return res.status(404).json({ success: false,message: "Job not found" });
    }
    res.status(200).json({
      success: true,
      message: "Job found successfully",
      data: job
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error when getting job" });
  }
} )

router.post("/", protect, async (req, res) => {
  const { campaignInfo, customerInfo, quizzes } = req.body;

  if (!campaignInfo || !customerInfo || !quizzes) {
    return res.status(400).json({ message: "Missing required fields" });
  }
console.log(req.user);

  try {

    const user = await User.findById(req?.user?.id)

    if(!user){
      res
      .status(404)
      .json({ message: "User not found" });
    }

    const newCandidate = new Candidate({
      campaignInfo,
      customerInfo,
      quizzes,
      dashboardId: user?.dashboardId,
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

router.post("/create-job", async (req, res) => {
  try {
    const {customerInfo, questions, answers, dashboardId} = req.body
    if(!customerInfo || !questions || !answers || !dashboardId){
      return res.status(400).json({
        success: false,
        message: "Required field missing"
      })
    }
    const newCandidate = new Candidate({
      customerInfo,
      questions,
      answers,
      dashboardId
    })

    newCandidate.save()

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      data: newCandidate
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false,message: "Server Error of creat-job" });
  }
})

router.get("/", protect, async (req, res) => {
  try {

    const user = await User.findById(req?.user?.id)

    if(!user){
      res
      .status(404)
      .json({ message: "User not found" });
    }

    const candidates = await Candidate.find({ dashboardId: user?.dashboardId });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {

    const user = await User.findById(req?.user?.id)

    if(!user){
      res
      .status(404)
      .json({ message: "User not found" });
    }

    console.log("Candidate ID:", req.params.id);
    console.log("Dashboard ID:", user?.dashboardId);

    const candidate = await Candidate.findOne({
      _id: req.params.id,
      dashboardId: user?.dashboardId,
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

    const user = await User.findById(req?.user?.id)

    if(!user){
      res
      .status(404)
      .json({ message: "User not found" });
    }

    const candidate = await Candidate.findOne({
      _id: req.params.id,
      dashboardId: user?.dashboardId,
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

    const user = await User.findById(req?.user?.id)

    if(!user){
      res
      .status(404)
      .json({ message: "User not found" });
    }

    const candidate = await Candidate.findOne({
      _id: req.params.id,
      dashboardId: user?.dashboardId,
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
  const { to, candidateId, questions } = req.body;

  if (!to || !candidateId || !questions) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {

    const cnd = await Candidate.findById(candidateId)

    const company = await Company.findById(cnd?.dashboardId)

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_TEAM,
      to,
      subject: "Vennligst send din CV og svar på noen spørsmål",
      text: `Kjære ${cnd?.customerInfo?.fulltNavn},\nTakk for din interesse for stillingen hos ${company?.companyName}. For å kunne gå videre med din søknad, ber vi deg om å sende oss din oppdaterte CV og svare på noen spørsmål. Du finner spørsmålene i den følgende lenken:\n${process.env.CLIENT_URL}/questions/${candidateId}\nVennligst send oss din CV og svar på spørsmålene så snart som mulig. Hvis du har noen spørsmål eller trenger ytterligere informasjon, er du velkommen til å ta kontakt med oss.\n\nMed vennlig hilsen\n${company?.companyName}
          `,
    };
    await transporter.sendMail(mailOptions);

    const user = await User.findById(req?.user?.id)

    if(!user){
      res
      .status(404)
      .json({ message: "User not found" });
    }

    const candidate = await Candidate.findOne({
      _id: candidateId,
      dashboardId: user?.dashboardId,
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

router.get("/:id/get-questions", async (req, res) => {
  try {

    const {id} = req.params
    // const user = await User.findById(req?.user?.id)

    // if(!user){
    //   res
    //   .status(404)
    //   .json({ message: "User not found" });
    // }

    // const candidate = await Candidate.findOne({
    //   _id: req.params.id,
    //   dashboardId: user?.dashboardId,
    // });

    const candidate = await Candidate.findById(id)

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

    const user = await User.findById(req?.user?.id)

    if(!user){
      res
      .status(404)
      .json({ message: "User not found" });
    }

    const candidate = await Candidate.findOne({
      _id: req.params.id,
      dashboardId: user?.dashboardId,
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
  upload.single("resume"),
  async (req, res) => {
    const { questions, answers } = req.body;
    const candidateId = req.params.id;
    console.log("working")
    
    try {
      
    //   const user = await User.findById(req?.user?.id)

    // if(!user){
    //   res
    //   .status(404)
    //   .json({ message: "User not found" });
    // }

      const candidate = await Candidate.findOne({
        _id: candidateId,
        // dashboardId: user?.dashboardId,
      });

      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      candidate.questions = JSON.parse(questions);
      candidate.answers = JSON.parse(answers);

      if (req?.file) {
        candidate.resumeUrl = req.file?.path;
        console.log(req.file?.path);
        
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

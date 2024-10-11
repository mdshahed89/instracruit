const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/:id/submit-answers", upload.single("cv"), async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const answers = JSON.parse(req.body.answers);

    candidate.quizzes.forEach((quiz, index) => {
      quiz.answer = answers[index];
    });
    if (req.file) {
      candidate.cv = req.file.filename;
    }
    await candidate.save();

    res.status(200).json({ message: "Answers and CV submitted successfully" });
  } catch (error) {
    console.error("Error saving answers and CV:", error);
    res.status(500).json({ message: "Error saving answers and CV", error });
  }
});

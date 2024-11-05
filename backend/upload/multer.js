const multer = require("multer");
const Candidate = require("../models/Candidate")

// Use memoryStorage instead of diskStorage
const storage = multer.memoryStorage();
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

    if (req?.file) {
      // You can access file buffer via req.file.buffer and upload it to an external storage service
      const cvBuffer = req.file.buffer;

      // For demonstration purposes, save the filename in the database (you may need to upload the file to a remote service here)
      console.log(req?.file?.originalname);
      
      candidate.cv = req?.file?.originalname;  // Or use a generated name, depending on your requirement
    }

    await candidate.save();

    res.status(200).json({ message: "Answers and CV submitted successfully" });
  } catch (error) {
    console.error("Error saving answers and CV:", error);
    res.status(500).json({ message: "Error saving answers and CV", error });
  }
});

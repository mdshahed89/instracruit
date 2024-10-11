const express = require("express");
const multer = require("multer");
const Company = require("../models/Company");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/company", upload.single("file"), async (req, res) => {
  try {
    const {
      companyName,
      about,
      industry,
      website,
      facebook,
      instagram,
      youtube,
      linkedin,
    } = req.body;
    const file = req.file ? req.file.filename : null;

    const newCompany = new Company({
      companyName,
      about,
      industry,
      website,
      facebook,
      instagram,
      youtube,
      linkedin,
      file,
    });

    await newCompany.save();
    res
      .status(200)
      .json({ message: "Company information saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving company information." });
  }
});

module.exports = router;

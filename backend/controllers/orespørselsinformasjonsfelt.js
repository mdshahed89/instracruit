const FormData = require("../models/Forespørselsinformasjonsfelt");

exports.saveFormData = async (req, res) => {
  const { fields, askForCV } = req.body;

  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return res.status(400).json({ message: "Fields are required" });
  }

  if (typeof askForCV !== "boolean") {
    return res.status(400).json({ message: "askForCV must be a boolean" });
  }

  try {
    const newFormData = new FormData({
      fields: fields.map((field) => ({ value: field })),
      askForCV,
    });

    await newFormData.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

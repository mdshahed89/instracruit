const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    questions: [
      {
        question: { type: String, required: true },
      },
    ],
    answers: [
      {
        answer: { type: String },
      },
    ],
    dashboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

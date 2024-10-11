const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const candidateSchema = new mongoose.Schema(
  {
    campaignInfo: {
      stillingsbetegnelse: { type: String, required: true },
      kilde: { type: String, required: true },
      kampanje: { type: String, required: true },
    },
    customerInfo: {
      fulltNavn: { type: String, required: true },
      epost: { type: String, required: true },
      telefonnummer: { type: String, required: true },
      by: { type: String, required: true },
      adresse: { type: String, required: true },
      postnummer: { type: String, required: true },
    },
    quizzes: [quizSchema],
    jobMatchProgress: { type: Number, default: 0 },
    columnPosition: { type: String, default: "ikke-kvalifisert" },
    cv: { type: String },
    questions: [String],
    answers: [String],
    resumeUrl: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);

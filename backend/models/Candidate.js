const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});

const candidateSchema = new mongoose.Schema(
  {
    campaignInfo: {
      stillingsbetegnelse: { type: String },
      kilde: { type: String },
      kampanje: { type: String },
    },
    customerInfo: {
      fulltNavn: { type: String },
      epost: { type: String },
      telefonnummer: { type: String },
      by: { type: String },
      adresse: { type: String },
      postnummer: { type: String },
    },
    quizzes: [quizSchema],
    jobMatchProgress: { type: Number, default: 0 },
    columnPosition: { type: String, default: "ikke-kvalifisert" },
    cv: { type: String },
    questions: [String],
    answers: [String],
    resumeUrl: { type: String },
    dashboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);

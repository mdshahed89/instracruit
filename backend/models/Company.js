const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  about: { type: String, required: true },
  industry: { type: String, required: true },
  website: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  youtube: { type: String },
  linkedin: { type: String },
  file: { type: String },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

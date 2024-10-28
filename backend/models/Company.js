const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String },
  about: { type: String },
  industry: { type: String },
  website: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  youtube: { type: String },
  linkedin: { type: String },
  file: { type: String },
  userIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
  ]
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

const mongoose = require("mongoose");

const ForespørselsinformasjonsfeltSchema = new mongoose.Schema({
  fields: [
    {
      value: { type: String, required: true },
    },
  ],
  askForCV: { type: Boolean, required: true },
});

const FormData = mongoose.model("FormData", ForespørselsinformasjonsfeltSchema);

module.exports = FormData;

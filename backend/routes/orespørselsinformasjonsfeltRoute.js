const express = require("express");
const router = express.Router();
const { saveFormData } = require("../controllers/orespørselsinformasjonsfelt");

router.post("/save", saveFormData);

module.exports = router;

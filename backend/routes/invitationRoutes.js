const express = require("express");
const router = express.Router();
const {
  sendInvitation,
  registerUser,
} = require("../controllers/invitationController");

router.post("/invite", sendInvitation);

router.post("/register", registerUser);

module.exports = router;

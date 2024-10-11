const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Blacklist = require("../models/Blacklist"); 
dotenv.config();

const protect = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("Authorization Header:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization token missing or malformed.");
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed." });
  }

  try {
    const jwtToken = authHeader.split(" ")[1];
    console.log("JWT Token:", jwtToken); 
    const blacklistedToken = await Blacklist.findOne({ token: jwtToken });
    if (blacklistedToken) {
      console.log("Token is blacklisted. User has logged out.");
      return res
        .status(401)
        .json({ message: "You've logged out. Please log in again." });
    }

 
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); 

    req.user = decoded; 
    console.log("User authenticated successfully with ID:", decoded.id); 

    next(); 
  } catch (error) {
    console.error("JWT Error:", error);

    if (error.name === "TokenExpiredError") {
      console.log("Token has expired.");
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      console.log("Invalid token.");
      return res
        .status(401)
        .json({ message: "Invalid token. Authorization denied." });
    }
    console.log("Internal server error during authorization.");
    return res
      .status(500)
      .json({ message: "Internal server error during authorization." });
  }
};

module.exports = { protect };

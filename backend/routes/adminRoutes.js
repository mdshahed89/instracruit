const express = require("express");
const Companies = require("../models/Company");
const Admin = require("../models/Admin");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Job = require("../models/Jobs");

dotenv.config();

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

router.post("/auth/send-email", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name & Email is required",
      });
    }
    const existAdmin = await Admin.findOne({ email });

    if (existAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exist",
      });
    }

    const admin = await Admin.create({
      name,
      email,
    });

    const transporter = nodemailer.createTransport({
      host: "send.one.com", // one.com SMTP server
      port: 587, // Secure port for SSL
      secure: false, // SSL for encryption
      auth: {
        user: process.env.EMAIL_ONE_ADMIN, // Your one.com email
        pass: process.env.EMAIL_TEAM_PASS, // Your one.com password (from environment variables)
      },
    });

    const encodedName = encodeURIComponent(name);
    const encodedEmail = encodeURIComponent(email);
    const registrationLink = `${process.env.CLIENT_URL}/admin/signup?name=${encodedName}&email=${encodedEmail}`;

    const mailOptions = {
      from: "admin@instacruit.no",
      to: email,
      subject: "Velkommen til vår Instacruit!",
      text: `Hi ${name},\n\nYou have been invited to join. Please click on the link below to complete your admin registration:\n${registrationLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Admin Registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error send auth email",
    });
  }
});

router.post("/complete-signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email & Password is required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed for register",
      });
    }

    if (admin?.password) {
      return res.status(400).json({
        success: false,
        message: "Account already activated",
      });
    }

    console.log(admin?.password);

    admin.password = password;

    await admin.save();

    const transporter = nodemailer.createTransport({
      host: "send.one.com", // one.com SMTP server
      port: 587, // Secure port for SSL
      secure: false, // SSL for encryption
      auth: {
        user: process.env.EMAIL_ONE_ADMIN, // Your one.com email
        pass: process.env.EMAIL_TEAM_PASS, // Your one.com password (from environment variables)
      },
    });

    const mailOptions = {
      from: "admin@instacruit.no",
      to: email,
      subject: "Welcome to Our instacruit!",
      text: `Hello ${name},\n\nYour account has been successfully activated. You can now log in with your credentials.\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Admin Registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error during admin signup",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id);

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only use secure in production
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Use lax during development
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Send the user data in the response

      console.log("worked");

      return res.status(200).json({
        success: true,
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: token,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error during admin login",
    });
  }
});

router.post("/details", async (req, res) => {
  try {
    const { id } = req.body;

    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return res.status(400).json({ message: "User does not exist" });
    }

    res
      .status(201)
      .json({ message: "User data found successfully", user: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const {id} = req.params
    const {name, email, password} = req.body
    if(!name && !email && !password){
      return res.status(404).json({
        success: false,
        message: "Nothing to update"
      })
    }

    const admin = await Admin.findById(id)

    if(!admin){
      return res.status(404).json({
        success: false,
        message: "Admin does not exist"
      })
    }

    if(name){
      admin.name = name
    }
    if(email){
      admin.email = email
    }
    if(password){
      // if (admin && (await admin.matchPassword(password))){
        admin.password = password
      // }
      // else{
      //   return res.status(400).json({
      //     success: false,
      //     message: "Password is wrong"
      //   })
      // }
    }

    const updatedAdmin = await admin.save()

    if(updatedAdmin){
      res.status(200).json({
        success: true,
        message: "Admin Information updated successfully"
      })
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error of admin update route" });
  }
})

router.get("/companies", async (req, res) => {
  try {
    const companies = await Companies.find();

    if (!companies) {
      res.status(404).json({ message: "Companies not found" });
    }

    res
      .status(200)
      .json({ message: "Companies found successfully", data: companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/create-job-position", async (req, res) => {
  try {
    const { questions, dashboardId } = req.body;

    if(!questions || !dashboardId){
        return res.status(400).json({ success: false,message: "Questions and dashboardId is required" });
    }

    const formattedQuestions = questions.map((q) => ({ question: q }));

    const newJob = new Job({
      questions: formattedQuestions,
      dashboardId,
    });

    await newJob.save();

    res.status(201).json({ success: true,message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false,message: "Server error in create-job-position" });
  }
});

router.get("/company/:id/job-positions", async (req, res) => {
  try {

    const {id} = req.params

    const jobs = await Job.find({
      dashboardId: id
    })

    if(!jobs){
      return res.status(404).json({
        success: false,
        message: "Job not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Job found successfully",
      data: jobs
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false,message: "Server error in getting-job-positions" });
  }
})

module.exports = router;

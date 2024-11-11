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
      if(existAdmin?.password){
        return res.status(400).json({
          success: false,
          message: "The Admin already exists",
        });
      }else{
        return res.status(400).json({
          success: false,
          message: "The Admin already Invited",
        });
      }
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
      text: `Hi ${name},\n\nDu har blitt invitert til å bli med.\nVennligst klikk på lenken nedenfor for å fullføre din admin-registrering:\n${registrationLink}\n\nSer frem til å ha deg med på laget!\nVennlig hilsen,\nInstacruit Admin`,
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
        secure: process.env.NODE_ENV === "production", // true for production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        domain:
          process.env.NODE_ENV === "production" ? "instacruit.no" : "localhost",
      });

      // Send the user data in the response

      console.log("worked");
      console.log(process.env.NODE_ENV);

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
    const { id } = req.params;
    const { name, address, phoneNo, email } = req.body;
    if (!name && !address && !phoneNo) {
      return res.status(404).json({
        success: false,
        message: "Nothing to update",
      });
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    if (name) {
      admin.name = name;
    }
    if (address) {
      admin.address = address;
    }
    if (phoneNo) {
      // if (admin && (await admin.matchPassword(password))){
      admin.phoneNo = phoneNo;
      // }
      // else{
      //   return res.status(400).json({
      //     success: false,
      //     message: "Password is wrong"
      //   })
      // }
    }

    const updatedAdmin = await admin.save();

    if (updatedAdmin) {
      res.status(200).json({
        success: true,
        message: "Admin Information updated successfully",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error of admin update route" });
  }
});


router.post("/change-email/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Required field missing",
      });
    }

    if(password!==confirmPassword){
      return res.status(400).json({
        success: false,
        message: "Password and confirm password should be match"
      })
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    if (admin && (await admin.matchPassword(password))) {
      admin.email = email
    }
    else{
      return res.status(400).json({
        success: false,
        message: "Wrong password"
      })
    }
    
    const updatedAdmin = await admin.save()

    if (updatedAdmin) {
      res.status(200).json({
        success: true,
        message: "Admin Information updated successfully",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error of admin email change route" });
  }
});

router.post("/change-password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Required field missing",
      });
    }

    if(newPassword!==confirmPassword){
      return res.status(400).json({
        success: false,
        message: "New password and confirm password should be match"
      })
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    if (admin && (await admin.matchPassword(oldPassword))) {
      admin.password = newPassword
    }
    else{
      return res.status(400).json({
        success: false,
        message: "Wrong password"
      })
    }
    
    const updatedAdmin = await admin.save()

    if (updatedAdmin) {
      res.status(200).json({
        success: true,
        message: "Admin Information updated successfully",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error of admin password change route" });
  }
});


router.delete("/delete-account/:id", async (req, res) => {
  try {
    const {id} = req.params

    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Required field missing",
      });
    }

    if(password!==confirmPassword){
      return res.status(400).json({
        success: false,
        message: "Password and confirm password should be match"
      })
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    if (admin && (await admin.matchPassword(password))) {
      const deletedAdmin = await Admin.findByIdAndDelete(id)
      if(deletedAdmin){

        res.clearCookie("authToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          domain: process.env.NODE_ENV === "production" ? "instacruit.no" : "localhost",
      });

        return res.status(200).json({
          success: true,
          message: "Account deleted successfully"
        })
      }
      else{
        return res.status(400).json({
          success: false,
          message: "Account deletion failed"
        })
      }
    }
    else{
      return res.status(400).json({
        success: false,
        message: "Wrong password"
      })
    }
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error of admin account deletion route" });
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
    const { title, questions, dashboardId } = req.body;

    if (!questions || !dashboardId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Questions and dashboardId is required",
        });
    }

    const formattedQuestions = questions.map((q) => ({ question: q }));

    const newJob = new Job({
      questions: formattedQuestions,
      dashboardId,
      title,
    });

    await newJob.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Job created successfully",
        job: newJob,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error in create-job-position" });
  }
});

router.get("/company/:id/job-positions", async (req, res) => {
  try {
    const { id } = req.params;

    const jobs = await Job.find({
      dashboardId: id,
    });

    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job found successfully",
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error in getting-job-positions",
      });
  }
});

router.delete("/company/job/:id", async (req, res) => {
  try {
    
    const {id} = req.params
    const {adminId}  = req.body
    console.log("adminId", adminId);
    
    const admin = await Admin.findById(adminId)

    if(!admin){
      return res.status(404).json({
        success: false,
        message: "Only admin can delete job"
      })
    }

    const deletedJob  = await Job.findByIdAndDelete(id)
    if(deletedJob){
      return res.status(200).json({
        success: true,
        message: "Job deleted successfully"
      })
    }
    else{
      return res.status(404).json({
        success: "false",
        message: "Job does not exist"
      })
    }


  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error in deleting job",
      });
  }
})



module.exports = router;

const express = require("express");
const multer = require("multer");
const Company = require("../models/Company");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const Candidate = require("../models/Candidate");
const upload = multer({ dest: "uploads/" });

router.post("/company", upload.single("file"), async (req, res) => {
  try {
    
    // console.log(req.user);
    

    const {
      companyName,
      about,
      industry,
      website,
      facebook,
      instagram,
      youtube,
      linkedin,
      userId
    } = req.body;
    const file = req.file ? req.file.filename : null;
    console.log("idid",userId);
    
    const user = await User.findById(userId)

    if(!user){
      res.status(404).json({
        massage: "User not found"
      })
    }

    const dashboardId = new mongoose.Types.ObjectId(user?.dashboardId);

    const updatedCompany = await Company.findByIdAndUpdate(
      dashboardId , // Find the company by its ID (or any other unique field)
      {
        companyName,
        about,
        industry,
        website,
        facebook,
        instagram,
        youtube,
        linkedin,
        file,
      }, // Update fields
      { new: true } // Return the updated document and don't create a new one if not found
    );

    if(!updatedCompany){
      res.status(404).json({
        massage: "Company not found"
      })
    }

    res
      .status(200)
      .json({ message: "Company information saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving company information." });
  }
});

router.get("/company/details", async (req, res) => {
  try {
    
    const companies = await Company.find()

    if(!companies){
      res.status(200).json({
        message: "There does not any company"
      })
    }

    const companyInfoArray = await Promise.all(
      companies.map(async (company) => {
        const companyId = company._id;
        
        // Fetch candidateNo from the Candidate model using companyId
        const candidates = await Candidate.find({ dashboardId:companyId });
        
    
        // Fetch user emails using userIds
        const users = await User.find({ _id: { $in: company.userIds } });
        const userEmails = users.map(user => user.email); // Extract emails from user data
    
        // Return the specific information about the company
        return {
          companyId: companyId,
          name: company.companyName,
          industry: company.industry,
          candidateNo: candidates.length,
          activeAdmin: company?.userIds.length,
          userEmails: userEmails, // Array of emails
        };
      })
    );

    res.status(200).json({
      message: "Companies found successfully",
      data: companyInfoArray
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error getting company information." });
  }
})

router.delete("/company/:id", async (req, res) => {

  try {
    
    const {id} = req.params

    if(!id){
      res.status(400).json({
        success: false,
        message: "Id is required"
      })
    }    

    const deletedCompany = await Company.findByIdAndDelete(id)

    if(!deletedCompany){
      res.status(404).json({
        success: false,
        message: "Company not exist"
      })
    }

    await User.deleteMany({ dashboardId: id });

    await Candidate.deleteMany({ dashboardId: id });

    res.status(202).json({
      success: true,
      message: "Company and associated users and candidates deleted successfully"
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: "Server Error deleting the company" });
  }

})


router.post("/companydetails", async (req, res) => {
  try {
    const { companyId } = req.body; // Get companyId from request body

    // Check if companyId is provided
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'Company ID is required',
      });
    }

    // Find the company using companyId
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    // Fetch candidateNo from the Candidate model using companyId
    const candidates = await Candidate.find({ dashboardId: companyId });

    // Fetch user emails using userIds
    const users = await User.find({ _id: { $in: company.userIds } });
    const userEmails = users.map(user => user.email); // Extract emails from user data

    // Construct company info
    const companyInfo = {
      companyId: company._id,
      name: company?.companyName ? company?.companyName :  "",
      industry: company?.industry ? company?.industry : "",
      candidates: candidates,
      activeAdmin: company?.userIds.length,
      userEmails: userEmails, // Array of emails
    };

    // Send response with company info
    res.status(200).json({
      success: true,
      data:companyInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: "Error getting company details" });
  
  }
})

router.post("/company/edit/:id",  async (req, res) => {
  try {
    console.log("working");
    
    const {id} = req.params
    const {name, industry} = req.body

    const updateFields = {};
if (name) updateFields.companyName = name;
if (industry) updateFields.industry = industry;

    const updatedCompany = await Company.findByIdAndUpdate(id, updateFields, {new: true})

    if(!updatedCompany){
      res.status(404).json({
        success: false,
        message: "Company not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully"
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error of company edit"
    })
  }
})

router.delete("/company/delete-candidate/:id", async (req, res) => {
  console.log("working candidate deletion route");
  
  try {
    const {id} =  req.params
    const {email} = req.query

    console.log(email);
    if(!email || !id){
      return res.status(405).json({
        success: false,
        message: "DashboardId and email is required"
      })
    }

    const deletedCandidate = await Candidate.findOneAndDelete({dashboardId: id, "customerInfo.epost": email})
    if(!deletedCandidate){
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Candidate deleted successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error of candidate remove"
    })
  }
})

router.post("/company/edit-company-emails/:id", async (req, res) => {

  console.log("working update company email");
  
  try {
    const { id } = req.params;
    const { emails } = req.body; 
    console.log(emails);
    
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ success: false,message: "Company not found" })
    }

    if (emails.length !== company.userIds.length) {
      return res.status(400).json({ success: false,message: "Emails array length must match the userIds array length" });
    }

    for (let i = 0; i < company.userIds.length; i++) {
      const userId = company.userIds[i];
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false,message: `User not found for userId: ${userId}` });
      }
      
      if (user.email !== emails[i]) {
        const existedEmail = await User.findOne({email: emails[i]})
      if(existedEmail){
        return res.status(400).json({
          success: false,
          message: `${emails[i]} email is already exist`
        })
      }
        user.email = emails[i]; 
        await user.save(); 
      }
    }

    res.status(200).json({ success: true,message: "Emails updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error of candidate remove"
    })
  }
})


module.exports = router;

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    allowed_formats: ["pdf", "doc", "docx","jpg", "jpeg", "png",],
    resource_type: "raw",
    public_id: (req, file) =>{
      // Extract the original file name without the extension
      // const originalName = file.originalname.split('.').slice(0, -1).join('.'); // Remove the last extension
      return `${Date.now()}-${file.originalname}`; // Create a unique public ID
    },
  },
});

const upload = multer({ storage });

module.exports = upload;

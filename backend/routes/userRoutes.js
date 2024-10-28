const express = require("express");
const User = require("../models/user");



const router = express.Router();

router.post("/details", async (req, res) => {

    try {
        
        const { id } = req.body;

        const user = await User.findById(id)

        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }

        res
      .status(201)
      .json({ message: "User data found successfully",
        user: user
       });

    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Server error" });
    }

})

module.exports = router;
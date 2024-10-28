const express = require ("express");
const userAuth = require("../middleware/auth");

const profileRouter = express.Router();

// GET profile details by verifying JWT token
profileRouter.get("/profile",userAuth, async (req, res) => {
    try {
      const user= req.user;
      res.send(user);
    } catch (error) {
      res.send("ERROR: " + error.message);
    }
  });
  
module.exports = profileRouter;
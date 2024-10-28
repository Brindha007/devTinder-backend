const express = require("express");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("../utils/Validation");
const User = require("../Models/user");


const authRouter = express.Router();

//POST Api call for Signup
authRouter.post("/signup", async (req, res) => {
    try {
      //Validate Signup data
      validateSignUpData(req);
      const { firstName, lastName, emailId, password } = req.body;
      //Encrypt Password
      const passwordHash = await bcrypt.hash(password, 10);
      //Creating new Instance of User model.
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
      await user.save();
      res.send("User added successfully.");
    } catch (err) {
      res.status(400).send("Error saving the user:" + err.message);
    }
  });
  
  //POST API call for login
  authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      // Check if the user exists in the DB
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      // Compare provided password with stored hashed password
      const isValidPassword = await user.validatePassword(password);
      if (isValidPassword) {
      // Generate a JWT token upon successful login
        const token = await user.getJWT();
  
        // Set token in cookie and send response back to the user
        // Setting a cookie with an expiration time of 15 minutes
        res.cookie("token", token,{ expires: new Date(Date.now() + 900000), httpOnly: true });
        res.send("Login successfully!!!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      res.send("ERROR: " + error.message);
    }
  });

  module.exports = authRouter;
  
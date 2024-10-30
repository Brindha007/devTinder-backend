const express = require("express");
const userAuth = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/Validation");
const User = require("../Models/user");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

// GET profile details by verifying JWT token
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

//PATCH profile for Edit profile details
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log(loggedInUser);
    await loggedInUser.save();
    res.send(loggedInUser.firstName + ", your profile updated successfully.");
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

//PATCH profile for update password
profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    const { emailId, currentPassword, newPassword } = req.body;
    console.log(currentPassword + "  " + newPassword);
    // Check if the user exists in the DB
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Validate the current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).send("Invalid current password");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in DB
    user.password = hashedPassword;
    await user.save();
    console.log("Updated password " + user.password);
    res.send("Password reset successfully.");
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;

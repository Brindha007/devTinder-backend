const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./Models/user");
const { validateSignUpData } = require("./utils/Validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middleware/auth");

// Middleware to parse JSON data in requests
app.use(express.json());

// Middleware to parse cookies in requests
app.use(cookieParser());

//POST Api call for Signup
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // Check if the user exists in the DB
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Compare provided password with stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
    // Generate a JWT token upon successful login
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$777",{ expiresIn: '1h' });

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

// GET profile details by verifying JWT token
app.get("/profile",userAuth, async (req, res) => {
  try {
    const user= req.user;
    res.send(user);
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

//POST sendConnectionRequest API call
app.post("/sendConnectionRequest",userAuth,async(req, res) => {
  const user = req.user;

  console.log("connection req...");
  res.send(user.firstName + " connection sent..");
});


// Connect to database and start the server
connectDB()
  .then(() => {
    console.log("Databased connected successfully.");
    app.listen(3000, () => {
      console.log("Server run successfully.");
    });
  })
  .catch((err) => {
    console.log("Error in connection.", err);
  });

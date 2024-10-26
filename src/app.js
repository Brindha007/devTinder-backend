const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./Models/user");

//Using Middleware JSON function  for all HTTP methods

app.use(express.json());

//GET User by emailId
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const user_detail = await User.find({ emailId: userEmail });
    //console.log(user_deatail);
    if (user_detail.length === 0) {
      res.send("User not found.");
    } else {
      res.send("Found out user. " + user_detail);
    }
  } catch (error) {
    res.status(400).send("Error 400.");
  }
});

//GET Feed api call to get all users details.
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send("Got all the user details." + allUsers);
  } catch (error) {
    res.send("Error");
  }
});

//GET user by userId
app.get("/userId", async (req, res) => {
  try {
    const userId = req.body._id;
    const findById = await User.findById({ _id: userId });
    res.send("Found it by userId " + findById);
  } catch (error) {
    res.send("Error 400.");
  }
});

//POST Api call to Signup
app.post("/signup", async (req, res) => {
  console.log(req.body);

  //Creating new Instance of User model.
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//Delete by userId from the database
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    res.send("Deleted successfully.");
  } catch (error) {
    res.send("Error in deletion.");
  }
});

//Update data by _id using PATCH method
// app.patch("/user", async (req, res) => {
//   try {
//     const data = req.body;
//     const userId = req.body._id;
//     const user = await User.findByIdAndUpdate (userId,data);
//     res.send("Updated profile data.");
//   } catch (error) {
//     res.send("Error.");
//   }

// });

//Update data by email id
app.patch("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const data = req.body;
    const user = await User.findOneAndUpdate({ emailId: userEmail }, data,{
      runValidators:true
    });
    res.send("Upated data by emailId");
  } catch (error) {
    res.status(400).send("error" + error.message);
  }
});

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

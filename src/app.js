const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./Models/user");

app.post("/signup", async (req, res) => {
    const newUser = {
      firstName : "Surya",
      lastName : "S",
      age: 48,
      emailId : "suryasiva23@gmail.com"
    };
    //Creating new Instance of User model.
    try{
      const user = new User(newUser);
      await user.save();
      res.send("User added successfully.")
    }catch(err){
      res.status(400).send("Error saving the user:"+ err.message);
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

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./Models/user");

//Using Middleware JSON function  for all HTTP methods

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);

    //Creating new Instance of User model.
    try{
      const user = new User(req.body);
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

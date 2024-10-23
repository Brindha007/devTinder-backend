const express = require("express");

const app = express();

app.use("/user",(req,res ,next) => {
    console.log("Handling 1st route!");
   // res.send("Response!");
    next();
}, (req, res,next) => {
    console.log("Handling 2nd route!");
    //res.send("2nd Response!");
    next();
}, (req, res,next) => {
    console.log("Handling 3rd route!");
    //res.send("3rd Response!");
    next();
}, (req, res,next) => {
    console.log("Handling 4th route!");
    //res.send("4th Response!");
    next();
}, (req, res) => {
    console.log("Handling 5th route!");
    res.send("5th Response!");
}
);

app.listen(3000, () => {
    console.log("Server run successfully.")
});
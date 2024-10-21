const express = require("express");

const app = express();

app.use("/test",(req, res) => {
    res.send("We win!!!");
    console.log("test url loaded");
});


app.use("/",(req, res) => {
    res.send("Hello Universe!!!");
    console.log("loaded");
});


app.listen(3000, () => {
    console.log("Server run successfully.")
});
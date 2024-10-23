const express = require("express");

const app = express();

const {adminAuth} = require("./middleware/auth");


app.all("/user",adminAuth);

app.get("/admin/getAllData",adminAuth,(req, res) => {
    res.send("Get all the data");
});

app.listen(3000, () => {
    console.log("Server run successfully.")
});
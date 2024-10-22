const express = require("express");

const app = express();

app.get("/user",(req, res) => {
    res.send({firstName : "Brindha", lastName : "D"})
});

app.post("/user",(req, res) => {
    res.send("Data saved in DB");
});

app.delete("/user", (req, res) => {
    res.send("Data deleted in DB");
});

app.patch("/user",(req,res) => {
    res.send("Updated partial data.")
});
/* app.use("/test/win",(req, res) => {
    res.send("The Universe wants me to win!!!");
    console.log("test win url loaded");
});
app.use("/test",(req, res) => {
    res.send("We win!!!");
    console.log("test url loaded");
});


app.use("/",(req, res) => {
    res.send("Hello Universe!!!");
    console.log("loaded");
}); */


app.listen(3000, () => {
    console.log("Server run successfully.")
});
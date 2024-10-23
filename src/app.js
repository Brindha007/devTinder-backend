const express = require("express");

const app = express();

app.get("/admin/getAllData", (req, res) => {
  try {
    throw new Error("Errorrrrrrrrrrr");
    res.send("Get all the data");
  } catch (err) {
    res.status(500).send("Error occured catchblock.");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Error occured.");
  }
});

app.listen(3000, () => {
  console.log("Server run successfully.");
});

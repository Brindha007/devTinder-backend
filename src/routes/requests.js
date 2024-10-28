const express = require("express");
const userAuth = require("../middleware/auth");
const requestsRouter = express.Router();

//POST sendConnectionRequest API call
requestsRouter.post("/sendConnectionRequest",userAuth,async(req, res) => {
    const user = req.user;
  
    console.log("connection req...");
    res.send(user.firstName + " connection sent..");
  });

  module.exports = requestsRouter;
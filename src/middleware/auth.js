const jwt = require("jsonwebtoken");
const User = require("../Models/user");


const userAuth= async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Please Login!");
        }

        const decodedMsg = await jwt.verify(token,"DEV@Tinder$777");
        const {_id} = decodedMsg;

        const user = await User.findById(_id);

        if(!user){
            throw new Error ("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error: "+ error.message);
    }
};

module.exports = userAuth;

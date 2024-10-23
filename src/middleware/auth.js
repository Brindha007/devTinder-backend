const adminAuth= (req, res, next) => {
    console.log("Authentication checked.");
    const token = "xyz";
    const isAuth = token === "xyz";
    if(!isAuth){
        res.status(401).send("Unautherized request!");
    }
    else{
        next();
    }
};

module.exports ={
    adminAuth
};
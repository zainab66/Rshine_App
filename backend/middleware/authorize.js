 const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = async(req, res, next) =>{
  try {

    const token = req.header("Authorization");
    console.log(token);

    if (!token){
    return res.status(403).json("Not Authorized")

    }


    const payload = jwt.verify(token, process.env.jwtSecret);

    req.user = payload.user;
    next();
  } catch (err) {
    return res.status(401).json("Token is not valid" );
  }

}; 

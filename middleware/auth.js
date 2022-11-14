//Check to see if there's token and header

const jwt = require("jsonwebtoken");
require("dotenv").config();
const {SECRET} = process.env;

module.exports = (req, res, next) =>{
  //Get token from Header
  const token = req.header("x-auth-token");
  if (!token){
    return res.status(401).json({statusCode: 401, message:"No token, authorization denied"})
  };
  //else.........token exists
  try{
    const decoded = jwt.verify(token, SECRET);

    //assign user to req object
    req.user = decoded.user;

    next();
  } catch(err){
    res.status(401).json({statusCode: 401, message: "Token is not valid"})
  }
}
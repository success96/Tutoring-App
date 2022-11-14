const User = require("../models/userModel");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const {SECRET} = process.env;
const expiry =3600;


//@route    POST api/auth/signup
//@descrp   register new user
//access    public
exports.signup = async (req, res) => {
  //fetch user's details from request body
  //check if the user with user's details
  User.findOne({email: req.body.email}, (err, existingUser) => {
    if(err){
      console.log(err)
      return res.status(500).json({message: err.message})
    }
    if (existingUser){
      return res.status(400).json({message: "A user with this email already exists"})
    }
    //create a new user
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userRole: req.body.userRole,
    }, (err, newUser)=>{
      if(err){
        return res.status(500).json({message: err.message})
      };
      //hash the user's password
      bcrypt.genSalt(10, (err, salt)=>{
        if (err){
          return res.status(500).json({message: err.message})
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPassword)=>{
          if(err){
            return res.status(500).json({message: err.message })
          }
          //save password to the user database
          newUser.password = hashedPassword,
          newUser.save((err, savedUser)=>{
            if(err){
              return res.status(500).json({message: err.message})
            }
            //create jwt for the user
            jwt.sign({
              id: newUser._id,
              email: newUser.email,
              firstName: newUser.firstName,
              lastName: newUser.lastName

            }, SECRET, {expiresIn: expiry}, (err, token)=>{
              if (err){
                return res.status(500).json({message: err.message})
              }
              //send token to user
              return res.status(200).json({
                message: "User registration successful",
                token
              })

            })
            

          })
          
        })
      })

    })
  });


}



//@route  POST api/auth/login
//@descp  Authenticate user, staffs, managers and admins
//access  public
exports.loginUser = async (req, res) => {
  //check for errors
  const errors = validationResult (req);
  if(!errors.isEmpty){
    res.status(200).json({erros: errors.array()})
  }
  //else destructure request body
  const {email, password} = req.body;
  try{
    //initialise user
    let user =  await User.findOne({email}); 
    if (!user){
      res.status(400).json({statusCode: 400, message: "Invalid Credentials"})
    }
    //else Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      res.status(400).json({statusCode: 400, message:"Invalid Credentials"})
    }

    //else there is a match, send token
    //send payload and signed token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          statusCode: 200,
          message: "Logged In successfully",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userRole: user.userRole,
            isManager: user.isManager,
            isAdmin: user.isAdmin
          },
          token
        })
      }
    )

  } catch(err){
    console.log(err.message);
    res.status(500).send("Server Error")

  }
}
const express = require("express");
require("dotenv").config({path: __dirname+"/.env" });
const connectDB = require('./db');

const {PORT} = process.env;

//connect to db
connectDB();


//Initialise express
const ass = express();

//Initialise express middleware
ass.use(express.json({extended: false}));

//create a basic express route
ass.get("/", (req, res)=>{
  res.json({message: "Welcome to this Restaurant"})
});

//import users routes
const usersRoute = require("./routes/usersRoute");
ass.use("/api/auth/", usersRoute);



//Listen to connection
ass.listen(PORT, () => { 
  console.log(`Appllication is running on port ${PORT}`);
} )
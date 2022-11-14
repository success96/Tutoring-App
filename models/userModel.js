//const {mongoClient} = require("mongodb");

const mongoose = require("mongoose");
const { stringify } = require("qs");

//create UserSchema
const UserSchema = mongoose.Schema(
  {
    //Define the properties of the application user
    firstName:{
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    password:{
      type: String,
      //required: true,
    },
    userRole:{
      type: String,
      enum: ["admin", "manager", "user", "not assigned"],
      default: "not assigned"
    },
    isManager:{
      type: Boolean,
      default: 0
    },
    isAdmin:{
      type: Boolean,
      default: 0
    },
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema)




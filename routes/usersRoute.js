const express = require("express");
const router = express.Router();
const {check} = require ("express-validator");

//import router controller
const usersController = require("../controllers/usersController");

//Register user
router.post("/signup", usersController.signup);

//login user route
router.post("/login",
  [
    check("Email", "please enter a valid email").isEmail(),
    check("password", "A valid password").exists(),

  ],
  usersController.loginUser
);

module.exports = router;
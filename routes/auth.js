const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

// Sign Up
router.get("/sign-up", userController.signupForm);
router.post("/sign-up", userController.signup);

// Log In
router.get("/log-in", userController.loginForm); // ✅ Only this
router.post("/log-in", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureFlash: true,
}));

// Log Out
router.get("/log-out", userController.logout);

// Membership
router.get("/join", userController.joinForm);
router.post("/join", userController.joinClub);

module.exports = router;


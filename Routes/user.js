// Routes/user.js - UPDATED WITH router.route()
const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/WrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../Controllers/user.js");

// /signup => GET (render form), POST (handle form)
router.route("/signup")
  .get(userController.signup)
  .post(wrapAsync(userController.Post_signup));

// /login => GET (render form), POST (handle login)
router.route("/login")
  .get(userController.Login)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login"
    }),
    userController.Post_Login
  );

// /logout => GET (handle logout)
router.get("/logout", userController.Get_Logout);

module.exports = router;

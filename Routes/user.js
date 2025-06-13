const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/WrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../Controllers/user.js");

router.route("/signup")
    .get(userController.signup)
    .post(wrapAsync(userController.postSignup));

router.route("/login")
    .get(userController.login)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        userController.postLogin
    );

router.get("/logout", userController.getLogout);

const { isLoggedIn } = require("../middleware.js");

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("users/profile.ejs", { user: req.user });
});

router.get("/user/listings", isLoggedIn, userController.getUserListings);

router.route("/user/change-password")
    .get(isLoggedIn, userController.getChangePassword)
    .post(isLoggedIn, wrapAsync(userController.postChangePassword));

module.exports = router;

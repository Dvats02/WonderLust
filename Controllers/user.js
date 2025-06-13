const User = require("../Models/user.js");
const Listing = require("../Models/listing.js");

/**
 * @description Render the signup form
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.signup = (req, res) => {
    res.render("users/signup.ejs");
};

/**
 * @description Register a new user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.postSignup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body.user;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to WonderLust! Your account has been created successfully.");
            return res.redirect("/Listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
};

/**
 * @description Render the login form
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.login = (req, res) => {
    res.render("users/login.ejs");
};

/**
 * @description Log in an existing user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.postLogin = async (req, res, next) => {
    if (!req.user) {
        req.flash("error", "Authentication failed. Please try again.");
        return res.redirect("/login");
    }

    req.session.user = {
        _id: req.user._id,
        email: req.user.email,
        username: req.user.username,
    };
    delete req.session.redirectUrl;
    console.log("User authenticated successfully:", req.user);
    res.redirect("/Listings");
};

/**
 * @description Log out the current user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.getLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out!");
        res.redirect("/Listings");
    });
};

module.exports.getChangePassword = (req, res) => {
    res.render("users/changePassword.ejs");
};

module.exports.postChangePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    try {
        const isPasswordValid = await user.validatePassword(oldPassword);
        if (!isPasswordValid) {
            req.flash("error", "Invalid old password.");
            return res.redirect("/user/change-password");
        }

        user.setPassword(newPassword, async (err) => {
            if (err) {
                req.flash("error", "Failed to set new password.");
                return res.redirect("/user/change-password");
            }
            await user.save();
            req.flash("success", "Password changed successfully!");
            res.redirect("/profile");
        });
    } catch (error) {
        req.flash("error", "An error occurred while changing the password.");
        res.redirect("/user/change-password");
    }
};

module.exports.getUserListings = async (req, res) => {
    // Fetch the listings associated with the current user
    const listings = await Listing.find({ owner: req.user._id });

    // Render the listings view and pass the listings data
    res.render("users/listings", { listings });
};

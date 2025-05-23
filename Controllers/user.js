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
module.exports.postLogin = (req, res) => {
    const redirectUrl = req.session.redirectUrl || "/Listings";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
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

module.exports.getUserListings = async (req, res) => {
    // Assuming you have a way to identify the current user (e.g., using req.user)
    const user = req.user;

    // Fetch the listings associated with the user from the database
    const listings = await Listing.find({ owner: user._id });

    // Render the listings in a view
    res.render("users/listings", { listings, body: "" });
};

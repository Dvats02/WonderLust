const Listing = require("./Models/listing.js");
const schemas = require("./schema.js");
const Review = require("./Models/Review.js");
const ExpressError = require("./utils/ExpressErrors.js");

/**
 * @description Middleware to check if a user is logged in
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl || "/Listings/new";
        req.flash("error", "You must be logged in to create listings!");
        return res.redirect("/login");
    }
    next();
};

/**
 * @description Middleware to check if the current user is the owner of a listing
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/Listings");
    }

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the Owner of this Listing");
        return res.redirect(`/Listings/${id}`);
    }

    next();
};

/**
 * @description Middleware to check if the current user is the owner of a review
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.reviewOwner = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/Listings/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review.");
        return res.redirect(`/Listings/${id}`);
    }

    next();
};

/**
 * @description Middleware to save the redirect URL in the session
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.saveRedirectUrl = (req, res, next) => {
    res.locals.redirectUrl = req.session.redirectUrl || "/Listings";
    delete req.session.redirectUrl;
    next();
};

/**
 * @description Middleware to validate a listing using Joi schema
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.validateListing = (req, res, next) => {
    const { error } = schemas.listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map((err) => err.message).join(", "));
    } else {
        next();
    }
};

/**
 * @description Middleware to validate a review using Joi schema
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.validateReview = (req, res, next) => {
    const { error } = schemas.reviewSchema.validate(req.body.review);
    if (error) {
const message = error.details.map((err) => err.message).join(", ");
        throw new ExpressError(400, message);
    } else {
        next();
    }
};

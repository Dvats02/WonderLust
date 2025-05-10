const Listing = require("./Models/listing.js"); 
const ReLischema=require("./schema.js");
const Review=require("./Models/Review.js");
const ExpressError = require("./utils/ExpressErrors.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log("This is loggedIn middleware!!");
  if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl || "/Listings/new";
      req.flash("error", "You must be logged in to create listings!");
      return res.redirect("/login");
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  console.log("This is isOwner MiddleWare!!");
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

// ✅ Middleware: Check if current user is the owner of the review
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

module.exports.saveRedirectUrl = (req, res, next) => {
  res.locals.redirectUrl = req.session.redirectUrl || "/Listings";
  delete req.session.redirectUrl;
  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = ReLischema.listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details.map((err) => err.message).join(", "));
  } else {
    next();
  }
};
module.exports.validateReview = (req, res, next) => {
      const { error } = ReLischema.reviewSchema.validate(req.body);
      if (error) {
        const message = error.details.map((err) => err.message).join(", "); // Get all error messages
        throw new ExpressError(400, message);
      } else {
        next();
      }
  } 
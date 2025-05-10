const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing.js");
const Review = require("../Models/Review.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const wrapAsync = require("../utils/WrapAsync.js");
const listingController = require("../Controllers/listing.js");

// / => Index (GET) and Create (POST)
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, wrapAsync(listingController.createRoute));

// /new => New Form (GET)
router.get("/new", isLoggedIn, listingController.renderNewForm);

// /:id => Show (GET), Update (PUT), Delete (DELETE)
router.route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.Update_Route))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.Delete_Route));

// /:id/edit => Edit Form (GET)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.Edit_Route));

module.exports = router;

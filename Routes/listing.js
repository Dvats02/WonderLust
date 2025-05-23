const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing.js");
const Review = require("../Models/Review.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const wrapAsync = require("../utils/WrapAsync.js");
const listingController = require("../Controllers/listing.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createRoute));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showRoute))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateRoute))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteRoute));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editRoute));

module.exports = router;

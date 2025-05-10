const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../Controllers/reviews.js");
const { isLoggedIn , reviewOwner } = require("../middleware");

router.post("/", isLoggedIn, reviewController.createReview);
router.delete("/:reviewId", isLoggedIn,reviewOwner , reviewController.deleteReview);

module.exports = router;

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const Wishlist = require("../Models/Wishlist.js");
const Listing = require("../Models/listing.js");

/**
 * @description Add a listing to the user's wishlist
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
router.post("/Listings/:listingId/wishlist", isLoggedIn, wrapAsync(async (req, res) => {
    const { listingId } = req.params;
    const userId = req.user._id;

    const listing = await Listing.findById(listingId);

    let wishlist = await Wishlist.findOne({ user_id: userId });

    if (!wishlist) {
        wishlist = new Wishlist({
            user_id: userId,
            places: [{
                place_id: listingId,
                name: listing.title,
                location: listing.location,
                image_url: listing.image.url,
                description: listing.description
            }]
        });
        await wishlist.save();
    } else {
        const alreadyExists = wishlist.places.some(place => place.place_id === listingId);
        if (!alreadyExists) {
            wishlist.places.push({
                place_id: listingId,
                name: listing.title,
                location: listing.location,
                image_url: listing.image.url,
                description: listing.description
            });
            await wishlist.save();
        } else {
            // Remove from wishlist
            wishlist.places = wishlist.places.filter(place => place.place_id !== listingId);
            await wishlist.save();
        }
    }

    res.redirect("/wishlist");
}));

/**
 * @description Get the user's wishlist items
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
router.get("/wishlist", isLoggedIn, wrapAsync(async (req, res) => {
    const userId = req.user._id;

    const wishlistItems = await Wishlist.find({ user_id: userId }).populate('places.place_id');

    res.render("users/wishlist.ejs", { wishlistItems });
}));

module.exports = router;

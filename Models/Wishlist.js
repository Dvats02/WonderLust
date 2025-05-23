const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

/**
 * @typedef {object} WishlistPlaceSchema
 * @property {string} place_id - ID of the place (required)
 * @property {string} name - Name of the place (required)
 * @property {string} location - Location of the place
 * @property {string} image_url - URL of the place's image
 * @property {string} description - Description of the place
 * @property {Date} addedAt - Date the place was added to the wishlist (default: now)
 */
// Subdocument schema for each wishlist place
const WishlistPlaceSchema = new Schema({
    place_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: String,
    image_url: String,
    description: String,
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

/**
 * @typedef {object} WishListSchema
 * @property {Types.ObjectId} user_id - ID of the user (references User model, required)
 * @property {Array<WishlistPlaceSchema>} places - Array of wishlist places
 */
// Main Wishlist schema
const WishListSchema = new Schema(
    {
        user_id: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        places: [WishlistPlaceSchema],
    },
    { timestamps: true }
);

module.exports = model("Wishlist", WishListSchema);

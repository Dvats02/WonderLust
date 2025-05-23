const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Review.js");

/**
 * @typedef {object} ListingSchema
 * @property {string} title - Title of the listing (required)
 * @property {string} description - Description of the listing
 * @property {object} image - Image object containing URL and filename
 * @property {string} image.url - URL of the image (default: unsplash URL)
 * @property {string} image.filename - Filename of the image
 * @property {string} location - Location of the listing
 * @property {string} country - Country of the listing
 * @property {number} price - Price of the listing
 * @property {Array<Schema.Types.ObjectId>} reviews - Array of review IDs (references Review model)
 * @property {Schema.Types.ObjectId} owner - ID of the owner (references User model)
 */
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: {
            type: String,
            default:
                "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        },
        filename: String,
    },
    location: String,
    country: String,
    price: {
        type: Number,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

/**
 * @description Middleware to delete associated reviews when a listing is deleted
 */
listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

module.exports = mongoose.model("Listing", listingSchema);

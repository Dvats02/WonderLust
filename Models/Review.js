const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {object} ReviewSchema
 * @property {string} comment - Review comment
 * @property {number} rating - Review rating (1-5)
 * @property {Date} createdAt - Date the review was created (default: now)
 * @property {Schema.Types.ObjectId} author - ID of the author (references User model)
 */
const ReviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review", ReviewSchema);

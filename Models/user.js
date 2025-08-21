const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

/**
 * @typedef {object} UserSchema
 * @property {string} email - User's email address (required, unique)
 * @property {string} resetToken - Token for resetting password
 * @property {Date} resetTokenExpiry - Expiry date for reset token
 * @property {Array<Schema.Types.ObjectId>} wishlist - Array of wishlist items (references Wishlist model)
 */

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: String, // Add googleId field
    resetToken: String,
    resetTokenExpiry: Date,
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Wishlist",
    }],
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

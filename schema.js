const Joi = require('joi');

// Listing Schema Validation
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().uri().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
    }).required()
});

// Review Schema Validation
const reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
    }).required()
});

module.exports = { listingSchema, reviewSchema };

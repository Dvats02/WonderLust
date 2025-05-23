const Listing = require("../Models/listing.js");
const Wishlist = require("../Models/Wishlist.js");

/**
 * @description Get all listings
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

/**
 * @description Render the new listing form
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

/**
 * @description Show a specific listing
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Promise<void>}
 */
module.exports.showRoute = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                },
            })
            .populate("owner");

        if (!listing) {
            req.flash("error", "Listing does not exist");
            return res.redirect("/Listings");
        }

        const relatedListings = await Listing.find({
            country: listing.country,
            _id: { $ne: listing._id }
        }).limit(3);

        let isInWishlist = false;
        if (req.user) {
            const wishlistItems = await Wishlist.find({ user_id: req.user._id });
            isInWishlist = wishlistItems.some(item => item.places.some(place => place.place_id === listing._id.toString()));
        }

        res.render("listings/show.ejs", {
            ListData: listing,
            relatedListings: relatedListings,
            isInWishlist: isInWishlist
        });

    } catch (err) {
        console.error("Error in showRoute:", err);
        req.flash("error", "Could not load the listing details.");
        res.redirect("/Listings");
    }
};

/**
 * @description Create a new listing
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.createRoute = async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;

    // Construct the image object correctly
    if (req.body.listing.image) {
        newlisting.image = { url: req.body.listing.image, filename: 'default' }; // Assuming 'default' for now, can be improved
    } else {
        // This will use the default URL defined in the schema
        newlisting.image = {
            url: "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
            filename: 'default'
        };
    }

    await newlisting.save();
    req.flash("success", "New Listing Created Successfully!");
    res.redirect("/Listings");
};

/**
 * @description Render the edit listing form
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.editRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
};

/**
 * @description Update a specific listing
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.updateRoute = async (req, res) => {
    let { id: listingId } = req.params;
    let updatedData = req.body.listing;

    // Construct the image object correctly for updates
    if (updatedData.image) {
        updatedData.image = { url: updatedData.image, filename: 'default' }; // Assuming 'default' for now
    } else {
        // If no new image provided, fetch existing to retain its URL
        const existingListing = await Listing.findById(listingId);
        updatedData.image = existingListing.image || { url: "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzJTIwaW1hZ2VzfGVufDB8fDB8fHww", filename: 'default' };
    }

    await Listing.findByIdAndUpdate(listingId, { ...updatedData });
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/Listings/${listingId}`);
};

/**
 * @description Delete a specific listing
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
module.exports.deleteRoute = async (req, res) => {
    let { id: listingId } = req.params;
    await Listing.findByIdAndDelete(listingId);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/Listings");
};

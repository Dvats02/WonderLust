const Listing=require("../Models/listing.js")

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

module.exports.renderNewForm=(req, res) => {
    res.render("listings/new.ejs");
}
module.exports.showRoute = async (req, res, next) => {
  try { // Added try-catch for better error handling if needed
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

    // ---- Start: Fetch Related Listings ----
    const relatedListings = await Listing.find({
      country: listing.country,       // Find listings in the same country
      _id: { $ne: listing._id }       // Exclude the current listing
    }).limit(3); // Limit to 3 suggestions
    // ---- End: Fetch Related Listings ----

    res.render("listings/show.ejs", {
      ListData: listing,
      relatedListings: relatedListings // Pass related listings to the template
    });

  } catch (err) {
    // Optional: Handle potential errors during DB query
    console.error("Error in showRoute:", err);
    req.flash("error", "Could not load the listing details.");
    res.redirect("/Listings");
    // Or pass the error to the Express error handler: next(err);
  }
};


module.exports.createRoute = async (req, res) => {
  // ... your existing code ...
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  // Check if image URL is provided, otherwise use a default
  if (!newlisting.image || !newlisting.image.url) {
    newlisting.image = { url: '/images/default-listing.jpg', filename: 'default' }; // Adjust path as needed
  }
  await newlisting.save();
  req.flash("success", "New Listing Created Successfully!");
  res.redirect("/Listings");
};

module.exports.Edit_Route=async (req, res) => {
  console.log("This is an edit route");
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}

module.exports.Update_Route = async (req, res) => {
  // ... your existing code ...
  let { id } = req.params;
  let updatedData = req.body.listing;
  // Ensure image data exists if not provided in update
  if (!updatedData.image || !updatedData.image.url) {
      const existingListing = await Listing.findById(id);
      updatedData.image = existingListing.image || { url: '/images/default-listing.jpg', filename: 'default' }; // Keep existing or use default
  }
  await Listing.findByIdAndUpdate(id, { ...updatedData });
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/Listings/${id}`);
}

module.exports.Delete_Route=async (req, res) => {
  console.log("Delete Route is called");
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/Listings");
}
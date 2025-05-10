const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./Review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        set: (v)=> v===""? "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzJTIwaW1hZ2VzfGVufDB8fDB8fHww" :v,
    },
    location: String,
    country: String,
    price: {
        type:Number,
    },
    reviews: [{
        type: Schema.Types.ObjectId, 
        ref: "Review"
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    
});

listingSchema.post("findOneAndDelete", async function(doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});



const listing=mongoose.model("Listing", listingSchema)
module.exports= listing;
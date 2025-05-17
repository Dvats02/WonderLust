const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing =require("../Models/listing.js");
const MongoURL= 'mongodb://127.0.0.1:27017/wonderlust';

main()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MongoURL);
}


const initDb = async () => {
    await Listing.deleteMany({});
    console.log("Data Deleted succesfully");
    // initData.data = initData.data.map((obj) => ({
    //   ...obj,
    //   owner: new mongoose.Types.ObjectId("67c30b81173371191ef9debe")
    // }));
    
    // await Listing.insertMany(initData.data);
    // console.log("Data was initialized");
  };
require ("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

//onst client = mongoose.connect(URI);
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
           // useCreateIndex: true,
            useUnifiedTopology: true,
           // useFindAndModify: false,
        });
        console.log("Connected correctly to DB");
    } catch (err) {
        console.log(err.message);
        await process.exit(1)
    } 
}
// run().catch(console.dir);

module.exports = connectDB;

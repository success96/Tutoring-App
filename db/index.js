const { MongoClient } = require("mongodb");
require ("dotenv").config();
const Mongoose = require("mongoose");


const {URI} = process.env;
const client = Mongoose.connect(URI);
async function connectDB() {
    try {
        await Mongoose.connect(URI);
        console.log("Connected correctly to DB");
    } catch (err) {
        console.log(err.message);
    }
    // finally {
    //     await client.close();
    // }
}
// run().catch(console.dir);

module.exports = connectDB;

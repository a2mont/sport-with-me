require('dotenv').config({ path: '.env' });

const DEBUG = false

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const {
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// Connect to the MongoDB database
// Use auto increment for models


const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
module.exports = {
    connectDB: async function () {

        if(DEBUG) console.log("db.js: Trying to connect to db...")
        try {
            mongoose.connect(url, options).then(
            AutoIncrement.initialize(mongoose.connection));
            if(DEBUG) console.log("db.js: Successfuly connected to db...")
        } catch (error) {
            if(DEBUG) console.log("db.js: Error connecting to database: " + error)
        }
    }


}

require('dotenv').config();
const Activity = require('./models/activity');
const db = require('./db/db');
const moment = require('moment');

var treshold = moment().subtract(1, 'days').toDate();

db.connectDB();

console.log("Treshold : " + treshold);

// Delete passed activities
Activity.deleteMany({"date.day" : {$lte : treshold}}).exec().then((removed) => {
    console.log("Documents Removed Successfully");
    console.log(removed);
}).catch((err) => {
    console.error('something went wrong');
    console.error(err);
})

require('dotenv').config();
const Activity = require('./models/activity');
const db = require('./db/db');
const moment = require('moment');

var treshold = moment().subtract(1, 'days').toDate();

db.connectDB();

// Delete passed activities
Activity.find({date:{day : {$lte : treshold}}}).remove().exec().then((RemoveStatus) => {
    console.log("Documents Removed Successfully");
}).catch((err) => {
    console.error('something error');
    console.error(err);
})

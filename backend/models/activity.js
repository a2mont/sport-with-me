const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');
const GeoJSON = require('mongoose-geojson-schema');

const activitySchema = new Mongoose.Schema(
    {
        price:{
            type: Number,
        },
        location: {
            type:{
                type: String,
                enum: ['Point'],
            },
            coordinates: {type:Array}
            //required: true,
        },
        sport: {
            type: String,
            //required: true,
        },
        date: {
            type: Date,
            //required : true,
        },
        creator: {
            type: Number,
            required: true,
            ref : 'User',
        },
        outdoor: {
            type: Boolean,
        },
        public: {
            type: Boolean
        },
    },
    {timestamps: true}
);

activitySchema.method('toClient', function(){
    var obj = this.toObject();

    // Rename fields
    obj.id = obj._id;
    obj.creator = {         // --------- Problème ici -----------
        id: obj.creator._id,
        email: obj.creator.email,
    };
    // ------- Question ----------- How to Rename participants

    // Delete fields
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;

    return obj;
});

activitySchema.plugin(AutoIncrement.plugin, {
    model: 'Activity',
    startAt: 1,
});

Mongoose.model('Activity', activitySchema);

module.exports = Mongoose.model('Activity');
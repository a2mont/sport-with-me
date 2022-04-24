const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const activitySchema = new Mongoose.Schema(
    {
        price: {
            type: Number,
        },
        location: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            }
        },
        sport: {
            type: String,
            required: true,
        },
        date:{
            day: {
                type: Date,
                required : true,
            },
            hour: {
                type: String,
            }
        },
        creator: {
            type: Number,
            required: true,
            ref: 'User',
        },
        public: {
            type: Boolean,
        },
        participants: [{
            type: Number,
            ref: 'User'
        }],
        comments:{
            type: String,
        },
    },
    { timestamps: true }
);

activitySchema.method('toClient', function () {
    var obj = this.toObject();

    // Rename fields
    obj.id = obj._id;
    obj.creator = {
        id: obj.creator._id,
        email: obj.creator.email,
        name: obj.creator.name,
    };

    //Rename fields in participants array
    for (let i = 0; i < obj.participants.length; i++) {
        obj.participants[i] = {
            id: obj.participants[i]._id,
            email: obj.participants[i].email,
            name: obj.participants[i].name,
        }
    }
    
    // Delete fields
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;

    return obj;
});

Mongoose.model('Activity', activitySchema);

module.exports = Mongoose.model('Activity');
AutoIncrement.initialize(Mongoose.connection);
activitySchema.plugin(AutoIncrement.plugin, {
    model: 'Activity',
    startAt: 1,
});

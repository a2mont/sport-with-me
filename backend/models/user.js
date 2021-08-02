const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const userSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            //required: true,
            index: {
                unique: true,
            },
        },
        password: {
            type: String,
            //required: true,
        },
        name: {
            firstname: {
                type: String,
                //required: true,
            },
            lastname: {
                type: String,
                //required: true,
            }
        },
        friends:[{
            type: Number,
            ref: 'User'
        }],
    },
    {timestamps: true}
);

userSchema.method('toClient', function(){
    var obj = this.toObject();

    // Rename fields
    obj.id = obj._id;
    //Rename fields in participants array
    for (let i = 0; i < obj.friends.length; i++) {
        obj.friends[i] = {
            id: obj.friends[i]._id,
            email: obj.friends[i].email,
            name: obj.friends[i].name,
        }
    }
    // Delete fields
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.password;

    return obj;
});

userSchema.plugin(AutoIncrement.plugin, {
    model: 'User',
    startAt: 1,
});

Mongoose.model('User', userSchema);

module.exports = Mongoose.model('User');
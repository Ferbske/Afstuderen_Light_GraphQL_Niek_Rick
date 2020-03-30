const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type:String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

const User = mongoose.model('user', UserSchema);

module.exports = {User, UserSchema};
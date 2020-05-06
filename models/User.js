const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "student"
    }
}, { timestamps: true });

userSchema.methods.generateToken = function() {
     const user = this;
     const token = jwt.sign({_id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role    
    }, process.env.SECRET_KEY, {expiresIn: "3 days"});
    // user.tokens = token;
    // await user.save();
    return token;
}

module.exports = mongoose.model("User", userSchema);
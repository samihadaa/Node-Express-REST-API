const { number } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email must be provided!"],
        unique: [true, "email must be unique"],
        minLength: [5, "minimum length is 5 characters"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password must be provided"],
        trim: true,
        select: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        select: false
    },
    verificationCodeValidation: {
        type: Number,
        select: false
    },
    forgottenPasswordCode: {
        type: String,
        select: false
    },
    forgottenPasswordCodeValidation: {
        type: Number,
        select: false
    }
}, {
    timestamps: true,
});
const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: [true, 'name is Required']
    },
    number: {
        type: String,
        required: [true, 'Phone is Required']
    },
    dialCode: {
        type: String,
        required: [true, 'DialCode is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    },
    country: {
        type: String,
        required: [true, 'Country is Required']
    },
    countryCode: {
        type: String,
        required: [true, 'CountryCode is Required']
    },
    currency: {
        type: String,
        required: [true, 'Currency is Required']
    },
    otpExpire: {
        type: Date
    },
    otp: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);

const mongoose = require('mongoose')

const userDataCollection = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    dialCode: {
        type: String,
        required: [true, 'Dial Code is required']
    },
    number: {
        type: String,
        required: [true, 'Number is required']
    },
    profession: {
        type: String,
        required: [true, 'Profession is required']
    },
    otp: {
        type: String,
        default: ""
    },
    otpExpire: {
        type: Date,
        default: null
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const UserDataCollection = mongoose.model('UserDataCollection', userDataCollection)

module.exports = UserDataCollection
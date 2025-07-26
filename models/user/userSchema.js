const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Image is Required']
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    dialCode: {
        type: String,
        required: [true, 'Dial Code is Required']
    },
    number: {
        type: String,
        required: [true, 'Number is Required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is Required']
    },
    about: {
        type: String,
        default: ""
    },
    camera: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Camera'
        }
    ],
    lens: [
        {
            type: String,
            default: ""
        }
    ],
    lights: [
        {
            type: String,
            default: ""
        }
    ],
    experience: {
        type: Number,
        default: 0
    },
    drivingLicense: {
        type: String,
        default: ""
    },
    mobile: [
        {
            type: String,
            default: ""
        }
    ],
    software: {
        type: String,
        default: ""
    },
    gears: [
        {
            type: String,
            default: ""
        }
    ],
    instagram: {
        type: String,
        default: ""
    },
    faceBook: {
        type: String,
        default: ""
    },
    pinterest: {
        type: String,
        default: ""
    },
    webSite: {
        type: String,
        default: ""
    },
    youTube: {
        type: String,
        default: ""
    },


    companyName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    lat: {
        type: String,
        default: ""
    },
    lng: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    locationPoint: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [lng, lat]
            //required: true
        }
    },
    role: {
        type: String,
        enum: ['user', 'vendor'],
        required: [true, 'Role is Required']

    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    subCategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory'
        }
    ],
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
    isPlan: {
        type: Boolean,
        default: false
    },
    planEndDate: {
        type: Date,
        default: null
    },
    isDetailsAdded: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviewLength: {
        type: Number,
        default: 0,
    },
    isProfessional: {
        type: Boolean,
        default: false
    },
    isFullDayOff: {
        type: Boolean,
        default: false
    },
    viewers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true })
userSchema.index({ locationPoint: '2dsphere' });
const User = mongoose.model('User', userSchema)
module.exports = User




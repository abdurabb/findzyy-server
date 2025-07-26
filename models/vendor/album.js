const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vendor is required']
    },
    name: {
        type: String,
        required: [true, 'Album Name is Required']
    },
    coverImage: {
        type: String,
        required: [true, 'Cover Image is required']
    },
    location: {
        type: String,
        required: [true, 'Location is Required']
    },
    photos: [{
        image: {
            type: String,
            default: ""
        },
        imageInfo: {
            public_id: {
                type: String,
                default: ""
            },
            secure_url: {
                type: String,
                default: ""
            },
            bytes: {
                type: String,
                default: ""
            },
            fileInMb: {
                type: Number,
                default: ""
            },
            fileInGb: {
                type: Number,
                default: ""
            },
            signature: {
                type: String,
                default: ""
            }
        },

    }],
    videos: [{
        video: {
            type: String,
            default: ""
        },
        videoInfo: {
            public_id: {
                type: String,
                default: ""
            },
            secure_url: {
                type: String,
                default: ""
            },
            bytes: {
                type: String,
                default: ""
            },
            fileInMb: {
                type: Number,
                default: ""
            },
            fileInGb: {
                type: Number,
                default: ""
            },
            signature: {
                type: String,
                default: ""
            },
            duration: {
                type: Number,
                default: 0
            },
            durationFormatted:{
                type:String,
                default:""
            }

        },
    }]

}, { timestamps: true })

const Album = mongoose.model('Album', albumSchema)
module.exports = Album
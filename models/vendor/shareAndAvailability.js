const mongoose = require('mongoose')

const shareAndAvailabilitySchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vendor id is required']
    },
    status: {
        type: String,
        enum: ['Created', 'Completed', 'Deleted'],
        default: 'Created'
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
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }


}, { timestamps: true })

const ShareAndAvailability = mongoose.model('ShareAndAvailability', shareAndAvailabilitySchema)

module.exports = ShareAndAvailability
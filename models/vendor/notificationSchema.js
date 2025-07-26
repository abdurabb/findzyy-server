const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender id is required']
    },
    receivers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Sender id is required']
        }
    ],
    type: {
        type: String,
        enum: ['helpDesk', 'shareAndAvailability', 'normal']
    },
    title: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },
    helpDeskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HelpDesk',
        default: null
        // required: [true, 'HelpDesk id is required']
    },
    shareAndAvailabilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShareAndAvailability',
        default: null
        // required: [true, 'Share And Availability id is required']
    }
}, { timestamps: true })

const VendorNotification = mongoose.model('VendorNotification', notificationSchema)
module.exports = VendorNotification
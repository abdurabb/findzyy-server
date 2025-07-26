const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id is required"],
    },
    eventName: {
        type: String,
        required: [true, 'Event Name is required']
    },
    clientName: {
        type: String,
        required: [true, 'Client Name']
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is required']
    },
    startTime: {
        type: Date,
        required: [true, 'Start Time is required']
    },
    endTime: {
        type: Date,
        required: [true, 'End Time is required']
    },
    lat: {
        type: String,
        default: ""
    },
    lng: {
        type: String,
        default: ""
    },
    location:{
        type:String,
        default:""
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }

}, { timestamps: true })
const Event = mongoose.model('Event', eventSchema)

module.exports = Event
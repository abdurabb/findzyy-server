const mongoose = require('mongoose')

const helpDeskSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vendor id is required']
    },
    problem: {
        type: String,
        required: [true, 'Problem is required']
    },
    status: {
        type: String,
        enum: ['Created', 'Completed', 'Removed'],
        default: 'Created'
    },
    date:{
        type:Date,
        required:[true,'Date is required']
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
    }

}, { timestamps: true })

const HelpDesk = mongoose.model('HelpDesk', helpDeskSchema)

module.exports = HelpDesk
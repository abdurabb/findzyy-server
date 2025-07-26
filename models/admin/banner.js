
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    fileType: {
        type: String,
        enum: ["video", "image"],
        required: [true, 'File type is required']
    },
    file: {
        type: String,
        required: [true, 'File is Required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is Required']
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is Required']
    }

}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner


const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    couponCode: {
        type: String,
        required: [true, 'Coupon code is required'],
        // unique: [true, 'Coupon Already Exist']
    },
    discount: {
        type: Number,
        required: [true, 'Discount is Required']
    },
    usageLimit: {
        type: Number,
        required: [true, 'Usage Limit is Required']
    },
    minimumPurchase: {
        type: Number,
        required: [true, 'Minimum Purchase is Required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is Required']
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is Required']
    },
    usedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]

}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon

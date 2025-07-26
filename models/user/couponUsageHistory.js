const mongoose = require('mongoose')

const couponUsageHistorySchema = new mongoose.Schema({
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: [true, 'Plan id is required']
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: [true, 'Coupon is required'],
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: [true, 'Payment id is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User Id is required']
    },
    userName: {
        type: String,
        required: [true, 'User Name is required']
    },
    dialCode: {
        type: String,
        required: [true, 'Dial Code is required']
    },
    number: {
        type: String,
        required: [true, 'Number is required']
    },
    planName: {
        type: String,
        required: [true, 'Plan Name is required']
    },
    planPrice: {
        type: Number,
        required: [true, 'Plan Price is required']
    },
    planOfferPrice: {
        type: Number,
        required: [true, 'Plan Offer Price is required']
    },
    couponDiscount: {
        type: Number,
        required: [true, 'Coupon Discount is required']
    },
    discountPrice: {
        type: Number,
        required: [true, 'Discount  Price is required']
    },
    tax: {
        type: Number,
        required: [true, 'Gst  Price is required']
    },
    total: {
        type: Number,
        required: [true, 'Total Price is required']
    }
}, { timestamps: true })

const CouponUsageHistory = mongoose.model('CouponUsageHistory', couponUsageHistorySchema)
module.exports = CouponUsageHistory
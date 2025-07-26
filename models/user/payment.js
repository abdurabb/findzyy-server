const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: [true, 'Plan id is required']
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        default:null
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        }
    ],
    paymentStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled']
    },
    paymentIntentId: {
        type: String,
        default: null
    },
    sessionId: {
        type: String,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required']
    },
    paymentType: {
        type: String,
        enum: ['stripe', 'paypal'],
        required: [true, 'Payment method is required']
    },
    price: {
        type: Number,
        default: 0
    },
    offerPrice: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    isCoupon: {
        type: Boolean,
        default: false
    },
    refundId: {
        type: String,
        default: ''
    },
    isRefunded: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
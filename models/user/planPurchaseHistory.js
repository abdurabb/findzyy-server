const mongoose = require('mongoose')

const planPurchaseHistory = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is Required']
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: [true, 'Plan Id is required']
    },
    name: {
        type: String,
        required: [true, 'Plan name is required']
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is Required']
    },
    categoryName: {
        type: String,
        required: [true, 'Category Name is Required']
    },
    specifications: [
        {
            type: String,
            required: [true, 'Specification is Required']
        }
    ],
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: [true, 'Payment Id is required']
    }
}, { timestamps: true })

const PlanPurchaseHistory = mongoose.model('PlanPurchaseHistory', planPurchaseHistory)

module.exports = PlanPurchaseHistory

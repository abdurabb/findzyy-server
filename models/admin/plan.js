
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    price: {
        type: Number,
        default: 0
    },
    offerPrice: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is Required']
    },
    specifications: [
        {
            type: String,
            required: [true, 'Specification is Required']
        }
    ],
    tax: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan

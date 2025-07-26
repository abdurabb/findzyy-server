
const mongoose = require('mongoose');

const gadgetSchema = new mongoose.Schema({
    coverImage: {
        type: String,
        required: [true, 'CoverImage is Required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    brandName: {
        type: String,
        required: [true, 'Brand Name is Required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is Required']
    },
    paymentType: {
        type: String,
        enum: ['perHour', 'perDay', 'perWeek', 'perMonth', 'perYear'],
        required: [true, 'Payment Type is Required']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentalAdnGadgetCategory',
        required: [true, 'CategoryId is Required']
    },
    lat: {
        type: String,
        required: [true, 'lat is required']
    },
    lng: {
        type: String,
        required: [true, 'Lng is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    images: [
        {
            type: String,
            required: [true, 'Images are required']
        }
    ],
    condition: {
        type: String,
        enum: ['Brand New', 'Like New', 'Fairly Used', 'Used'],
        required: [true, 'Condition is Required']
    },
    specification: [
        {
            title: {
                type: String,
                required: [true, 'Specification Title is Required']
            },
            content: {
                type: String,
                required: [true, 'Specification Content is Required']
            }

        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is Required']
    },
    approveStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    isSoldOut: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    rejectReason: {
        type: String,
        default: ""
    },
    pendingDate: {
        type: Date,
        default: new Date()
    },
    approveDate: {
        type: Date,
        default: null
    },
    rejectDate: {
        type: Date,
        default: null
    },
    blockDate: {
        type: Date,
        default: null
    },
    locationPoint: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true
        }
    }

}, { timestamps: true });
gadgetSchema.index({ locationPoint: '2dsphere' });

const Gadget = mongoose.model('Gadget', gadgetSchema);
module.exports = Gadget

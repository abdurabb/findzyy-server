
const mongoose = require('mongoose');

const rentalServiceSchema = new mongoose.Schema({
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
    isAvailableNow: {
        type: Boolean,
        default: true
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

const RentalService = mongoose.model('RentalService', rentalServiceSchema);
rentalServiceSchema.index({ locationPoint: '2dsphere' });
module.exports = RentalService

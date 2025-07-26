const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User Id is required"],
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Vendor Id is required"],
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: 1,
            max: 5,
        },
        review: {
            type: String,
            required: [true, "Review is required"],
        },
        images: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;

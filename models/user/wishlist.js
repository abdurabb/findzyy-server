const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required']
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Item Id is required']
    },
    itemType: {
        type: String,
        enum: ['gadget', 'rental', 'vendor']
    },
}, { timestamps: true })

const WishList = mongoose.model('WishList', wishListSchema)
module.exports = WishList

const mongoose = require('mongoose');

const rentalAndGadgetCategory = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is Required']
    },
}, { timestamps: true });

const RentalAdnGadgetCategory = mongoose.model('RentalAdnGadgetCategory', rentalAndGadgetCategory);
module.exports = RentalAdnGadgetCategory

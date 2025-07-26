
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'CategoryId is Required']
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    image: {
        type: String,
        required: [true, 'Image is Required']
    }

}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory

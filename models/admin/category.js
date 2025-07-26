
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is Required']
    },    
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category

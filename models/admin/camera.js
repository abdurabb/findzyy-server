const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
}, { timestamps: true });

const Camera = mongoose.model('Camera', cameraSchema);
module.exports = Camera

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemCost: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Item', itemSchema);

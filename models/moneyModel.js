const mongoose = require('mongoose');

const moneylendSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    money_taken: {
        type: Number,
        required: [true]
    },
    money_given: {
        type: Number,
        required: [true]
    },

    date: {
        type: String,
        default: Date.now
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Money', moneylendSchema);
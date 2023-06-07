const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    map: {
        type: String,
        required: true,
    },
    weapon: {
        type: String,
        required: true,
    },
    extras: {
        type: Array,
    },
    date: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);

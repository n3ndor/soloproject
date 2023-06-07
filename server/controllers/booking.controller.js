const Booking = require('../models/bookings.model');

const createBooking = async (req, res, next) => {
    const { userId, map, weapon, extras, date } = req.body;

    try {
        const newBooking = new Booking({ userId, map, weapon, extras, date });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
};

// Implement other methods such as getBookings, updateBooking, deleteBooking as per your requirements.

module.exports = { createBooking /*, getBookings, updateBooking, deleteBooking */ };

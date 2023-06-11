const Booking = require('../models/bookings.model');

const createBooking = async (req, res, next) => {
    const { map, weapon, extras, date } = req.body;
    const userId = req.user._id;

    if (!map || !weapon || !date) {
        return res.status(400).json({ error: 'Missing required field' });
    }

    try {
        const newBooking = new Booking({ userId, map, weapon, extras, date });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
};

const getBookingsByUser = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const bookings = await Booking.find({ userId }).sort('-date'); // sort by date in descending order
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

module.exports = { createBooking, getBookingsByUser };
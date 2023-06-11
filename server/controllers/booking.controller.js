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
        const bookings = await Booking.find({ userId });
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

const getBookingById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
};

const updateBooking = async (req, res, next) => {
    const { map, weapon, extras, date } = req.body;
    const { id } = req.params;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { map, weapon, extras, date },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        next(error);
    }
};

const deleteBooking = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndRemove(id);

        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(deletedBooking);
    } catch (error) {
        next(error);
    }
};

module.exports = { createBooking, getBookingsByUser, getBookingById, updateBooking, deleteBooking };

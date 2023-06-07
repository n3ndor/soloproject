const bookingController = require('../controllers/booking.controller');
const verifyToken = require('../controllers/auth.middleware');

module.exports = (app) => {
    app.post("/api/bookings", verifyToken, bookingController.createBooking);
    // app.get("/api/bookings", bookingController.getBookings);
    // app.put("/api/bookings/:id", bookingController.updateBooking);
    // app.delete("/api/bookings/:id", bookingController.deleteBooking);

};

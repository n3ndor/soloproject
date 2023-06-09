require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users.routes');
const bookingRoutes = require('./routes/bookings.routes');

require('./config/mongoose.config');

app.use(cors());
app.use(express.json());
userRoutes(app);
bookingRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({ errors: err.errors });
    } else {
        console.log(err);
        res.status(500).json({ message: "An unexpected error occurred. Please try again." });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

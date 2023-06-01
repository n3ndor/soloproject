const express = require('express');
const app = express();


app.use(express.json());
userRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

require('./config/mongoose.config');

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({ errors: err.errors });
    } else {
        res.status(500).json({ message: "An unexpected error occurred. Please try again." });
    }
});

app.use(function (req, res, next) {
    next();
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server running on port ${port}`));
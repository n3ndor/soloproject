const jwt = require('jsonwebtoken');
const secretOrPrivateKey = process.env.JWT_SECRET;
const User = require('../models/users.model');

const verifyToken = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) return res.status(401).send('Access Denied');

    const token = bearerToken.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user using the decoded _id
        const user = await User.findById(decoded._id);
        if (!user) throw new Error('User not found');

        // Set req.user to the fetched user
        req.user = user;

        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = verifyToken;

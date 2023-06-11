const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const registerUser = async (req, res, next) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password || password.length < 6) {
        return res.status(400).json({ error: 'Missing required field' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email already exist" });
    }

    try {
        const newUser = new User({ userName, email, password });
        await newUser.save();
        const token = generateToken(newUser);
        res.json({ token, user: { _id: newUser._id, userName, email } });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Invalid Email or Password');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid Email or Password');
    }

    const token = generateToken(user);
    res.json({ token, user: { _id: user._id, userName: user.userName, email } });
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = { registerUser, loginUser, getUser };
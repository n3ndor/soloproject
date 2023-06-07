const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createTokenAndSend = (user, res) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("usertoken", token, process.env.JWT_SECRET, { httpOnly: true }).json({ userId: user._id });

}

const registerUser = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(req.body);
        if (user) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ fullName, email, password });
        await newUser.save();

        createTokenAndSend(newUser, res);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid Email or Password');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid Email or Password');
        }

        createTokenAndSend(user, res);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        next(error);
    }
}

const logOut = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}

module.exports = { registerUser, loginUser, getUser, logOut };
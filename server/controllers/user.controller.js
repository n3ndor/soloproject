const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createTokenAndSend = (user, res) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const { password, ...userWithoutPassword } = user.toObject();
    res.cookie("usertoken", token, { httpOnly: true }).json(userWithoutPassword);
}



const registerUser = (req, res, next) => {
    console.log('Register endpoint hit');
    console.log('Request body:', req.body);

    const { userName, email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                console.error('User already exists error:', { userName, email });
                return res.status(400).json("Email already exist");
            }

            const newUser = new User({ userName, email, password });
            newUser.save()
                .then(() => {
                    createTokenAndSend(newUser, res);
                })
                .catch((error) => {
                    console.error('Error in saving user:', error);
                    next(error);
                });
        })
        .catch(error => {
            console.error('Error in finding user:', error);
            next(error);
        });
};

const loginUser = async (req, res, next) => {
    console.log('Login endpoint hit');
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error('Invalid Email or Password error:', { email });
            return res.status(400).send('Invalid Email or Password');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            console.error('Invalid Email or Password error:', { email });
            return res.status(400).send('Invalid Email or Password');
        }

        createTokenAndSend(user, res);
    } catch (error) {
        console.error('Error in login endpoint:', error);
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

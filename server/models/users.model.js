const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
    },
    userName: {
        type: String,
        required: [true, "User Name is required"],
        minlength: [2, "User Name must be at least 2 characters long"],
        unique: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be 6 characters or longer"]
    }
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

UserSchema.plugin(uniqueValidator, { message: 'User Name must be unique.' });

module.exports = mongoose.model("User", UserSchema);
// // models/User.js
// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//  username: { type: String, unique: true, required: true },
//  password: { type: String, required: true },
//  });
// module.exports = mongoose.model('User', userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("users", userSchema);

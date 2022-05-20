const mongoose = require('mongoose');

const seller = mongoose.Schema({
    Shopname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true }
})

module.exports = mongoose.model({seller},seller);
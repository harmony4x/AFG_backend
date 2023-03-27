const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        // name: {
        //     type: String,
        //     required: true
        // },
        name: String,
        email: String,
        adress: String,
        phone: String,
        description: String,
        image: String,
    },
    {
        timestamps: true,
    }
);
const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
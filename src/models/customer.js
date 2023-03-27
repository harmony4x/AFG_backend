const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

const customerSchema = new mongoose.Schema(
    {
        // name: {
        //     type: String,
        //     required: true
        // },
        name: String,
        email: String,
        address: String,
        phone: String,
        description: String,
        image: String,
    },
    {
        timestamps: true,
    }
);

customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');


const customerSchema = new mongoose.Schema(
    {

        name: String,
        email: String,
        password: String,
        address: String,
        phone: String,
        description: String,
        birthday: Date,
        gender: Number,
        image: String,
        role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'role' }],
    },
    {
        timestamps: true,
    }
);

customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

customerSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
})

customerSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {

    }
}

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
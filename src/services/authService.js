const Customer = require("../models/customer");

const isExits = async (email) => {
    const checkEmail = await Customer.findOne({ email });
    return checkEmail;
}

const registerService = async (data) => {
    try {
        let user = await new Customer({
            ...data
        });
        let res = user.save();
        return res;
    } catch (error) {
        return error;
    }
}

const loginService = async (email) => {
    let user = await Customer.findOne({ email }).populate('role').exec();

    return user;
}

module.exports = {
    isExits,
    registerService,
    loginService
}